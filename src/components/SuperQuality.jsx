import Button from "@/components/section/Button";

const SuperQuality = () => {
  return (
    <section
      id='about-us'
      className='flex justify-between items-center max-lg:flex-col gap-10 w-full max-container transition-colors duration-300'
    >
      <div className='flex flex-1 flex-col'>
        <h2 className='font-palanquin capitalize text-4xl lg:max-w-lg font-bold text-gray-900 dark:text-white transition-colors duration-300'>
          We Provide You
          <span className='text-coral-red hover:text-coral-red/90 transition-colors duration-300'> Super </span>
          <span className='text-coral-red hover:text-coral-red/90 transition-colors duration-300'>Quality </span> Shoes
        </h2>
        <p className='mt-4 lg:max-w-lg text-slate-gray dark:text-gray-400 transition-colors duration-300'>
          Ensuring premium comfort and style, our meticulously crafted footwear
          is designed to elevate your experience, providing you with unmatched
          quality, innovation, and a touch of elegance.
        </p>
        <p className='mt-6 lg:max-w-lg text-slate-gray dark:text-gray-400 transition-colors duration-300'>
          Our dedication to detail and excellence ensures your satisfaction
        </p>
        <div className='mt-11'>
          <Button label='View details' />
        </div>
      </div>

      <div className='flex-1 flex justify-center items-center'>
        <img
          src='/assets/images/shoe8.svg'
          alt='product detail'
          width={570}
          height={522}
          className='object-contain dark:filter dark:brightness-90 transition-all duration-300 hover:scale-105'
        />
      </div>
    </section>
  );
};

export default SuperQuality;