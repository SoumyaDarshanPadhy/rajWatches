// components/CartProvider.jsx
'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) {
        const parsed = JSON.parse(raw);
        setCart(Array.isArray(parsed) ? parsed : []);
      } else {
        setCart([]);
      }
    } catch (e) {
      setCart([]);
    }
  }, []);

  // persist to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to persist cart:", e);
    }
  }, [cart]);

  /**
   * addToCart
   * - product: server product object (must include product.id)
   * - quantity: number
   * - options: { snapshotPrice: boolean } -> if true store snapshotPrice
   */
  const addToCart = (product, quantity = 1, options = { snapshotPrice: false }) => {
    if (!product || product.id == null) {
      console.warn("addToCart: product has no id", product);
      return;
    }

    setCart((prev) => {
      // store rows as { id: product.id, qty: number, snapshotPrice?: number }
      const existingIndex = prev.findIndex((r) => r.id === product.id);
      if (existingIndex > -1) {
        // increase qty
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          qty: next[existingIndex].qty + quantity,
        };
        return next;
      }

      const newRow = {
        id: product.id,
        qty: quantity,
      };

      if (options.snapshotPrice) {
        newRow.snapshotPrice = product.price ?? product.discountedPrice ?? 0;
      }

      return [...prev, newRow];
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) => prev.map((r) => (r.id === id ? { ...r, qty } : r)));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((r) => r.id !== id));
  };

  const clearCart = () => setCart([]);

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    setCart, // exported for advanced use
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 'use client';
// import { createContext, useContext, useState } from 'react';

// const CartContext = createContext();

// export function useCart() {
//   return useContext(CartContext);
// }

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product, quantity = 1) => {
//     setCart(prev => {
//       const existing = prev.find(item => item.product.id === product.id);
//       if (existing) {
//         return prev.map(item =>
//           item.product.id === product.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
//       return [...prev, { product, quantity }];
//     });
//   };
//   const deleteItem = (id) => {
//   const updated = cartItems.filter((item) => item.id !== id);
//   localStorage.setItem("cart", JSON.stringify(updated));
//   setRefresh((r) => !r);
// };


//   const clearCart = () => setCart([]);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }
