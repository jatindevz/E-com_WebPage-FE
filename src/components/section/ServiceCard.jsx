const ServiceCard = ({ imgURL, label, subtext }) => {
    return (
      <div className='flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl px-10 py-16 bg-white dark:bg-gray-800 transition-colors duration-300 hover:shadow-lg'>
        <div className='w-11 h-11 flex justify-center items-center bg-coral-red rounded-full'>
          <img 
            src={imgURL} 
            alt={label} 
            width={24} 
            height={24}
            className="dark:invert" 
          />
        </div>
        <h3 className='mt-5 font-palanquin text-3xl leading-normal font-bold text-gray-900 dark:text-white transition-colors duration-300'>
          {label}
        </h3>
        <p className='mt-3 break-words font-montserrat text-lg leading-normal text-slate-gray dark:text-gray-400 transition-colors duration-300'>
          {subtext}
        </p>
      </div>
    );
  };
  
  export default ServiceCard;