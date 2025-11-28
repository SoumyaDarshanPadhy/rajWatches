"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LuxeButtons({ product }) {
  const [added, setAdded] = useState(false);
  const router = useRouter();

  const handleAddToCart = () => {
    const prev = JSON.parse(localStorage.getItem("cart") || "[]");
    // Check if already in cart; update quantity if present
    const found = prev.find(item => item.id === product.id);
    if (found) {
      const newCart = prev.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      localStorage.setItem("cart", JSON.stringify([...prev, { id: product.id, qty: 1 }]));
    }
    setAdded(true);
  };

  const handleBuyNow = () => {
    // Save only current product to localStorage and go to checkout
    localStorage.setItem("cart", JSON.stringify([{ id: product.id, qty: 1 }]));
    router.push(`/checkout?productId=${product.id}&buyNow=1`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <button
        className="bg-[#b89f56] text-white font-bold text-lg py-3 px-8 rounded-full shadow hover:bg-[#948138] transition uppercase tracking-wider"
        onClick={handleAddToCart}
        disabled={added}
      >
        {added ? "Added to Cart" : "Add to Cart"}
      </button>
      <button
        onClick={handleBuyNow}
        className="bg-black text-white font-bold py-3 px-8 rounded-full shadow hover:bg-[#b89f56] hover:text-black transition uppercase tracking-wider flex items-center justify-center"
      >
        Buy Now
      </button>
      <Link
        href={`/watches/category/all`}
        className="bg-white text-[#b89f56] border-2 border-[#b89f56] font-bold py-3 px-8 rounded-full hover:bg-[#f6ecd1] hover:text-[#6a5f2c] transition uppercase tracking-wider flex items-center justify-center"
      >
        Back to Shop
      </Link>
    </div>
  );
}


// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function LuxeButtons({ product }) {
//   const [added, setAdded] = useState(false);
//   const router = useRouter();
//   const handleAddToCart = () => {
//     const prev = JSON.parse(localStorage.getItem("cart") || "[]");
//     localStorage.setItem("cart", JSON.stringify([...prev, { id: product.id, qty: 1 }]));
//     setAdded(true);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row gap-4 w-full">
//       <button
//         className="bg-[#b89f56] text-white font-bold text-lg py-3 px-8 rounded-full shadow hover:bg-[#948138] transition uppercase tracking-wider"
//         onClick={handleAddToCart}
//         disabled={added}
//       >
//         {added ? "Added to Cart" : "Add to Cart"}
//       </button>
//       <Link
//         href={`/checkout?productId=${product.id}`}
//         className="bg-black text-white font-bold py-3 px-8 rounded-full shadow hover:bg-[#b89f56] hover:text-black transition uppercase tracking-wider flex items-center justify-center"
//       >
//         Buy Now
//       </Link>
//       <Link
//         href={`/watches/category/all`}
//         className="bg-white text-[#b89f56] border-2 border-[#b89f56] font-bold py-3 px-8 rounded-full hover:bg-[#f6ecd1] hover:text-[#6a5f2c] transition uppercase tracking-wider flex items-center justify-center"
//       >
//         Back to Shop
//       </Link>
//     </div>
//   );
// }
