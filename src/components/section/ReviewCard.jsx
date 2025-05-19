const ReviewCard = ({ imgURL, customerName, rating, feedback }) => {
    return (
      <div className='flex justify-center items-center flex-col p-8 rounded-2xl transition-colors duration-300 bg-white dark:bg-gray-800 hover:shadow-xl'>
        <img
          src={imgURL}
          alt='customer'
          className='rounded-full object-cover w-[120px] h-[120px] border-4 border-white dark:border-gray-700 shadow-md'
        />
        <p className='mt-6 max-w-sm text-center text-slate-gray dark:text-gray-300 transition-colors duration-300'>
          {feedback}
        </p>
        <div className='mt-3 flex justify-center items-center gap-2.5'>
          <img
            src={'/assets/icons/star.svg'}
            width={24}
            height={24}
            alt='rating star'
            className='object-contain m-0 dark:invert'
          />
          <p className='text-xl font-montserrat text-slate-gray dark:text-gray-400 transition-colors duration-300'>
            ({rating})
          </p>
        </div>
        <h3 className='mt-1 font-palanquin text-3xl text-center font-bold text-gray-900 dark:text-white transition-colors duration-300'>
          {customerName}
        </h3>
      </div>
    );
  };
  
  export default ReviewCard;