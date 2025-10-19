"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, ShoppingBag, Filter } from "lucide-react";

const BRANDS = [
  "Fastrack",
  "Titan",
  "SF",
  "Tommy Hilfiger",
  "Police",
  "Kenneth Cole",
  "Sonata",
  "Poze",
  "Ajanta",
  "Raga",
  "Vyb",
];

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
      <span className="text-xl font-extrabold text-gray-900">
        {formatPrice(finalPrice)}
      </span>
      {discountedPrice && (
        <span className="text-gray-400 line-through text-sm font-medium">
          {formatPrice(price)}
        </span>
      )}
    </div>
  );
};

export default function CategoryPage() {
  const params = useParams();
  const [slug, setSlug] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceInput, setPriceInput] = useState("");
  const [sortInput, setSortInput] = useState("");
  const [filters, setFilters] = useState({
    brands: [],
    price: "",
    sort: "",
  });
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  // Set category slug
  useEffect(() => {
    setSlug(params.slug || "");
  }, [params]);

  // Fetch Data
  const fetchWatches = async () => {
    if (!slug) return;
    setLoading(true);

    const paramsObj = new URLSearchParams();
    paramsObj.append("page", page);
    paramsObj.append("limit", limit);

    if (filters.price) paramsObj.append("price", filters.price);
    if (filters.brands.length > 0)
      paramsObj.append("brands", filters.brands.join(","));
    if (filters.sort) paramsObj.append("sort", filters.sort);

    const categoryMap = {
      men: "Guys Watch",
      women: "Girls Watch",
      wallclocks: "Wall clock",
      unisex: "unisex watch",
      couple: "couple watch",
      all: "all",
    };
    const dbCategory = categoryMap[slug.toLowerCase()] || "all";
    if (dbCategory !== "all") paramsObj.append("category", dbCategory);

    try {
      const res = await fetch(`/api/watches?${paramsObj.toString()}`);
      const data = await res.json();
      if (data?.status === "success") {
        setWatches(data.data);
        setTotalPages(data.totalPages || 1);
      } else {
        setWatches([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Error fetching watches:", err);
      setWatches([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch only when filters or page changes
  useEffect(() => {
    fetchWatches();
  }, [slug, page, filters]);

  // Toggle brand selection
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  // Apply filters manually
  const handleShowResults = () => {
    setPage(1);
    setFilters({
      brands: selectedBrands,
      price: priceInput,
      sort: sortInput,
    });
  };

  // Reset filters
  const handleReset = () => {
    setSelectedBrands([]);
    setPriceInput("");
    setSortInput("");
    setFilters({ brands: [], price: "", sort: "" });
    setPage(1);
  };

  return (
    <section className="bg-gray-50 min-h-screen w-full py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* FILTERS */}
        <div className="mb-8 bg-white p-5 rounded-lg shadow-md space-y-6">
          <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
            <Filter className="w-5 h-5" /> Filters
          </div>

          {/* Brand Filter */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">Brands</h3>
            <div className="flex flex-wrap gap-2">
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  className={`px-3 py-1 rounded-full border text-sm transition ${
                    selectedBrands.includes(brand)
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price + Sort Filter Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Price Filter */}
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Max Price</h3>
              <input
                type="number"
                placeholder="e.g. 5000"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                className="border px-3 py-1 rounded-md w-32 text-gray-700 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Sort Filter */}
            <div>
              <h3 className="font-semibold mb-2 text-gray-700">Sort By</h3>
              <select
                value={sortInput}
                onChange={(e) => setSortInput(e.target.value)}
                className="border px-3 py-1 rounded-md w-48 text-gray-700 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Newest</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleShowResults}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition"
            >
              Show Results
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-medium hover:bg-gray-300 transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading watches...</div>
        ) : watches.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No products found for selected filters.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {watches.map((watch) => (
                <Link
                  key={watch.id}
                  href={`/watches/product/${watch.id}`}
                  className="group block bg-white p-4 rounded-xl shadow hover:shadow-xl transition"
                >
                  <div className="relative w-full aspect-[4/5] mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={
                        Array.isArray(watch.images)
                          ? watch.images[0]
                          : watch.images?.split(",")[0]
                      }
                      alt={watch.name}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <p className="text-xs text-gray-500 uppercase">{watch.brand}</p>
                  <h2 className="text-base font-bold text-gray-800 truncate">
                    {watch.name}
                  </h2>
                  <PriceDisplay
                    price={watch.price}
                    discountedPrice={watch.discountedPrice}
                  />
                </Link>
              ))}
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