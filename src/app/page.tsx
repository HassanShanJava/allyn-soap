import BannerSection from '@/components/Banner';
import BestSellingProducts from '@/components/bestSellingProducts';
import WhyChooseUs from '@/components/whychooseus/index';
import { getCollectionProducts } from 'lib/shopify';
import Hero from '../../@/components/Hero/hero';
import CategorySection from '../../@/components/categorySection';
import CustomerReview from '../../@/components/customerReview';

export default async function HomePage() {
   const products = await getCollectionProducts({ collection: 'dryer-balls-and-spray' });
console.log({products})
  // if (!products?.length) return null;
  return (
    <>
      <Hero />        
        <BestSellingProducts products={products}/>
        <CategorySection />
        <BannerSection/>        
        <CustomerReview />
        <WhyChooseUs/>
        {/* <AboutUs/> */}
    </>
  );
}
