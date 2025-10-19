'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

const loadScript = (src) => {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Fill the form and click Checkout');
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    phoneNumber: '',
    address: '',
    pincode: '',
  });

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        if (res.ok) setProduct(data);
        else setMessage('⚠️ Product not found or server error');
      } catch (err) {
        console.error(err);
        setMessage('⚠️ Error loading product');
      }
    };
    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async () => {
    const { customerName, customerEmail, phoneNumber, address, pincode } = formData;
    if (!customerName || !customerEmail || !phoneNumber || !address || !pincode) {
      setMessage('❌ Please fill all required fields!');
      return;
    }
    if (!product) return setMessage('❌ Product not found!');
    setLoading(true);
    setMessage('Creating order...');

    try {
      const shippingAddress = `${address}, ${pincode}`;
      const orderResponse = await fetch('/api/order/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ watchId: product.id, quantity }],
          customerName,
          customerEmail,
          phoneNumber,
          shippingAddress,
          totalPrice: product.price * quantity,
        }),
      });

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) {
        setMessage(`Order creation failed: ${orderData.message}`);
        setLoading(false);
        return;
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Watch E-Store',
        description: 'Purchase Watch Order',
        order_id: orderData.razorpayOrderId,
        handler: async function (response) {
          setMessage('Payment successful. Verifying order...');
          const verificationResponse = await fetch('/api/order/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              customerName,
              customerEmail,
              shippingAddress,
              orderId: orderData.orderId,
              items: [{ watchId: product.id, quantity }],
            }),
          });

          const verificationData = await verificationResponse.json();
          if (verificationResponse.ok && verificationData.verified) {
            setMessage(`✅ Payment confirmed! Order ID: ${verificationData.orderId}`);
            setFormData({ customerName: '', customerEmail: '', phoneNumber: '', address: '', pincode: '' });
            setQuantity(1);
          } else {
            setMessage(`❌ Verification failed: ${verificationData.message || 'Payment not secure.'}`);
          }
          setLoading(false);
        },
        prefill: { name: customerName, email: customerEmail, contact: phoneNumber },
        theme: { color: '#1E293B' },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        setMessage(`❌ Payment Failed: ${response.error.description}`);
        setLoading(false);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      setMessage('❌ Something went wrong!');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-10">Secure Checkout</h1>

        {product ? (
          <div className="flex flex-col sm:flex-row gap-8 mb-8 items-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-md">
              <Image
                src={product.images?.[0] || '/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mt-2 text-xl font-medium">
                ₹{product.discountedPrice.toLocaleString()}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-20 border border-gray-300 rounded-md text-center py-1 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <p className="mt-5 text-lg font-semibold text-gray-900">
                Total: ₹{(product.discountedPrice * quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mb-6">Loading product details...</p>
        )}

        <div className="space-y-4">
          {['customerName', 'customerEmail', 'phoneNumber', 'address', 'pincode'].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 mb-1 font-medium capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field === 'customerEmail' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
                required
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading || !RAZORPAY_KEY_ID}
          className="w-full mt-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-transform active:scale-95 shadow-lg"
        >
          {loading ? 'Processing...' : 'Pay & Place Order'}
        </button>

        <p className="mt-5 text-center text-gray-700 font-medium">{message}</p>

        {!RAZORPAY_KEY_ID && (
          <p className="mt-2 text-center text-red-500 text-sm">
            ⚠️ Missing Razorpay Key ID — set NEXT_PUBLIC_RAZORPAY_KEY_ID in .env
          </p>
        )}
      </div>
    </div>
  );
}