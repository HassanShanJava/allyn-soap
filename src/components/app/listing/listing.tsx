import { useRouter } from 'next/router';
import FilterSection from './filter';
import { useQuery } from '@apollo/client';
import { removeEdgesAndNodes } from '~/utils/helper';
import ProductListing from './product_listing';

const ListingSection = () => {
  const router = useRouter();
  const id = router?.query?.id ?? '';

  return (
    <section id="Home-Page">
      <div className="grid grid-cols-12  text-black px-20">
        <div className=" col-span-3 hidden md:block ">
          <FilterSection />
        </div>
        <div className=" col-span-12 md:col-span-9 text-black flex flex-col gap-4">
          <div className=" flex  justify-between">
            <p className=" text-text text-4xl capitalize font-semibold">{id}</p>
            <p>Casual</p>
          </div>
          <ProductListing />
        </div>
      </div>
    </section>
  );
};

export default ListingSection;
