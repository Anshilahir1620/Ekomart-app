'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    weight: string;
    price: number;
    originalPrice: number;
    discount: number;
    image: string;
    liked: boolean;
}

const ProductSection: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
    
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: 'Organic Valley Cream Cheese Spread',
            weight: '277g',
            price: 45,
            originalPrice: 90,
            discount: 50,
            image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=300&fit=crop',
            liked: false
        },
        {
            id: 2,
            name: 'Sixty South Farm-Raised Atlantic Salmon Fillet',
            weight: '600g',
            price: 185,
            originalPrice: 370,
            discount: 50,
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&h=300&fit=crop',
            liked: false
        },
        {
            id: 3,
            name: 'Family Tree Farms Jumbo Ultra-Premium Blueberries',
            weight: '125g',
            price: 200,
            originalPrice: 400,
            discount: 50,
            image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=300&h=300&fit=crop',
            liked: false
        },
        {
            id: 4,
            name: '100% Grass-Fed Local Beef Sirloin Tip Steak',
            weight: '500g',
            price: 185,
            originalPrice: 370,
            discount: 50,
            image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=300&h=300&fit=crop',
            liked: false
        },
        {
            id: 5,
            name: 'Fresh Organic Avocados',
            weight: '250g',
            price: 120,
            originalPrice: 240,
            discount: 50,
            image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=300&fit=crop',
            liked: false
        },
        {
            id: 6,
            name: 'Premium Greek Yogurt',
            weight: '500g',
            price: 85,
            originalPrice: 170,
            discount: 50,
            image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop',
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
        <div className="relative mt-6">
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

            {/* Products Grid with Scroll */}
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
                            className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow w-[280px] border border-gray-100 flex-shrink-0"
                        >
                            {/* Product Image Container */}
                            <div className="relative bg-white h-[220px] flex items-center justify-center p-4">
                                {/* Discount Badge */}
                                <div className="absolute top-0 left-0 bg-red-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-br-2xl rounded-tl-2xl shadow-sm">
                                    - {product.discount}% OFF
                                </div>

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
                                    <span className="text-xs text-gray-400 line-through">
                                        EGP{product.originalPrice}
                                    </span>
                                </div>

                                {/* Add to Cart Button */}
                                <button className="w-full py-2.5 border border-gray-300 text-gray-700 text-[13px] font-medium rounded-full bg-white hover:border-green-600 hover:bg-green-50 transition-all duration-200">
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
            `}</style>
        </div>
    );
};

export default ProductSection;