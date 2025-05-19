import Button from "@/components/section/Button";

const SpecialOffer = () => {
  return (
    <section className='flex justify-between items-center max-xl:flex-col-reverse gap-10 max-container transition-colors duration-300'>
      <div className='flex-1'>
        <img
          src={'/assets/images/offer.svg'}
          alt='Shoe Promotion'
          width={773}
          height={687}
          className='object-contain w-full dark:filter dark:brightness-90 transition-all duration-300'
        />
      </div>
      <div className='flex flex-1 flex-col'>
        <h2 className='text-4xl font-palanquin font-bold text-gray-900 dark:text-white transition-colors duration-300'>
          <span className='text-coral-red'>Special </span>
          Offer
        </h2>
        <p className='mt-4 text-slate-gray dark:text-gray-400 transition-colors duration-300'>
          Embark on a shopping journey that redefines your experience with
          unbeatable deals. From premier selections to incredible savings, we
          offer unparalleled value that sets us apart.
        </p>
        <p className='mt-6 text-slate-gray dark:text-gray-400 transition-colors duration-300'>
          Navigate a realm of possibilities designed to fulfill your unique
          desires, surpassing the loftiest expectations. Your journey with us is
          nothing short of exceptional.
        </p>
        <div className='mt-11 flex flex-wrap gap-4'>
          <Button label='Shop now' iconURL={'/assets/icons/arrow-right.svg'} />
          <Button
            label='Learn more'
            backgroundColor='bg-white dark:bg-gray-800'
            borderColor='border-slate-gray dark:border-gray-600'
            textColor='text-slate-gray dark:text-gray-400'
          />
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;