import Image from 'next/image';

import CategorySection from './category_section';
import Demo from '~/public/assets/demo.png';
import Outline from '~/public/assets/outline.png';
import BannerSection from './banner_section';
import RelatedProducts from './related_product';

const Home = () => {
  return (
    <>
      <div className="relative mt-32 font-poppins">
        {/* for bg color */}
        <div className="absolute bg-secondary min-w-[200px] w-full  max-w-[60%] md:max-w-[80%] h-48 rounded-br-[100px] "></div>

        <BannerSection />

        <CategorySection />
        <RelatedProducts />
      </div>
    </>
  );
};

export default Home;
