import BannerCard from '~/components/common/banner-card';
import ListingSection from './listing';
import ProductSlider from './product-slider';
import { useRouter } from 'next/router';
import SeoHead from '~/components/common/seo-head';

const ListingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const seoHead=(id as string)?.split('-').join(' ')
  const finalhead= seoHead?.charAt(0).toUpperCase() + seoHead?.slice(1)
  return (
    <>
      <SeoHead
        title={finalhead}
        description="Allyn's Soap Co. is dedicated to producing quality handmade soaps and lotions and other bath products with ingredients you can pronounce and understand."
        image_url={
          'https://cdn.shopify.com/s/files/1/0372/6124/6603/files/fb_logo_with_kraft_paper.png?v=1613915363'
        }
      />
      <div className="relative  font-poppins">
        {/* for bg color */}
        <div
          className={`absolute -z-10 bg-secondary min-w-[200px] w-full  max-w-[70%] md:max-w-[80%]  ${
            id !== 'search' ? 'h-20 md:h-28' : 'h-6 md:h-12'
          } rounded-br-[100px] transform-all ease-in-out duration-300`}
        ></div>
        <BannerCard banner={undefined} key={1} type="product-listing" />

        <ListingSection />
        <div className="py-4" />
        <ProductSlider />
      </div>
    </>
  );
};

export default ListingPage;
