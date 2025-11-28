"use client";

import { useState, useEffect } from "react";

export default function useWishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlist(saved);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) {
        // remove
        return prev.filter((item) => item.id !== product.id);
      } else {
        // add
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    wishlist,
    count: wishlist.length,
    toggleWishlist,
    removeFromWishlist,
  };
}
