"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";
import { ArrowRight, ShoppingBag } from "lucide-react";

// ---------------- Price Display Component ----------------
const PriceDisplay = ({ price, discountedPrice }) => {
  const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const finalPrice = discountedPrice || price;

  return (
    <div className="mt-2 flex items-baseline gap-2">
      <span className="text-xl font-extrabold text-gray-900">{formatPrice(finalPrice)}</span>
      {discountedPrice && (
        <span className="text-gray-400 line-through text-sm font-medium">{formatPrice(price)}</span>
      )}
    </div>
  );
};

// ---------------- Main Component ----------------
export default function CategoryPage() {
  const params = useParams(); // ✅ get dynamic params
  const searchParams = useSearchParams(); // ✅ for ?brand=
  const [slug, setSlug] = useState("");
  const [brand, setBrand] = useState(null);

  // --------- States ----------
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [priceFilterInput, setPriceFilterInput] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  // Unwrap params and searchParams
  useEffect(() => {
    setSlug(params.slug || "");
    setBrand(searchParams.get("brand") || null);
  }, [params, searchParams]);

  // --------- Fetch Watches ----------
  const fetchWatches = async () => {
    if (!slug) return;
    setLoading(true);

    const paramsObj = new URLSearchParams();
    paramsObj.append("page", page);
    paramsObj.append("limit", limit);
    if (brand) paramsObj.append("brand", brand);
    if (priceFilter) paramsObj.append("price", priceFilter);

    const categoryMap = {
      men: "Guys Watch",
      women: "Girls Watch",
      wallclocks: "Wall Watch",
      all: "all",
    };

    const dbCategory = categoryMap[slug.toLowerCase()] || "all";
    if (dbCategory !== "all") paramsObj.append("category", dbCategory);

    try {
      const res = await fetch(`/api/watches?${paramsObj.toString()}`);
      const data = await res.json();
      setWatches(data.data);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch watches:", error);
      setWatches([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatches();
  }, [slug, brand, page, priceFilter]);

  const handleFilterClick = () => {
    setPage(1);
    setPriceFilter(priceFilterInput);
  };

  // --------- Invalid category ----------
  if (!slug) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-10 text-xl text-gray-500 font-medium bg-white w-full">
        Invalid category
      </div>
    );
  }

  // --------- No Products ----------
  if (!loading && watches.length === 0) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-10 bg-white text-gray-800">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-6" />
        <h2 className="text-2xl font-semibold mb-2">No Products Available</h2>
        <p className="mb-6 text-gray-600 text-center max-w-md">
          We couldn't find any watches for the criteria:{" "}
          <span className="font-semibold text-gray-800">{slug}</span>
          {brand && <span className="font-semibold text-gray-800"> in the "{brand}" brand.</span>}
        </p>
        <Link
          href="/watches/category/all"
          className="flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition duration-300 border border-indigo-500 hover:border-indigo-800 px-4 py-2 rounded-full"
        >
          Browse All Watches <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen w-full py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header / Title */}
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              {brand ? <span className="text-indigo-600">{brand}'s</span> : <span className="text-indigo-600">Shop</span>}{" "}
              {slug.charAt(0).toUpperCase() + slug.slice(1)} Watches
            </h1>
            <p className="mt-2 text-xl text-gray-500">Showing {watches.length} items.</p>
          </div>

          {/* Price Filter */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Max Price"
              value={priceFilterInput}
              onChange={(e) => setPriceFilterInput(e.target.value)}
              className="border px-3 py-1 rounded-md w-32 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleFilterClick}
              className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 transition"
            >
              Filter
            </button>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading watches...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {watches.map((watch) => {
                const imagesArray = Array.isArray(watch.images)
                  ? watch.images
                  : typeof watch.images === "string"
                  ? watch.images.split(",")
                  : [];

                return (
                  <Link
                    key={watch.id}
                    href={`/watches/product/${watch.id}`}
                    className="group block rounded-xl p-4 bg-white transition duration-300 transform hover:shadow-2xl hover:scale-[1.03] overflow-hidden"
                  >
                    <div className="relative w-full aspect-[4/5] h-56 mb-4 overflow-hidden rounded-lg shadow-md bg-gray-100">
                      <Image
                        src={imagesArray[0] || "/placeholder.jpg"}
                        alt={watch.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                        priority={true}
                      />
                    </div>

                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
                      {watch.brand}
                    </p>
                    <h2 className="text-base md:text-lg font-bold text-gray-800 truncate transition mt-1">
                      {watch.name}
                    </h2>
                    <PriceDisplay price={watch.price} discountedPrice={watch.discountedPrice} />
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-4 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50 text-black"
              >
                Previous
              </button>
              <span className="text-black">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50 text-black"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}