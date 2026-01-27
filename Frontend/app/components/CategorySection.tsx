"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Categorie } from "@/app/types/Categorie";
import { getCategories } from "@/app/services/Categories.api";
import { categoryUIMap } from "@/app/utils/categoryUI";

const CategoriesSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(console.error);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 300;
    scrollContainerRef.current.scrollTo({
      left:
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  const startAutoScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const step = () => {
      if (!scrollContainerRef.current) return;

      scrollContainerRef.current.scrollLeft += 0.6;

      if (
        scrollContainerRef.current.scrollLeft +
        scrollContainerRef.current.clientWidth >=
        scrollContainerRef.current.scrollWidth - 1
      ) {
        scrollContainerRef.current.scrollLeft = 0;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Shop by categories
          </h2>
          <a
            href="/categories"
            className="text-[#4C7C3C] font-semibold hover:underline"
          >
            All categories
          </a>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
          >
            <ChevronLeft className="w-6 h-6 text-[#4C7C3C]" />
          </button>

          {/* Categories */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-6 pb-4 min-w-max">
              {categories.map((category) => {
                const slug = category.slug?.toLowerCase().trim() ?? "";
                const ui = categoryUIMap[slug] ?? categoryUIMap.default;
                const Icon = ui.icon;

                return (
                  <div
                    key={category.id}
                    className="group flex-shrink-0 cursor-pointer"
                    style={{ width: "180px" }}
                  >
                    <div
                      className={`${ui.bgColor} rounded-2xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                    >
                      <Icon
                        size={56}
                        className="mb-4 text-[#4C7C3C] transition-transform duration-300 group-hover:scale-110"
                      />
                      <h3 className="text-lg font-semibold text-[#4C7C3C] text-center">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
          >
            <ChevronRight className="w-6 h-6 text-[#4C7C3C]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
