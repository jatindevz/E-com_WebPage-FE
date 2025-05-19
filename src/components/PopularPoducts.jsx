'use client';
import { products } from "../constants";
import PopularProductCard from '@/components/section/PopularProductCard';

const PopularProducts = () => {
  return (
    <section id='products' className='max-container max-sm:mt-12 py-16 transition-colors duration-300'>
      <div className='flex flex-col justify-start gap-5'>
        <h2 className='text-4xl font-palanquin font-bold text-gray-900 dark:text-white transition-colors duration-300'>
          Ourss <span className='text-coral-red hover:text-coral-red/90 transition-colors duration-300'> Popular </span> Products
        </h2>
        <p className='lg:max-w-lg mt-2 font-montserrat text-slate-gray dark:text-gray-400 transition-colors duration-300'>
          Experience top-notch quality and style with our sought-after
          selections. Discover a world of comfort, design, and value
        </p>
      </div>

      <div className='mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-14'>
        {products.map((product) => (
          <PopularProductCard key={product.name} {...product} />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;