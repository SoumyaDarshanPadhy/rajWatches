'use client';
import { useCart } from './CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.product.name} × {item.quantity} - ₹{item.product.price * item.quantity}
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Checkout</button>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
}
