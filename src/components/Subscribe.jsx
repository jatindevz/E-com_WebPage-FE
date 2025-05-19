import Button from "@/components/section/Button";

const Subscribe = () => {
  return (
    <section
      id='contact-us'
      className='max-container flex justify-between items-center max-lg:flex-col gap-10'
    >
      <h3 className='text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold text-gray-900 dark:text-white transition-colors duration-300'>
        Sign Up for
        <span className='text-coral-red'> Updates </span>& Newsletter
      </h3>
      <div className='lg:max-w-[40%] w-full flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray dark:border-gray-600 rounded-full transition-colors duration-300 bg-white dark:bg-gray-800'>
        <input 
          type='text' 
          placeholder='subscribe@nike.com' 
          className='input bg-transparent dark:text-white dark:placeholder-gray-400 transition-colors duration-300 focus:outline-none'
        />
        <div className='flex max-sm:justify-end items-center max-sm:w-full'>
          <Button label='Sign Up' fullWidth />
        </div>
      </div>
    </section>
  );
};

export default Subscribe;