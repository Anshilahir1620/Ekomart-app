'use client';

import React, { useEffect, useState } from 'react';
import { Heart, ChevronDown, ChevronUp, Grid, List } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UserProduct as ProductType } from '@/app/types/Product';
import { Categorie } from '@/app/types/Categorie';
import { Subcategorie } from '@/app/types/Subcategorie';
import { getProducts } from '@/app/services/Products.api';
import { getCategories } from '@/app/services/Categories.api';
import { GetSubcategories } from '@/app/services/Subcategories.api';

export default function ShopPage() {
  const router = useRouter();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [subcategories, setSubCategories] = useState<Subcategorie[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);

  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
    getCategories().then(setCategories).catch(console.error);
    GetSubcategories().then(setSubCategories).catch(console.error);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  const toggleFilter = (
    type: 'category' | 'subcategory',
    value: string
  ) => {
    if (type === 'category') {
      setSelectedCategories(prev =>
        prev.includes(value)
          ? prev.filter(v => v !== value)
          : [...prev, value]
      );
    }

    if (type === 'subcategory') {
      setSelectedSubCategories(prev =>
        prev.includes(value)
          ? prev.filter(v => v !== value)
          : [...prev, value]
      );
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setPriceRange({ min: 0, max: 1000 });
    setCurrentPage(1);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredProducts = products.filter(p => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.category);

    const subCategoryMatch =
      selectedSubCategories.length === 0 ||
      selectedSubCategories.includes(p.type);

    const priceMatch =
      p.sale_price >= priceRange.min &&
      p.sale_price <= priceRange.max;

    return categoryMatch && subCategoryMatch && priceMatch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 text-sm">
          <button
            onClick={() => router.push('/')}
            className="text-gray-500 hover:text-gray-900"
          >
            Home
          </button>
          <span className="text-gray-400">›</span>
          <button
            onClick={resetFilters}
            className="font-medium text-gray-900 hover:text-[#4C7C3C]"
          >
            Shop
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {selectedCategories[0] || 'Shop'}
        </h1>

        <div className="flex justify-between flex-wrap gap-4 mb-8">
          <div className="flex gap-3 flex-wrap text-sm text-gray-700">
            {[
              { key: 'category', label: 'Categories' },
              { key: 'subcategory', label: 'Product type' },
              { key: 'price', label: 'Price range' }
            ].map(({ key, label }) => (
              <div key={key} className="relative">
                <button
                  onClick={() => toggleDropdown(key)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {label}
                  {openDropdown === key ? (
                    <ChevronUp className="w-4 h-4 text-[#4C7C3C]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#4C7C3C]" />
                  )}
                </button>

                {openDropdown === key && (
                  <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-56 z-50 p-2">
                    {key === 'category' &&
                      categories.map(c => (
                        <label
                          key={c.id}
                          className="flex gap-2 px-3 py-2 hover:bg-gray-50 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(c.name)}
                            onChange={() =>
                              toggleFilter('category', c.name)
                            }
                            className="accent-[#4C7C3C]"
                          />
                          <span className="text-sm text-gray-700">
                            {c.name}
                          </span>
                        </label>
                      ))}

                    {key === 'subcategory' &&
                      subcategories.map(sc => (
                        <label
                          key={sc.id}
                          className="flex gap-2 px-3 py-2 hover:bg-gray-50 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubCategories.includes(sc.name)}
                            onChange={() =>
                              toggleFilter('subcategory', sc.name)
                            }
                            className="accent-[#4C7C3C]"
                          />
                          <span className="text-sm text-gray-700">
                            {sc.name}
                          </span>
                        </label>
                      ))}

                    {key === 'price' && (
                      <div className="space-y-3">
                        <input
                          type="range"
                          min="0"
                          max="500"
                          value={priceRange.min}
                          onChange={e =>
                            setPriceRange({
                              ...priceRange,
                              min: +e.target.value
                            })
                          }
                          className="w-full accent-[#4C7C3C]"
                        />
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={priceRange.max}
                          onChange={e =>
                            setPriceRange({
                              ...priceRange,
                              max: +e.target.value
                            })
                          }
                          className="w-full accent-[#4C7C3C]"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-[#4C7C3C] text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-[#4C7C3C] text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={resetFilters}
              className="text-gray-700 hover:text-[#4C7C3C]"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
              : 'space-y-4'
          }
        >
          {paginatedProducts.map(p => (
            <div
              key={p.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
            >
              <div className="relative bg-gray-50 h-56 flex items-center justify-center">
                <button
                  onClick={() => toggleFavorite(p.id)}
                  className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-100"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.has(p.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-400'
                    }`}
                  />
                </button>

                <img
                  src={p.image}
                  alt={p.product_name}
                  className="max-h-44 object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
                  {p.product_name}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{p.sale_price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{p.regular_price}
                  </span>
                </div>

                <button
                  className="mt-auto w-full py-2 rounded-lg border border-[#4C7C3C]
                             text-[#4C7C3C] font-medium
                             hover:bg-[#4C7C3C] hover:text-white
                             transition-colors"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg border transition
                ${
                  currentPage === i + 1
                    ? 'bg-[#4C7C3C] text-white border-[#4C7C3C]'
                    : 'text-[#4C7C3C] border-[#4C7C3C] hover:bg-[#4C7C3C] hover:text-white'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
