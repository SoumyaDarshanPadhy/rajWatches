"use client";

import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: 'Men', href: '/watches/category/men' },
    { name: 'Women', href: '/watches/category/women' },
    { name: 'Wall Clocks', href: '/watches/category/wallclocks' },
    { name: 'Unisex', href: '/watches/category/unisex' },
    { name: 'Couple', href: '/watches/category/couple' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    // Navigate to watches category filtered by modelNumber (case-insensitive partial match)
    router.push(`/watches/category/all?modelNumber=${encodeURIComponent(query)}`);
    setSearchQuery('');
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-3 space-y-3 sm:space-y-0">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center space-x-3">
            <button
              className="sm:hidden text-gray-700 hover:text-gray-900 p-1 rounded-md"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            <a
              href="/"
              className="text-2xl font-extrabold tracking-widest text-black hover:text-gray-700"
            >
              RAJ & RAJ WATCHES
            </a>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative w-full sm:w-1/2 md:max-w-md">
          <input
            type="text"
            placeholder="Search watches by model number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 text-gray-900 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-black border border-gray-200"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-black"
          >
            <Search size={18} />
          </button>
        </form>

        <div className="hidden sm:flex items-center space-x-5">
          {/* Optional account/cart icons */}
        </div>
      </div>

      {/* Desktop Nav Links */}
      <div className="bg-gray-50 border-t border-gray-200 hidden sm:block">
        <ul className="flex justify-center space-x-10 py-3 text-sm font-semibold">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-gray-700 hover:text-black transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
