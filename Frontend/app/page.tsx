import React from 'react';
import Head from 'next/head';
import Banner from './components/Banner';
import ProductSection from '@/app/components/ProductSection'; 
import CategoriesSection from '@/app/components/CategorySection';
import DealsSection from '@/app/components/Dealsection';
import BestSellingSection from '@/app/components/BestSellingSection';

import Footer from './components/Footer';


const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>FreshMart - Fresh Groceries Delivered</title>
        <meta name="description" content="Get the freshest groceries delivered to your home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* <Header /> */}

        <main>
          <Banner />
          <CategoriesSection />

          {/* Limited Products Section */}
          <section className="py-12 bg-gray-50">
            <div className="px-4">
              <div className="flex items-center justify-between ">
                <h2 className="text-3xl font-bold text-gray-900">Limited products</h2>
                <a href="/products" className="text-[#4C7C3C] font-semibold hover:underline">
                  View all
                </a>
              </div>
              <ProductSection />
              <DealsSection/>
              <BestSellingSection/>
            </div>
          </section>
        </main>
        <Footer/>
      </div>
    </>
  );
};

export default Home;