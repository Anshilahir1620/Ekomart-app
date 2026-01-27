'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    weight: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    image: string;
    liked: boolean;
    badge?: string;
    badgeType?: 'discount' | 'new';
}

const BestSellingSection: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = [
        'All',
        'Vegetables',
        'Fruits',
        'Bakery',
        'Diary',
        'Fish',
        'Meat',
        'Poultry',
        'Meals',
        'Beverages',
        'Snacks'
    ];

    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: 'Family Tree Farms Jumbo Ultra-Premium Blueberries',
            weight: '125g',
            price: 200,
            originalPrice: 400,
            discount: 50,
            image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300&h=300&fit=crop',
            liked: false,
            badge: '-50% OFF',
            badgeType: 'discount'
        },
        {
            id: 2,
            name: 'Organic Green Granny Smith Apples',
            weight: '500g',
            price: 50,
            image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop',
            liked: false
        },
        {
            id: 3,
            name: 'Fresh Organic Red Seedless Grapes',
            weight: '500g',
            price: 50,
            image: 'https://images.unsplash.com/photo-1599819177338-d1dfd203bdc1?w=300&h=300&fit=crop',
            liked: false,
            badge: 'NEW',
            badgeType: 'new'
        },
        {
            id: 4,
            name: 'Equal Exchange Fair Trade Organic Bananas',
            weight: '5Pcs',
            price: 70,
            image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop',
            liked: false,
            badge: 'NEW',
            badgeType: 'new'
        },
        {
            id: 5,
            name: 'Fresh Organic Strawberries',
            weight: '250g',
            price: 120,
            image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=300&fit=crop',
            liked: false
        },
        {
            id: 6,
            name: 'Premium Oranges',
            weight: '1kg',
            price: 95,
            image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=300&h=300&fit=crop',
            liked: false
        }
    ]);

    const toggleLike = (id: number) => {
        setProducts(products.map(p =>
            p.id === id ? { ...p, liked: !p.liked } : p
        ));
    };

    const scroll = (direction: 'left' | 'right') => {
        const el = scrollContainerRef.current;
        if (!el) return;
        
        const cardWidth = 280;
        const gap = 20;
        const scrollAmount = cardWidth + gap;
        const maxScroll = el.scrollWidth - el.clientWidth;
        
        if (direction === 'right') {
            if (el.scrollLeft >= maxScroll - 10) {
                // Reset to beginning smoothly
                el.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        } else {
            if (el.scrollLeft <= 10) {
                // Jump to end smoothly
                el.scrollTo({ left: maxScroll, behavior: 'smooth' });
            } else {
                el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const startAutoScroll = () => {
        stopAutoScroll();
        autoScrollRef.current = setInterval(() => {
            scroll('right');
        }, 2000);
    };

    const stopAutoScroll = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current);
            autoScrollRef.current = null;
        }
    };

    useEffect(() => {
        startAutoScroll();

        const el = scrollContainerRef.current;
        
        const handleMouseEnter = () => stopAutoScroll();
        const handleMouseLeave = () => startAutoScroll();

        if (el) {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            stopAutoScroll();
            if (el) {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <section className="py-12 bg-gray-50">
            <div className="px-4">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Best selling products</h2>
                    <a href="/products" className="text-[#4C7C3C] font-semibold hover:underline text-sm">
                        View all
                    </a>
                </div>

                {/* Filter Tabs */}
                <div className="mb-6 overflow-x-auto scrollbar-hide">
                    <div className="flex gap-3 min-w-max">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                                    activeFilter === filter
                                        ? 'bg-[#4C7C3C] text-white shadow-md'
                                        : 'bg-white text-gray-700 border border-gray-200 hover:border-[#4C7C3C]'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Carousel */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow hidden md:block"
                        aria-label="Previous products"
                    >
                        <ChevronLeft className="w-5 h-5 text-[#4C7C3C]" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow hidden md:block"
                        aria-label="Next products"
                    >
                        <ChevronRight className="w-5 h-5 text-[#4C7C3C]" />
                    </button>

                    {/* Products Grid */}
                    <div 
                        ref={scrollContainerRef}
                        className="overflow-x-auto no-scrollbar"
                        style={{ 
                            scrollbarWidth: 'none', 
                            msOverflowStyle: 'none',
                            scrollBehavior: 'smooth'
                        }}
                    >
                        <div className="flex gap-5">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow w-[280px] border border-gray-100 flex-shrink-0"
                                >
                                    {/* Product Image Container */}
                                    <div className="relative bg-white h-[220px] flex items-center justify-center p-4">
                                        {/* Badge */}
                                        {product.badge && (
                                            <div className="absolute top-0 left-0">
                                                <span className={`inline-block text-white text-[11px] font-semibold px-2.5 py-1 rounded-br-2xl rounded-tl-xl shadow-sm ${
                                                    product.badgeType === 'discount' 
                                                        ? 'bg-red-500' 
                                                        : 'bg-[#4C7C3C]'
                                                }`}>
                                                    {product.badge}
                                                </span>
                                            </div>
                                        )}

                                        {/* Like Button */}
                                        <button
                                            onClick={() => toggleLike(product.id)}
                                            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white rounded border border-gray-300 hover:border-gray-400 transition-colors"
                                            aria-label="Add to favorites"
                                        >
                                            <Heart
                                                className={`w-[18px] h-[18px] ${product.liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                                                strokeWidth={1.5}
                                            />
                                        </button>

                                        {/* Product Image */}
                                        <div className="w-full h-full flex items-center justify-center">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="max-w-[150px] max-h-[150px] w-auto h-auto object-contain"
                                            />
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="px-4 pb-4 pt-2">
                                        {/* Product Name */}
                                        <h3 className="text-sm text-gray-700 mb-3 h-[40px] overflow-hidden leading-[20px] font-normal">
                                            {product.name} ({product.weight})
                                        </h3>

                                        {/* Price Section */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-base font-bold text-gray-900">
                                                EGP{product.price}
                                            </span>
                                            {product.originalPrice && (
                                                <span className="text-xs text-gray-400 line-through">
                                                    EGP{product.originalPrice}
                                                </span>
                                            )}
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button className="w-full py-2.5 border border-gray-300 text-gray-700 text-[13px] font-medium rounded-full bg-white hover:border-[#4C7C3C] hover:text-[#4C7C3C] transition-all duration-200">
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <style jsx>{`
                        .no-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                        .no-scrollbar {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }
                        .scrollbar-hide::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                </div>
            </div>
        </section>
    );
};

export default BestSellingSection;