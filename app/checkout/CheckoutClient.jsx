'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Environment variable for Razorpay Key ID
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

/**
 * Dynamically loads the Razorpay checkout script.
 * @param {string} src - The URL of the script.
 * @returns {Promise<boolean>} - True if script loaded successfully, false otherwise.
 */
const loadScript = (src) => {
  return new Promise((resolve) => {
    // Check if script is already present
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

  // State
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

  // Effect to load Razorpay script on component mount
  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  // Effect to fetch product details based on productId
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const contentType = res.headers.get('content-type');

        if (!res.ok || !contentType?.includes('application/json')) {
          setMessage('⚠️ Product not found or server error');
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

  /**
   * Handles changes in the form input fields.
   */
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Initiates the checkout process: creates an order and opens the Razorpay payment window.
   */
  const handleCheckout = async () => {
    const { customerName, customerEmail, phoneNumber, address, pincode } = formData;

    // Client-side validation
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
      // 1. Create Order API Call
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

      // 2. Configure and Open Razorpay Payment Window
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Watch E-Store',
        description: 'Purchase Watch Order',
        order_id: orderData.razorpayOrderId,
        
        // Payment success handler
        handler: async function (response) {
          setMessage('Payment successful. Verifying order...');

          // 3. Verification API Call
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
            // Clear form and reset quantity on successful order
            setFormData({
              customerName: '',
              customerEmail: '',
              phoneNumber: '',
              address: '',
              pincode: '',
            });
            setQuantity(1);
          } else {
            setMessage(`❌ Verification failed: ${verificationData.message || 'Payment not secure.'}`);
          }
          setLoading(false);
        },
        
        // Pre-fill customer details
        prefill: { name: customerName, email: customerEmail, contact: phoneNumber },
        theme: { color: '#1E293B' }, // slate blue tone
      };

      const rzp = new window.Razorpay(options);

      // Payment failure handler
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

  // --- Rendered Component ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-8">
          Secure Checkout
        </h1>

        {product ? (
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
            <img
              src={product.images?.[0] || '/placeholder.jpg'}
              alt={product.name}
              className="w-48 h-48 object-cover rounded-xl border border-gray-200 shadow-sm"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-medium text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mt-1 text-lg">₹{product.price.toLocaleString()}</p>

              <div className="flex items-center gap-3 mt-4 justify-center sm:justify-start">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-md w-16 text-center py-1 focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>

              <p className="mt-4 text-lg font-semibold text-gray-900">
                Total: ₹{(product.price * quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mb-6">Loading product details...</p>
        )}

        <div className="space-y-5">
          {['customerName', 'customerEmail', 'phoneNumber', 'address', 'pincode'].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 mb-1 capitalize font-medium">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field === 'customerEmail' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
                placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                required
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading || !RAZORPAY_KEY_ID}
          className="w-full mt-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-transform active:scale-95 shadow-md"
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