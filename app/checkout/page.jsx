'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

/**
 * Dynamically load Razorpay SDK
 */
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

  /** Load Razorpay SDK once */
  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  /** Fetch product details */
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const contentType = res.headers.get("content-type");

        if (!res.ok || !contentType?.includes("application/json")) {
          setMessage("⚠️ Product not found or server error");
          return;
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setMessage('⚠️ Error loading product');
      }
    };

    fetchProduct();
  }, [productId]);

  /** Handle input field changes */
  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /** Handle checkout click */
  const handleCheckout = async () => {
    const { customerName, customerEmail, phoneNumber, address, pincode } = formData;

    if (!customerName || !customerEmail || !phoneNumber || !address || !pincode) {
      setMessage('❌ Please fill all required fields!');
      return;
    }

    if (!product) {
      setMessage('❌ Product not found!');
      return;
    }

    setLoading(true);
    setMessage('Creating order...');

    try {
      // 1️⃣ Create order backend call
      const orderResponse = await fetch('/api/order/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ watchId: product.id, quantity }],
          customerName,
          customerEmail,
          phoneNumber,
          shippingAddress: `${address}, ${pincode}`,
          totalPrice: product.price * quantity,
        }),
      });

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) {
        setMessage(`Order creation failed: ${orderData.message}`);
        setLoading(false);
        return;
      }

      setMessage('Order created. Opening payment window...');

      // 2️⃣ Razorpay options
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount, // in paise
        currency: orderData.currency,
        name: 'Watch E-Store',
        description: 'Purchase Watch Order',
        order_id: orderData.razorpayOrderId,
        handler: async function (response) {
          setMessage('Payment successful. Verifying order...');

          // 3️⃣ Verify payment backend call
          const verificationResponse = await fetch('/api/order/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              customerName,
              customerEmail,
              shippingAddress: `${address}, ${pincode}`,
              orderId: orderData.orderId,
              items: [{ watchId: product.id, quantity }],
            }),
          });

          const verificationData = await verificationResponse.json();

          if (verificationResponse.ok && verificationData.verified) {
            setMessage(`✅ Payment & Order Confirmed! Order ID: ${verificationData.orderId}`);

            // Reset form and quantity
            setFormData({
              customerName: '',
              customerEmail: '',
              phoneNumber: '',
              address: '',
              pincode: '',
            });
            setQuantity(1);
          } else {
            setMessage(`❌ Verification Failed: ${verificationData.message || 'Payment not secure.'}`);
          }
          setLoading(false);
        },
        prefill: { name: customerName, email: customerEmail, contact: phoneNumber },
        theme: { color: '#111827' },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        setMessage(`❌ Payment Failed: ${response.error.description}`);
        setLoading(false);
      });
      rzp.open();
    } catch (error) {
      console.error('Checkout error:', error);
      setMessage('❌ Something went wrong!');
      setLoading(false);
    }
  };

  /** UI Render */
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>

      {/* Product Summary */}
      {product ? (
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6 border-b pb-6">
          <img
            src={product.images?.[0] || '/placeholder.jpg'}
            alt={product.name}
            className="w-48 h-48 object-cover rounded-lg shadow"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mt-1">₹{product.price.toLocaleString()}</p>

            <div className="flex items-center gap-3 mt-3 justify-center sm:justify-start">
              <label className="text-gray-700 font-medium">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md w-16 text-center py-1"
              />
            </div>

            <p className="mt-3 text-lg font-semibold">
              Total: ₹{(product.price * quantity).toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mb-6">Loading product details...</p>
      )}

      {/* Checkout Form */}
      <form className="space-y-4">
        {['customerName', 'customerEmail', 'phoneNumber', 'address', 'pincode'].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-gray-700 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={field === 'customerEmail' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
      </form>

      <button
        onClick={handleCheckout}
        disabled={loading || !RAZORPAY_KEY_ID}
        className="w-full mt-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
      >
        {loading ? 'Processing...' : 'Pay & Place Order'}
      </button>

      <p className="mt-4 text-center font-medium text-gray-700">{message}</p>

      {!RAZORPAY_KEY_ID && (
        <p className="mt-2 text-center text-red-500">
          ⚠️ Missing Razorpay Key ID! Set NEXT_PUBLIC_RAZORPAY_KEY_ID in .env
        </p>
      )}
    </div>
  );
}