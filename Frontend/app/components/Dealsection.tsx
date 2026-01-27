import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Deal {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
}

const DealsSection: React.FC = () => {
  const deals: Deal[] = [
    {
      id: 1,
      badge: 'For Today - 15% OFF',
      title: 'Green Basket provided',
      subtitle: 'Daily-Prepared Healthy Meals,',
      description: 'Ready to heat & eat.',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
      buttonText: 'Shop Now'
    },
    {
      id: 2,
      badge: 'Get 20% OFF',
      title: 'Brown & Multigrain Breads,',
      subtitle: '',
      description: 'Perfect for your diet.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
      buttonText: 'Shop Now'
    },
    {
      id: 3,
      badge: 'Get 40% OFF',
      title: 'Fuel your day,',
      subtitle: 'Low-Cal Energy Drinks.',
      description: '',
      image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=600&h=400&fit=crop',
      buttonText: 'Shop Now'
    },
    {
      id: 4,
      badge: 'Up to 25% OFF',
      title: 'Fresh Farm-Sourced Meats,',
      subtitle: '',
      description: 'Get your protein boost.',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&h=400&fit=crop',
      buttonText: 'Shop Now'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="px-4">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Today best deals for you!</h2>
        </div>

        {/* Deals Grid - Normal 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Card 1 - Top Left */}
          <div className="relative rounded-3xl overflow-hidden h-[280px] group cursor-pointer">
            <div className="absolute inset-0">
              <img
                src={deals[0].image}
                alt={deals[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative h-full flex flex-col justify-between p-7 text-white">
              <div className="absolute top-0 left-0">
                <span className="inline-block bg-red-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-br-2xl rounded-tl-3xl shadow-sm">
                  {deals[0].badge}
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-center mb-3">
                <p className="text-base mb-1 font-normal">{deals[0].title}</p>
                <h3 className="text-2xl font-bold mb-2 leading-tight">
                  {deals[0].subtitle}
                </h3>
                <p className="text-base text-white/95">
                  {deals[0].description}
                </p>
              </div>

              <button className="self-start flex items-center gap-2 bg-white text-[#4C7C3C] px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all group-hover:gap-3 duration-300 shadow-sm">
                {deals[0].buttonText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2 - Top Right */}
          <div className="relative rounded-3xl overflow-hidden h-[280px] group cursor-pointer">
            <div className="absolute inset-0">
              <img
                src={deals[1].image}
                alt={deals[1].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative h-full flex flex-col justify-between p-7 text-white">
              <div className="absolute top-0 left-0">
                <span className="inline-block bg-red-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-br-2xl rounded-tl-3xl shadow-sm">
                  {deals[1].badge}
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-center mb-3">
                <h3 className="text-2xl font-bold mb-2 leading-tight">
                  {deals[1].title}
                </h3>
                <p className="text-base text-white/95">
                  {deals[1].description}
                </p>
              </div>

              <button className="self-start flex items-center gap-2 bg-white text-[#4C7C3C] px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all group-hover:gap-3 duration-300 shadow-sm">
                {deals[1].buttonText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3 - Bottom Left */}
          <div className="relative rounded-3xl overflow-hidden h-[280px] group cursor-pointer">
            <div className="absolute inset-0">
              <img
                src={deals[2].image}
                alt={deals[2].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative h-full flex flex-col justify-between p-7 text-white">
              <div className="absolute top-0 left-0">
                <span className="inline-block bg-red-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-br-2xl rounded-tl-3xl shadow-sm">
                  {deals[2].badge}
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-center mb-3">
                <p className="text-base mb-1 font-normal">{deals[2].title}</p>
                <h3 className="text-2xl font-bold leading-tight">
                  {deals[2].subtitle}
                </h3>
              </div>

              <button className="self-start flex items-center gap-2 bg-white text-[#4C7C3C] px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all group-hover:gap-3 duration-300 shadow-sm">
                {deals[2].buttonText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 4 - Bottom Right */}
          <div className="relative rounded-3xl overflow-hidden h-[280px] group cursor-pointer">
            <div className="absolute inset-0">
              <img
                src={deals[3].image}
                alt={deals[3].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative h-full flex flex-col justify-between p-7 text-white">
              <div className="absolute top-0 left-0">
                <span className="inline-block bg-red-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-br-2xl rounded-tl-3xl shadow-sm">
                  {deals[3].badge}
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-center mb-3">
                <h3 className="text-2xl font-bold mb-2 leading-tight">
                  {deals[3].title}
                </h3>
                <p className="text-base text-white/95">
                  {deals[3].description}
                </p>
              </div>

              <button className="self-start flex items-center gap-2 bg-white text-[#4C7C3C] px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all group-hover:gap-3 duration-300 shadow-sm">
                {deals[3].buttonText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DealsSection;