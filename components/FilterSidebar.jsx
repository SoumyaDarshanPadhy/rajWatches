"use client";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const availableBrands = [
  "Tommy Hilfiger",
  "Kenneth Cole",
  "Police",
  "Casio",
  "Titan",
  "Fastrack",
  "Sonata",
  "Ajanta",
  "Solar",
];

const wallclockBrands = ["Ajanta", "Titan", "Solar"];

// make the collection labels match your UI exactly
const availableCollections = [
  { label: "Men", value: "Guys Watch" },
  { label: "Women", value: "Girls Watch" },
  { label: "Couple", value: "couple watch" },
  {
    label: "Smartwatches",
    value: ["smart-guys watch", "smart-girls watch", "smart-unisex watch"],
  },
  // NOTE: label changed to "Wall Clocks" to match your CollectionCircles
  { label: "Wall Clocks", value: "Wall clock" },
];

const genderOptions = ["Men", "Women", "Unisex"];

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "asc", label: "Price: Low to High" },
  { value: "desc", label: "Price: High to Low" },
];

export default function FilterSidebar({ filters = {}, setFilters, onClearAll }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getArray = (arr) => (Array.isArray(arr) ? arr : []);

  const normalize = (s = "") =>
    String(s).toLowerCase().replace(/[\s-_]+/g, "");

  // Detect wallclock using current filters (if parent provided) or via URL
  const isWallClockSelectedFromFilters = () => {
    const cols = getArray(filters.collections);
    return cols.some((c) => normalize(c).includes("wall"));
  };

  // Effect: on mount / when pathname/search change, ensure the filter state
  // reflects the route or query param. This lets direct URL visits work.
  useEffect(() => {
    // Prefer query param ?collection=...
    const collQuery = searchParams?.get("collection");
    const path = pathname || "";

    // helper: returns canonical label from availableCollections if matched
    const findCollectionLabel = (candidate) => {
      if (!candidate) return null;
      const norm = normalize(candidate);
      const found = availableCollections.find((c) => normalize(c.label) === norm);
      if (found) return found.label;
      // fallback: if candidate includes "wall", return "Wall Clocks"
      if (norm.includes("wall")) return "Wall Clocks";
      // try matching by link-like tokens (e.g. "wallclocks")
      return null;
    };

    const candidateFromQuery = findCollectionLabel(collQuery);
    // try detect from pathname, e.g. "/watches/category/wallclocks"
    const pathParts = path.split("/").filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1] || "";
    const candidateFromPath = findCollectionLabel(lastPart);

    const candidate = candidateFromQuery || candidateFromPath;

    if (!candidate) return; // nothing to preselect

    // If filters already contain that collection, no-op
    const prevCols = getArray(filters.collections);
    if (prevCols.includes(candidate)) {
      // still ensure pruning for wall clocks if necessary
      if (normalize(candidate).includes("wall") && !arraysEqual(getArray(filters.brands), getArray(filters.brands).filter((b) => wallclockBrands.includes(b)))) {
        setFilters((prev = {}) => ({
          ...prev,
          brands: getArray(prev.brands).filter((b) => wallclockBrands.includes(b)),
        }));
      }
      return;
    }

    // set the filter collection and prune brands if wall clocks selected
    setFilters((prev = {}) => {
      const nextCollections = [...getArray(prev.collections), candidate];

      const isWall = normalize(candidate).includes("wall");
      const nextBrands = isWall
        ? getArray(prev.brands).filter((b) => wallclockBrands.includes(b))
        : prev.brands;

      return {
        ...prev,
        collections: nextCollections,
        brands: nextBrands,
      };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams?.toString()]);

  // simple equality helper
  function arraysEqual(a = [], b = []) {
    if (a.length !== b.length) return false;
    const sa = [...a].sort();
    const sb = [...b].sort();
    return sa.every((v, i) => v === sb[i]);
  }

  // UI helpers
  const isChecked = (group, value) => {
    const grp = filters[group];
    if (Array.isArray(grp)) return grp.includes(value);
    return grp === value;
  };

  // Toggle for multi-select groups. Special-case collections to prune brands.
  const toggleCheckbox = (group, value) => {
    setFilters((prev = {}) => {
      const prevGroup = Array.isArray(prev[group]) ? prev[group] : [];
      const exists = prevGroup.includes(value);
      const nextGroup = exists ? prevGroup.filter((v) => v !== value) : [...prevGroup, value];

      if (group === "collections") {
        const wallSelected = nextGroup.some((c) => normalize(c).includes("wall"));
        const nextBrands = wallSelected
          ? getArray(prev.brands).filter((b) => wallclockBrands.includes(b))
          : prev.brands;
        return {
          ...prev,
          collections: nextGroup,
          brands: nextBrands,
        };
      }

      return {
        ...prev,
        [group]: nextGroup,
      };
    });
  };

  const handlePrice = (e) => {
    const val = Number(e.target.value || 0);
    setFilters((prev = {}) => ({
      ...prev,
      price: val,
    }));
  };

  const handleSort = (e) => {
    setFilters((prev = {}) => ({
      ...prev,
      sortBy: e.target.value,
    }));
  };

  // Decide which brands to show
  const activeWall = isWallClockSelectedFromFilters();
  const brandsToShow = activeWall ? wallclockBrands : availableBrands;

  const currentPrice = typeof filters.price === "number" ? filters.price : 50000;
  const currentSort = filters.sortBy || "relevance";

  return (
    <aside className="w-72 min-h-screen bg-white shadow-lg border-r border-gray-200 py-8 px-6 flex flex-col gap-8 sticky top-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="uppercase tracking-wider font-extrabold text-lg text-[#b89f56]">
          Filter By
        </h2>
        <button
          className="text-sm text-gray-400 hover:text-[#b89f56] transition"
          onClick={onClearAll}
        >
          Clear All
        </button>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold text-base mb-2 text-gray-700">Sort By</h3>
        <select
          value={currentSort}
          onChange={handleSort}
          className="w-full px-3 py-2 border border-gray-300 rounded text-base bg-white text-gray-800 font-semibold focus:outline-none"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold text-base mb-2 text-gray-700">Brands</h3>
        <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1">
          {brandsToShow.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked("brands", brand)}
                onChange={() => toggleCheckbox("brands", brand)}
                className="accent-[#b89f56]"
              />
              <span className="text-gray-800">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Collections */}
      <div>
        <h3 className="font-semibold text-base mb-2 text-gray-700">Collection</h3>
        <div className="flex flex-col gap-2">
          {availableCollections.map((c) => (
            <label key={c.label} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked("collections", c.label)}
                onChange={() => toggleCheckbox("collections", c.label)}
                className="accent-[#b89f56]"
              />
              <span className="text-gray-800">{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender: hide for wall clocks */}
      {!activeWall && (
        <div>
          <h3 className="font-semibold text-base mb-2 text-gray-700">Gender</h3>
          <div className="flex flex-col gap-2">
            {genderOptions.map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked("gender", g)}
                  onChange={() => toggleCheckbox("gender", g)}
                  className="accent-[#b89f56]"
                />
                <span className="text-gray-800">{g}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Slider */}
      <div>
        <h3 className="font-semibold text-base mb-3 text-gray-700">Max Price</h3>
        <input
          type="range"
          min={500}
          max={50000}
          step={500}
          value={currentPrice}
          onChange={handlePrice}
          className="w-full accent-[#b89f56]"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1 font-mono">
          <span>₹500</span>
          <span>₹{currentPrice}</span>
          <span>₹50000</span>
        </div>
      </div>
    </aside>
  );
}

// "use client";
// import React from "react";

// const availableBrands = [
//   "Tommy Hilfiger",
//   "Kenneth Cole",
//   "Police",
//   "Casio",
//   "Titan",
//   "Fastrack",
//   "Sonata",
//   "Ajanta",
//   "Solar",
// ];
// const availableCollections = [
//   { label: "Men", value: "Guys Watch" },
//   { label: "Women", value: "Girls Watch" },
//   { label: "Couple", value: "couple watch" },
//   { label: "Smartwatches", value: ["smart-guys watch", "smart-girls watch", "smart-unisex watch"] },
//   { label: "Wallclock", value: "Wall clock" },
// ];

// // const availableCollections = [
// //   "Men",
// //   "Women",
// //   "Couple",
// //   "Smartwatches",
// //   "Wallclock",
// // ];

// const genderOptions = ["Men", "Women", "Unisex"];

// const sortOptions = [
//   { value: "relevance", label: "Relevance" },
//   { value: "asc", label: "Price: Low to High" },
//   { value: "desc", label: "Price: High to Low" },
// ];

// export default function FilterSidebar({ filters, setFilters, onClearAll }) {
//   // Handlers
//   const toggleCheckbox = (group, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [group]: prev[group]?.includes(value)
//         ? prev[group].filter((b) => b !== value)
//         : [...(prev[group] || []), value],
//     }));
//   };

//   const handlePrice = (e) => {
//     setFilters((prev) => ({
//       ...prev,
//       price: Number(e.target.value),
//     }));
//   };

//   const handleSort = (e) => {
//     setFilters((prev) => ({
//       ...prev,
//       sortBy: e.target.value,
//     }));
//   };

//   return (
//     <aside className="w-72 min-h-screen bg-white shadow-lg border-r border-gray-200 py-8 px-6 flex flex-col gap-8 sticky top-0">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-2">
//         <h2 className="uppercase tracking-wider font-extrabold text-lg text-[#b89f56]">
//           Filter By
//         </h2>
//         <button
//           className="text-sm text-gray-400 hover:text-[#b89f56] transition"
//           onClick={onClearAll}
//         >
//           Clear All
//         </button>
//       </div>

//       {/* Sort */}
// <div>
//   <h3 className="font-semibold text-base mb-2 text-gray-700">Sort By</h3>
//   <select
//     value={filters.sortBy}
//     onChange={handleSort}
//     className="w-full px-3 py-2 border border-gray-300 rounded text-base bg-white text-gray-800 font-semibold focus:outline-none"
//   >
//     {sortOptions.map((opt) => (
//       <option key={opt.value} value={opt.value}>
//         {opt.label}
//       </option>
//     ))}
//   </select>
// </div>


//       {/* Brands */}
//       <div>
//         <h3 className="font-semibold text-base mb-2 text-gray-700">Brands</h3>
//         <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1">
//           {availableBrands.map((brand) => (
//             <label key={brand} className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={filters.brands?.includes(brand)}
//                 onChange={() => toggleCheckbox("brands", brand)}
//                 className="accent-[#b89f56]"
//               />
//               <span className="text-gray-800">{brand}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Collections */}
//       <div>
//   <h3 className="font-semibold text-base mb-2 text-gray-700">Collection</h3>
//   <div className="flex flex-col gap-2">
//     {availableCollections.map((c) => (
//       <label key={c.label} className="flex items-center gap-2 cursor-pointer">
//         <input
//           type="checkbox"
//           checked={filters.collections?.includes(c.label)}
//           onChange={() => toggleCheckbox("collections", c.label)}
//           className="accent-[#b89f56]"
//         />
//         <span className="text-gray-800">{c.label}</span>
//       </label>
//     ))}
//   </div>
// </div>

//       {/* <div>
//         <h3 className="font-semibold text-base mb-2 text-gray-700">Collection</h3>
//         <div className="flex flex-col gap-2">
//           {availableCollections.map((c) => (
//             <label key={c} className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={filters.collections?.includes(c)}
//                 onChange={() => toggleCheckbox("collections", c)}
//                 className="accent-[#b89f56]"
//               />
//               <span className="text-gray-800">{c}</span>
//             </label>
//           ))}
//         </div>
//       </div> */}

//       {/* Gender */}
//       <div>
//         <h3 className="font-semibold text-base mb-2 text-gray-700">Gender</h3>
//         <div className="flex flex-col gap-2">
//           {genderOptions.map((g) => (
//             <label key={g} className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={filters.gender?.includes(g)}
//                 onChange={() => toggleCheckbox("gender", g)}
//                 className="accent-[#b89f56]"
//               />
//               <span className="text-gray-800">{g}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Price Slider */}
//       <div>
//         <h3 className="font-semibold text-base mb-3 text-gray-700">Max Price</h3>
//         <input
//           type="range"
//           min={500}
//           max={50000}
//           step={500}
//           value={filters.price}
//           onChange={handlePrice}
//           className="w-full accent-[#b89f56]"
//         />
//         <div className="flex justify-between text-xs text-gray-500 mt-1 font-mono">
//           <span>₹500</span>
//           <span>₹{filters.price}</span>
//           <span>₹50000</span>
//         </div>
//       </div>
//     </aside>
//   );
// }

// import React, { useState } from "react";

// const BRANDS = [
//   { name: "Tommy Hilfiger", count: 68 },
//   { name: "Kenneth Cole", count: 54 },
//   { name: "Police", count: 33 },
//   { name: "Casio", count: 120 },
//   { name: "Titan", count: 430 },
//   { name: "Fastrack", count: 210 },
//   { name: "Sonata", count: 88 },
//   { name: "Ajanta", count: 14 },
//   { name: "Solar", count: 9 },
// ];
// const COLLECTIONS = [
//   "Men",
//   "Women",
//   "Couple",
//   "Smartwatches",
//   "Wallclock",
// ];

// export default function FilterSidebar({
//   filters, setFilters, onClearAll
// }) {
//   const [seeMoreBrands, setSeeMoreBrands] = useState(false);

//   // Example handlers for demo state (you'd use parent state logic)
//   const toggleBrand = (brand) =>
//     setFilters((f) => ({
//       ...f,
//       brands: f.brands.includes(brand)
//         ? f.brands.filter((b) => b !== brand)
//         : [...f.brands, brand],
//     }));

//   const toggleCollection = (col) =>
//     setFilters((f) => ({
//       ...f,
//       collections: f.collections.includes(col)
//         ? f.collections.filter((b) => b !== col)
//         : [...f.collections, col],
//     }));

//   return (
//     <aside className="w-[320px] min-h-screen px-6 pt-6 pb-8 bg-white border-r border-gray-200 space-y-8 font-sans shadow-xl sticky top-0">
//       {/* Sort dropdown */}
//       <div className="mb-3 flex flex-col gap-1">
//         <label className="font-semibold text-sm text-gray-800">SORT BY:</label>
//         <select
//           className="w-full px-3 py-2 border border-gray-300 rounded text-base bg-white focus:outline-none"
//           value={filters.sortBy}
//           onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value }))}
//         >
//           <option value="relevance">Relevance</option>
//           <option value="priceLowHigh">Price: Low to High</option>
//           <option value="priceHighLow">Price: High to Low</option>
//         </select>
//       </div>

//       <div className="flex items-center justify-between mb-2">
//         <h3 className="uppercase tracking-wide font-bold text-[22px] text-black flex items-center gap-2">
//           <span className="text-xl">⌕</span> Filter By
//         </h3>
//         <button className="text-gray-500 text-sm font-medium uppercase" onClick={onClearAll}>
//           CLEAR ALL
//         </button>
//       </div>
//       <hr className="mb-2"/>

//       {/* Brands */}
//       <div>
//         <div className="font-semibold text-lg mb-3 flex items-center justify-between">Brands</div>
//         <div className="space-y-2 max-h-[212px] overflow-y-auto pr-2 text-base">
//           {(seeMoreBrands ? BRANDS : BRANDS.slice(0, 6)).map((brand) => (
//             <label
//               key={brand.name}
//               className="flex items-center gap-2 cursor-pointer"
//             >
//               <input
//                 type="checkbox"
//                 checked={filters.brands.includes(brand.name)}
//                 onChange={() => toggleBrand(brand.name)}
//                 className="accent-black"
//               />
//               <span className="text-gray-800">{brand.name} {brand.count && <span className="text-gray-400">({brand.count})</span>}</span>
//             </label>
//           ))}
//           <button
//             className="ml-1 text-black text-[17px] underline underline-offset-2"
//             onClick={() => setSeeMoreBrands((x) => !x)}
//           >
//             {seeMoreBrands ? "See Less" : "See More"}
//           </button>
//         </div>
//       </div>
//       <hr className="my-2"/>

//       {/* Price */}
//       <details open className="mb-2 group">
//         <summary className="font-semibold text-lg cursor-pointer select-none focus:outline-none">Price</summary>
//         <div className="mt-2 flex items-center gap-2">
//           <input
//             type="range"
//             min={500}
//             max={50000}
//             step={500}
//             value={filters.price}
//             onChange={e => setFilters(f => ({...f, price: +e.target.value}))}
//             className="w-full accent-black"
//           />
//           <span className="text-base text-gray-700 font-medium ml-2">Up to ₹{filters.price}</span>
//         </div>
//       </details>
//       <hr className="my-2"/>

//       {/* Gender */}
//       <details open className="mb-2 group">
//         <summary className="font-semibold text-lg cursor-pointer select-none focus:outline-none">Gender</summary>
//         <div className="flex flex-col gap-1 mt-2">
//           {["Men", "Women", "Unisex", "Couple"].map((g) => (
//             <label key={g} className="flex gap-2 items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={filters.gender.includes(g)}
//                 onChange={() =>
//                   setFilters((f) => ({
//                     ...f,
//                     gender: f.gender.includes(g)
//                       ? f.gender.filter((v) => v !== g)
//                       : [...f.gender, g],
//                   }))
//                 }
//                 className="accent-black"
//               />
//               <span className="text-gray-800">{g}</span>
//             </label>
//           ))}
//         </div>
//       </details>
//       <hr className="my-2"/>

//       {/* Collection */}
//       <details open className="mb-2 group">
//         <summary className="font-semibold text-lg cursor-pointer select-none focus:outline-none">Collection</summary>
//         <div className="flex flex-col gap-1 mt-2">
//           {COLLECTIONS.map((col) => (
//             <label key={col} className="flex gap-2 items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={filters.collections.includes(col)}
//                 onChange={() => toggleCollection(col)}
//                 className="accent-black"
//               />
//               <span className="text-gray-800">{col}</span>
//             </label>
//           ))}
//         </div>
//       </details>
//     </aside>
//   );
// }
