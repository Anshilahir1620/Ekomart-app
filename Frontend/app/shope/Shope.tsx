'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Grid, List } from 'lucide-react';
import { useRouter } from 'next/navigation';

const products = [
  {
    id: 1,
    name: 'Organic Valley Cream Cheese Spread (77g)',
    price: 45,
    originalPrice: 65,
    discount: '40% OFF',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop',
    tag: null,
    category: 'Dairy',
    productType: 'Spread',
    dietary: ['Organic'],
    nutrition: { calories: 95, fat: '9g', carbs: '2g', protein: '2g', sugar: '1g', weight: '77g' }
  },
  {
    id: 2,
    name: 'Frozen French Baguette',
    price: 20,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=400&fit=crop',
    tag: null,
    category: 'Bakery',
    productType: 'Bread',
    dietary: [],
    nutrition: { calories: 270, fat: '3g', carbs: '52g', protein: '9g', sugar: '3g', weight: '100g' }
  },
  {
    id: 3,
    name: 'Fresh Organic Red Seedless Grapes (400g)',
    price: 60,
    image: 'https://images.unsplash.com/photo-1599819177423-7dac8d748a91?w=400&h=400&fit=crop',
    tag: 'NEW',
    category: 'Fruits',
    productType: 'Fresh',
    dietary: ['Organic', 'Vegan'],
    nutrition: { calories: 276, fat: '1g', carbs: '72g', protein: '3g', sugar: '62g', weight: '400g' }
  },
  {
    id: 4,
    name: 'Equal Exchange Fair Trade Organic Bananas (8Pcs)',
    price: 95,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop',
    tag: null,
    category: 'Fruits',
    productType: 'Fresh',
    dietary: ['Organic', 'Vegan'],
    nutrition: { calories: 712, fat: '3g', carbs: '182g', protein: '9g', sugar: '97g', weight: '800g' }
  },
  {
    id: 5,
    name: 'Organic Yellow Nectarines',
    price: 40,
    image: 'https://images.unsplash.com/photo-1629828874514-944d8ba916f4?w=400&h=400&fit=crop',
    tag: null,
    category: 'Fruits',
    productType: 'Fresh',
    dietary: ['Organic', 'Vegan'],
    nutrition: { calories: 63, fat: '0.5g', carbs: '15g', protein: '1.5g', sugar: '11g', weight: '150g' }
  },
  {
    id: 6,
    name: 'Organic Green Granny Smith Apples (500g)',
    price: 60,
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=400&fit=crop',
    tag: null,
    category: 'Fruits',
    productType: 'Fresh',
    dietary: ['Organic', 'Vegan'],
    nutrition: { calories: 260, fat: '1g', carbs: '69g', protein: '1g', sugar: '52g', weight: '500g' }
  },
  {
    id: 7,
    name: 'Sixty South Farm-Raised Atlantic Salmon Fillet (500g)',
    price: 185,
    originalPrice: 260,
    discount: '40% OFF',
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=400&h=400&fit=crop',
    tag: null,
    category: 'Fish',
    productType: 'Fresh',
    dietary: [],
    nutrition: { calories: 1030, fat: '68g', carbs: '0g', protein: '103g', sugar: '0g', weight: '500g' }
  },
  {
    id: 8,
    name: 'Organic Valley Sour Cream (400g)',
    price: 80,
    originalPrice: 110,
    discount: '40% OFF',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=400&fit=crop',
    tag: null,
    category: 'Dairy',
    productType: 'Cream',
    dietary: ['Organic'],
    nutrition: { calories: 776, fat: '76g', carbs: '18g', protein: '8g', sugar: '16g', weight: '400g' }
  },
  {
    id: 9,
    name: 'Gluten-Free Sourdough Boule, Frozen',
    price: 80,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
    tag: null,
    category: 'Bakery',
    productType: 'Bread',
    dietary: ['Gluten-free'],
    nutrition: { calories: 240, fat: '2g', carbs: '50g', protein: '4g', sugar: '2g', weight: '100g' }
  },
  {
    id: 10,
    name: 'Chobani Non-Fat Greek Yogurt, Black Cherry (170g)',
    price: 140,
    originalPrice: 170,
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1571212515416-35f71e507a76?w=400&h=400&fit=crop',
    tag: null,
    category: 'Dairy',
    productType: 'Yogurt',
    dietary: ['Low carb'],
    nutrition: { calories: 140, fat: '0g', carbs: '20g', protein: '14g', sugar: '15g', weight: '170g' }
  },
  {
    id: 11,
    name: 'Family Tree Farms Jumbo Ultra-Premium Blueberries (275g)',
    price: 200,
    originalPrice: 285,
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop',
    tag: null,
    category: 'Fruits',
    productType: 'Fresh',
    dietary: ['Vegan', 'Organic'],
    nutrition: { calories: 158, fat: '1g', carbs: '38g', protein: '2g', sugar: '27g', weight: '275g' }
  },
  {
    id: 12,
    name: 'The Gluten Free Bakery Ciabatta Loaf',
    price: 90,
    image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&h=400&fit=crop',
    tag: null,
    category: 'Bakery',
    productType: 'Bread',
    dietary: ['Gluten-free'],
    nutrition: { calories: 260, fat: '3g', carbs: '52g', protein: '5g', sugar: '3g', weight: '100g' }
  },
  {
    id: 13,
    name: 'Healthy MB Quick-Cooking Oats (500g)',
    price: 120,
    originalPrice: 160,
    discount: '40% OFF',
    image: 'https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=400&h=400&fit=crop',
    tag: null,
    category: 'Bakery',
    productType: 'Grains',
    dietary: ['Vegan'],
    nutrition: { calories: 1900, fat: '35g', carbs: '330g', protein: '65g', sugar: '5g', weight: '500g' }
  },
  {
    id: 14,
    name: 'Icelandic Salmon, Steak',
    price: 400,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop',
    tag: 'NEW',
    category: 'Fish',
    productType: 'Fresh',
    dietary: [],
    nutrition: { calories: 412, fat: '27g', carbs: '0g', protein: '41g', sugar: '0g', weight: '200g' }
  },
  {
    id: 15,
    name: "Eli's Bread Sliced Salish Pecan Bread",
    price: 180,
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=400&fit=crop',
    tag: 'NEW',
    category: 'Bakery',
    productType: 'Bread',
    dietary: [],
    nutrition: { calories: 280, fat: '12g', carbs: '38g', protein: '6g', sugar: '4g', weight: '100g' }
  },
  {
    id: 16,
    name: '100% Grass-Fed Local Beef Sirloin Tip Roast (500g)',
    price: 445,
    originalPrice: 510,
    discount: '40% OFF',
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400&h=400&fit=crop',
    tag: null,
    category: 'Meat',
    productType: 'Fresh',
    dietary: [],
    nutrition: { calories: 945, fat: '35g', carbs: '0g', protein: '155g', sugar: '0g', weight: '500g' }
  }
];


