"use client";

import React from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, User, Globe, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<string>('home');

  React.useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="bg-white shadow-sm">
      {/* Top Header */}
      <div className="border-b border-gray-200">
        <div className="px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">
                <span className="text-[#4C7C3C]">fresh</span>
                <span className="text-[#FF8424]">mart</span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products, categories or brands..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C7C3C] focus:border-transparent text-gray-700"
                />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-6">
              {/* Language Selector */}
              <button className="flex items-center space-x-1 text-gray-700 transition-colors hover:[&>*]:text-[#4C7C3C]">
                <Globe className="w-5 h-5 transition-colors" />
                <span className="text-sm font-medium transition-colors">EN</span>
                <ChevronDown className="w-4 h-4 transition-colors" />
              </button>

              {/* Wishlist */}
              <button className="relative text-gray-700 hover:text-[#4C7C3C] transition-colors">
                <Heart className="w-6 h-6" />
              </button>

              {/* Cart */}
              <button className="relative text-gray-700 hover:text-[#4C7C3C] transition-colors">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-[#4C7C3C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  2
                </span>
              </button>

              {/* User Profile */}
              <button className="flex items-center space-x-2 text-gray-700 transition-colors hover:[&>*]:text-[#4C7C3C]">
                <User className="w-6 h-6 transition-colors" />
                <span className="text-sm font-medium transition-colors">Sarah,</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={`bg-white border-b border-gray-200 transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-lg' : ''
        }`}>
        <div className="px-4">
          <ul className="flex items-center justify-center space-x-8 py-4">
            <li>
              <a
                href="/"
                onClick={(e) => { setActiveMenu('home'); }}
                className={`${activeMenu === 'home' ? 'text-[#4C7C3C] font-semibold border-b-2 border-[#4C7C3C] pb-1' : 'text-gray-700 hover:text-[#4C7C3C] font-medium'} transition-colors`}
              >
                Home
              </a>
            </li>
            <li className="relative group">
              <Link
                href="/shope"
                onClick={() => setActiveMenu('shop')}
                className={`${activeMenu === 'shop'
                  ? 'text-[#4C7C3C] font-semibold border-b-2 border-[#4C7C3C] pb-1'
                  : 'text-gray-700 hover:text-[#4C7C3C] font-medium'
                  } transition-colors`}
              >
                Shop
              </Link>

              <div className={`absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg z-50`}>
                <ul className="py-2 min-w-55">
                  <li><a href="/shop/fruits" className="block px-4 py-2 text-gray-700 hover:bg-neutral-light hover:text-[#4C7C3C]">Fruits</a></li>
                  <li><a href="/shop/vegetables" className="block px-4 py-2 text-gray-700 hover:bg-neutral-light hover:text-[#4C7C3C]">Vegetables</a></li>
                  <li><a href="/shop/beverages" className="block px-4 py-2 text-gray-700 hover:bg-neutral-light hover:text-[#4C7C3C]">Beverages</a></li>
                </ul>
              </div>
            </li>
            <li className="relative group">
              <a
                href="/offers"
                onClick={(e) => {
                  setActiveMenu(activeMenu === 'offers' ? 'home' : 'offers');
                }}
                className={`${activeMenu === 'offers' ? 'text-[#4C7C3C] font-semibold border-b-2 border-[#4C7C3C] pb-1' : 'text-gray-700 hover:text-[#4C7C3C] font-medium'} transition-colors`}
              >
                Offers
              </a>
              <div className={`absolute left-1/2 -translate-x-1/2 mt-2 ${activeMenu === 'offers' ? 'block' : 'hidden group-hover:block'} bg-white border border-gray-200 rounded-lg shadow-lg z-50`}>
                <ul className="py-2 min-w-55">
                  <li><a href="/offers/daily-deals" className="block px-4 py-2 text-gray-700 hover:bg-neutral-light hover:text-[#4C7C3C]">Daily Deals</a></li>
                  <li><a href="/offers/bulk-savings" className="block px-4 py-2 text-gray-700 hover:bg-neutral-light hover:text-[#4C7C3C]">Bulk Savings</a></li>
                  <li><a href="/offers/coupons" className="block px-4 py-2 text-gray-700 hover:bg-neutral-light hover:text-[#4C7C3C]">Coupons</a></li>
                </ul>
              </div>
            </li>
            <li>
              <a href="/help" className="text-gray-700 hover:text-[#4C7C3C] font-medium transition-colors">
                Help Center
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Spacer when nav is sticky */}
      {isSticky && <div className="h-15"></div>}
    </header>
  );
};

export default Header;