// app/wishlist/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useWishlist from "@/components/useWishlist"; // adjust path if your components folder is elsewhere

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist(); // your hook that returns stored items
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Normalize wishlist to product objects. The hook may store full product objects
  // or (sometimes) only product ids — this code supports both.
  useEffect(() => {
    let mounted = true;
    async function loadProducts() {
      setLoading(true);
      try {
        const resolved = await Promise.all(
          (wishlist || []).map(async (entry) => {
            // if it's an object with id & name, assume it's a product object
            if (entry && typeof entry === "object" && entry.id) return entry;

            // if it's a string or number treat it as an id and attempt to fetch product details
            const id = String(entry);
            try {
              const res = await fetch(`/api/products/${encodeURIComponent(id)}`);
              if (!res.ok) return null;
              const data = await res.json();
              return data;
            } catch {
              return null;
            }
          })
        );

        if (!mounted) return;
        setProducts(resolved.filter(Boolean));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if ((wishlist || []).length) loadProducts();
    else setProducts([]);

    return () => {
      mounted = false;
    };
  }, [wishlist]);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-serif font-extrabold mb-6">Your Wishlist</h1>
        <div>Loading wishlist…</div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-serif font-extrabold mb-6">Your Wishlist</h1>

      {(!products || products.length === 0) ? (
        <div className="text-gray-600">
          Your wishlist is empty. <Link href="/watches/category/all" className="text-[#b89f56] underline">Browse watches</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <article key={p.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="h-48 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
                <Image
                  src={p.images && p.images[0] ? p.images[0] : "/placeholder.jpg"}
                  alt={p.name || "Product image"}
                  width={220}
                  height={220}
                  className="object-contain"
                />
              </div>

              <div className="mt-3">
                <h2 className="text-lg font-semibold">{p.name}</h2>
                <div className="text-[#b89f56] font-bold mt-2">₹{Math.round(p.price || 0).toLocaleString()}</div>

                <div className="mt-4 flex gap-3">
                  <Link href={`/watches/product/${p.id}`} className="px-3 py-2 bg-[#23221d] text-white rounded">
                    View
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(p.id)}
                    className="px-3 py-2 border rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
