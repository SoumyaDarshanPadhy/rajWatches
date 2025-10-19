"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * localStorage cache helper:
 * stores { ts: Date.now(), payload: ... }
 * TTL in ms
 */
const setCache = (key, payload, ttl = 1000 * 60 * 10) => {
  try {
    const record = { ts: Date.now(), ttl, payload };
    localStorage.setItem(key, JSON.stringify(record));
  } catch (e) {
    /* ignore storage errors */
  }
};

const getCache = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const record = JSON.parse(raw);
    if (!record || !record.ts) return null;
    if (Date.now() - record.ts > (record.ttl || 0)) {
      localStorage.removeItem(key);
      return null;
    }
    return record.payload;
  } catch (e) {
    return null;
  }
};

export default function CategoryList({ slug = "all", initialBrand = null }) {
  const [watches, setWatches] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState(initialBrand || "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [debounceKey, setDebounceKey] = useState(0);

  const debounceTimer = useRef(null);

  const limit = 15;
  const ttlMs = 1000 * 60 * 10; // 10 minutes cache per page

  // Build API URL with params
  function buildUrl(p = page) {
    const params = new URLSearchParams();
    params.set("page", p);
    params.set("limit", limit);
    if (brand) params.set("brand", brand);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    // map slug to category label (if needed). If your API expects category names use mapping.
    // If slug is already a label, pass it.
    if (slug && slug !== "all") params.set("category", slug);
    return `/api/watches?${params.toString()}`;
  }

  useEffect(() => {
    // fetch on page or filter change
    let key = `${slug}-${brand || "all"}-p${page}-min${minPrice || "0"}-max${maxPrice || "0"}`;
    const cached = getCache(key);
    if (cached) {
      setWatches(cached.data);
      setTotalPages(cached.totalPages);
      setLoading(false);
      // prefetch next page if exists
      if (cached.page < cached.totalPages) prefetchPage(cached.page + 1);
      return;
    }

    setLoading(true);
    const url = buildUrl(page);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWatches(data.data || []);
        setTotalPages(data.totalPages || 1);
        setCache(key, data, ttlMs);
        // prefetch next page
        if (data.page < data.totalPages) prefetchPage(data.page + 1);
      })
      .catch((err) => {
        console.error("Failed to fetch watches:", err);
      })
      .finally(() => setLoading(false));
  }, [page, brand, debounceKey, slug, minPrice, maxPrice]);

  // Debounce filter input to avoid too many requests
  const onFilterChange = () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setPage(1); // reset page when filters change
      setDebounceKey((k) => k + 1); // trigger fetch
    }, 450);
  };

  const prefetchPage = (p) => {
    const url = buildUrl(p);
    // quick background fetch to warm cache (no localStorage write here to avoid race; we'll store on actual fetch)
    fetch(url, { method: "GET", cache: "force-cache" }).catch(() => {});
  };

  // Avoid hydration mismatch: any random values (ratings) should be computed on client only
  // We'll render rating as "—" server side; here we can compute if needed per-item on client.

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:gap-4">
        <div className="flex items-center gap-2">
          <input
            placeholder="Brand (optional)"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
            onBlur={onFilterChange}
            className="border px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-center gap-2 mt-3 md:mt-0">
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={onFilterChange}
            className="border px-3 py-2 rounded w-28"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={onFilterChange}
            className="border px-3 py-2 rounded w-28"
          />
          <button
            onClick={() => {
              setPage(1);
              setDebounceKey((k) => k + 1);
            }}
            className="ml-4 px-4 py-2 bg-black text-white rounded"
          >
            Apply
          </button>
          <button
            onClick={() => {
              setBrand("");
              setMinPrice("");
              setMaxPrice("");
              setPage(1);
              setDebounceKey((k) => k + 1);
            }}
            className="ml-2 px-3 py-2 border rounded"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : watches.length === 0 ? (
        <div className="text-center py-20">No items found.</div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {watches.map((w) => {
              const images = Array.isArray(w.images) ? w.images : (w.images || "").split(",");
              return (
                <Link key={w.id} href={`/watches/product/${w.id}`} className="block">
                  <div className="bg-white rounded-lg p-3 shadow hover:shadow-lg transition">
                    <div className="relative w-full aspect-[4/5] mb-3 overflow-hidden rounded">
                      <Image
                        src={images[0] || "/placeholder.jpg"}
                        alt={w.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="text-xs text-gray-500 uppercase">{w.brand}</p>
                    <h3 className="font-semibold text-sm truncate">{w.name}</h3>
                    <div className="mt-2 font-bold">{new Intl.NumberFormat("en-IN").format(w.discountedPrice || w.price)}</div>
                    {/* Client-only rating example: compute visually using client-only data if needed */}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <div className="text-sm text-gray-700">Page {page} of {totalPages}</div>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
