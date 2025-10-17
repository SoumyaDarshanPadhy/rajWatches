"use client";

import { useState, useEffect } from "react";
import { Star, ShoppingBag, ArrowRight } from "lucide-react";

// Rupee Sign Inline SVG
const RupeeSign = ({ className = "text-sm" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 11.5H5.5V13H7V14H5.5V15.5H7V17H8.5V15.5H12C13.6569 15.5 15 14.1569 15 12.5C15 10.8431 13.6569 9.5 12 9.5H8.5V8H15V6.5H8.5V5H7V6.5H5.5V8H7V9.5H12C12.8284 9.5 13.5 10.1716 13.5 11C13.5 11.8284 12.8284 12.5 12 12.5H8.5V14H7V14.5H8.5V15.5H7V17H5.5V15.5H7V14.5H5.5V13H7V11.5Z" />
  </svg>
);

function SingleWatch({ watch }) {
  const images = watch.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000); // 3s per image
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const rating = Math.floor(Math.random() * 1 + 4);
  const fullStars = rating;

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN").format(price);

  return (
    <a
      href={`/product/${watch.id}`}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Image Slideshow */}
      <div className="relative overflow-hidden h-64 rounded-t-xl">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={watch.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1">
        <p className="text-xs font-medium text-gray-500 uppercase">
          {watch.brand}
        </p>
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {watch.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < fullStars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">{rating.toFixed(1)}</span>
        </div>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-lg flex items-center">
            <RupeeSign className="w-4 h-4 mr-0.5" />
            {formatPrice(watch.discountedPrice || watch.price)}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log(`Added ${watch.id} to cart`);
            }}
            className="flex items-center bg-black text-white px-3 py-1 rounded-full text-sm hover:bg-white hover:text-black hover:ring-2 hover:ring-black transition"
          >
            <ShoppingBag size={14} className="mr-1" /> Add
          </button>
        </div>
      </div>
    </a>
  );
}

export default function ProductGrid() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/watches")
      .then((res) => res.json())
      .then((data) => {
        const items = data.data || [];
        const shuffled = items.sort(() => 0.5 - Math.random());
        setWatches(shuffled.slice(0, 4)); // Only 4 watches
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Loading watches...</p>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Featured Watches
          </h2>
          <a
            href="/all-products"
            className="text-sm font-semibold text-black hover:text-gray-700 flex items-center gap-1"
          >
            View All <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {watches.map((watch) => (
            <SingleWatch key={watch.id} watch={watch} />
          ))}
        </div>
      </div>
    </section>
  );
}