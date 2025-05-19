import {Hero, Nav, PopularProducts, SuperQuality, Services, SpecialOffers, CustomerReviews, Footer, Subscribe} from "@/components/index";

export default function Home() {
  return (
    <div className="relative bg-white dark:bg-gray-900 transition-colors duration-300">
      <Nav />
      <section className="xl:padding-1 widest:padding-r max-w-7xl mx-auto padding-b">
        <Hero />
      </section>
      <section className="padding">
        <PopularProducts /> 
      </section>
      <section className="padding">
        <SuperQuality /> 
      </section>
      <section className="padding">
        <Services /> 
      </section>
      <section className="padding">
        <SpecialOffers /> 
      </section>
      <section className="bg-pale-blue dark:bg-gray-800 padding transition-colors duration-300">
        <CustomerReviews /> 
      </section>
      <section className="padding-x sm:py-32 py-16 w-full">
        <Subscribe />
      </section>
      <section className="bg-black padding-x padding-t pb-8">
        <Footer />  
      </section>
    </div>
  );
}