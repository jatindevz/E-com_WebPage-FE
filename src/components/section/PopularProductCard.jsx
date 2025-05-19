const PopularProductCard = ({ imgURL, name, price, rating }) => {
  return (
    <div className="flex flex-1 flex-col w-full max-sm:w-full group">
      <div className="relative w-full h-[280px] flex justify-center items-center rounded-xl bg-gradient-to-b from-transparent to-gray-100/50 dark:to-gray-800/50 p-6 transition-transform duration-300 group-hover:scale-105">
        <img 
          src={imgURL}
          alt={name}
          className="object-contain h-[220px] w-[220px] z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold font-palanquin text-gray-900 dark:text-white leading-normal transition-colors duration-300">
            {name}
          </h3>
          <div className="mt-2 flex gap-2.5">
            <img 
              src="/assets/icons/star.svg"
              alt="rating"
              width={24}
              height={24}
              className="dark:invert"
            />
            <p className="font-montserrat text-slate-gray dark:text-gray-400 text-sm leading-normal transition-colors duration-300">
              ({rating})
            </p>
          </div>
        </div>
        <p className="text-xl font-semibold font-montserrat text-coral-red dark:text-coral-red/90 leading-normal transition-colors duration-300">
          {price}
        </p>
      </div>
    </div>
  );
};

export default PopularProductCard;