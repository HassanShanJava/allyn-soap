import { useRouter } from 'next/router';
import FilterSection from './filter';

import ProductListing from './product_listing';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useDispatch } from 'react-redux';
import { toggleFilters } from '~/store/reducers/filters';

const ListingSection = () => {
  const router = useRouter();
  const id = router?.query?.id ?? '';
  const dispatch = useDispatch();
  function toggleLanguageHandler(text: string) {
    dispatch(
      toggleFilters({
        sortKey: text,
        reverse: text === 'CREATED' ? true : false,
      }),
    );
  }
  return (
    <section id="Home-Page">
      <div className="relative grid grid-cols-12  text-black px-20 gap-4">
        <div className=" h-max sticky top-36  shadow-md border border-text-light-secondary  col-span-3 hidden md:block p-2 rounded-2xl">
          <FilterSection />
        </div>
        <div className=" relative col-span-12 md:col-span-9 text-black flex flex-col gap-4">
          <div className=" flex  justify-between">
            <p className="w-full text-text text-4xl capitalize font-semibold">
              {id}
            </p>
            <div className="w-full  flex items-center gap-2 justify-end text-base">
              <p>Sort by:</p>
              <Select onValueChange={toggleLanguageHandler}>
                <SelectTrigger className=" flex font-bold justify-between h-8 w-36 text-text rounded-none border-none line-clamp-1 text-center shadow-none   ">
                  <SelectValue placeholder="Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="RELEVANCE">Relevance</SelectItem>
                    <SelectItem value="TITLE">Title</SelectItem>
                    <SelectItem value="BEST_SELLING">Best Selling</SelectItem>
                    <SelectItem value="CREATED">New Arival</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <ProductListing />
        </div>
      </div>
    </section>
  );
};

export default ListingSection;
