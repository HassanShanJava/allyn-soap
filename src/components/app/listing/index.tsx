import BannerCard from '~/components/common/banner-card';
import ListingSection from './listing';
import ProductSlider from './product-slider';
import { useRouter } from 'next/router';

const ListingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
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
