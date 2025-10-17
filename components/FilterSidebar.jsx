// /ecommerce/components/FilterSidebar.jsx
"use client";

import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

// The onFilterChange prop is now expected to be a function that triggers a fetch or updates the parent state.
const FilterSidebar = ({ onFilterChange }) => {
  const [price, setPrice] = useState(5000);
  const [gender, setGender] = useState("");
  const [brands, setBrands] = useState([]);

  // Mock list of all available brands (in a real app, this should be fetched from the API)
  const availableBrands = ["Fastrack", "Sonata", "Titan", "Timex", "Fossil", "Police"];

  const handleBrandChange = (brand) => {
    setBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const applyFilters = async () => {
    // 1. Build the query string from the current state
    const params = new URLSearchParams();
    
    if (price) {
      params.append('price', price);
    }
    if (gender) {
      params.append('gender', gender);
    }
    if (brands.length > 0) {
      params.append('brands', brands.join(','));
    }
    
    const queryString = params.toString();

    // 2. Call the new backend Route Handler
    try {
      // The API endpoint is /api/watches, which maps to /app/api/watches/route.js
      const response = await fetch(`/api/watches?${queryString}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const filteredData = await response.json();
      
      // 3. Pass the fetched data up to the parent component for display
      onFilterChange?.(filteredData);
      
    } catch (error) {
      console.error("Error applying filters:", error);
      // Handle error in the UI (e.g., show a toast)
      onFilterChange?.([]); // Clear watches or pass an empty array on error
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md border-r border-gray-200 p-6 flex flex-col space-y-6 sticky top-0">
      {/* Header (unchanged) */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <SlidersHorizontal size={20} /> Filters
        </h2>
      </div>

      {/* Price Filter (unchanged) */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Price Range</h3>
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>₹0</span>
          <span>₹{price}</span>
          <span>₹10000</span>
        </div>
        <input
          type="range"
          min="0"
          max="10000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black"
        />
      </div>

      {/* Gender Filter (unchanged) */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Gender</h3>
        <div className="space-y-2">
          {["Men", "Women"].map((option) => (
            <label
              key={option}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name="gender"
                value={option}
                checked={gender === option}
                onChange={(e) => setGender(e.target.value)}
                className="accent-black"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filter - using the mock list */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Brands</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {availableBrands.map((brand) => (
            <label
              key={brand}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={brand}
                checked={brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="accent-black"
              />
              <span className="text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Button - calls the API */}
      <button
        onClick={applyFilters}
        className="mt-auto w-full py-2 px-4 bg-black text-white rounded-lg font-semibold hover:bg-white hover:border-2 hover:border-black hover:text-black transition"
      >
        Apply Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;