const categories = ['Vegetables', 'Fruits', 'Bakery', 'Dairy', 'Fish', 'Meat'];
const productTypes = ['Bread', 'Rolls', 'Pastries', 'Cakes', 'Muffins', 'Cookies', 'Fresh', 'Spread', 'Cream', 'Yogurt', 'Grains'];
const dietaryOptions = ['Gluten-free', 'Low carb', 'Vegan', 'Organic', 'Sugar-free', 'High fiber'];

export default function ShopPage() {
  const router = useRouter();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleFilter = (filterType, value) => {
    const setters = {
      category: setSelectedCategories,
      productType: setSelectedProductTypes,
      dietary: setSelectedDietary
    };
    setters[filterType](prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedProductTypes([]);
    setSelectedDietary([]);
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const productTypeMatch =
      selectedProductTypes.length === 0 || selectedProductTypes.includes(product.productType);
    const dietaryMatch =
      selectedDietary.length === 0 || selectedDietary.some(d => product.dietary.includes(d));

    return categoryMatch && productTypeMatch && dietaryMatch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-white">

      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => router.push('/')} className="text-gray-500 hover:text-gray-900">
              Home
            </button>
            <span className="text-gray-400">›</span>
            <button onClick={resetFilters} className="text-gray-900 font-medium hover:text-[#4C7C3C]">
              Shop
            </button>
            {selectedCategories.length > 0 && (
              <>
                <span className="text-gray-400">›</span>
                <span className="text-gray-900 font-medium">
                  {selectedCategories[0]}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {selectedCategories[0] || 'Shop'}
        </h1>

        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">

          <div className="flex items-center gap-3 flex-wrap relative">

            <div className="relative">
              <button
                onClick={() => toggleDropdown('category')}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <span className="text-gray-700">{selectedCategories[0] || 'Categories'}</span>
                {openDropdown === 'category'
                  ? <ChevronUp className="w-4 h-4 text-[#4C7C3C]" />
                  : <ChevronDown className="w-4 h-4 text-[#4C7C3C]" />}
              </button>

              {openDropdown === 'category' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-56 max-h-80 overflow-y-auto">
                  <div className="p-2">
                    {categories.map(cat => (
                      <label key={cat} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleFilter('category', cat)}
                          className="w-4 h-4 accent-[#4C7C3C]"
                        />
                        <span className="text-sm text-gray-700">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown('productType')}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <span className="text-gray-700">Product type</span>
                {openDropdown === 'productType'
                  ? <ChevronUp className="w-4 h-4 text-[#4C7C3C]" />
                  : <ChevronDown className="w-4 h-4 text-[#4C7C3C]" />}
              </button>

              {openDropdown === 'productType' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-56 max-h-80 overflow-y-auto">
                  <div className="p-2">
                    {productTypes.map(type => (
                      <label key={type} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedProductTypes.includes(type)}
                          onChange={() => toggleFilter('productType', type)}
                          className="w-4 h-4 accent-[#4C7C3C]"
                        />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown('dietary')}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <span className="text-gray-700">Dietary</span>
                {openDropdown === 'dietary'
                  ? <ChevronUp className="w-4 h-4 text-[#4C7C3C]" />
                  : <ChevronDown className="w-4 h-4 text-[#4C7C3C]" />}
              </button>

              {openDropdown === 'dietary' && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-56 max-h-80 overflow-y-auto">
                  <div className="p-2">
                    {dietaryOptions.map(opt => (
                      <label key={opt} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedDietary.includes(opt)}
                          onChange={() => toggleFilter('dietary', opt)}
                          className="w-4 h-4 accent-[#4C7C3C]"
                        />
                        <span className="text-sm text-gray-700">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid'
                  ? 'bg-[#4C7C3C] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list'
                  ? 'bg-[#4C7C3C] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              🔄 Reset
            </button>
          </div>
        </div>

        <div className={viewMode === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'
          : 'space-y-4 mb-12'}>
          {paginatedProducts.map(product => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-50 p-8 h-48 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
              </div>
              <div className="p-4">
                <h3 className="text-sm text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
                  {product.name}
                </h3>
                <span className="text-lg font-semibold text-gray-900">
                  ₹{product.price}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
