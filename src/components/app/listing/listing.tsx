import { useRouter } from 'next/router';

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
import { FilterSection, FilterSheet } from './filter';
import { useState } from 'react';

const ListingSection = () => {
  const router = useRouter();
  const id = router?.query?.id ?? '';
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  function toggleLanguageHandler(text: string) {
    dispatch(
      toggleFilters({
        sortKey: text,
        reverse: text === 'CREATED' ? true : false,
        first: 12,
        last: null,
        after: null,
        before: null,
        price: null,
      }),
    );
  }
  return (
    <div className="relative grid grid-cols-12  text-black px-4 py-4 lg:px-20 gap-4">
      <div className=" h-max sticky top-36  shadow-md border border-text-light-secondary  col-span-3 hidden lg:block  rounded-2xl">
        <FilterSection />
      </div>
      <div className=" relative w-full col-span-12 lg:col-span-9 text-black  ">
        <div className="relative flex flex-col gap-4">
          <div className=" flex  lg:flex-row justify-start   lg:justify-between flex-col-reverse">
            <p className="w-full text-text text-4xl capitalize font-semibold">
              {id?.toString()?.replaceAll('-', ' ')}
            </p>
            <div className="w-full flex flex-row  items-center xsm:justify-between gap-2 xsm:gap-4">
              <p
                onClick={() => setModal(!modal)}
                className="w-full cursor-pointer text-text font-bold flex text-base xsm:text-xl items-center gap-2 lg:hidden"
              >
                <i className="fa-solid fa-sliders  rotate-90 text-text-light-gray"></i>
                Filters
              </p>

              <div className="w-full    flex items-center gap-1 xsm:gap-2  justify-start xsm:justify-end text-sm xsm:text-base">
                <div className=" text-right w-max ">Sort by:</div>
                <div>
                  <Select onValueChange={toggleLanguageHandler}>
                    <SelectTrigger className=" flex font-bold justify-between h-8 gap-1 w-full xsm:w-36  text-text rounded-none border-none line-clamp-1 text-center shadow-none   ">
                      <SelectValue placeholder="Relevance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="RELEVANCE">Relevance</SelectItem>
                        <SelectItem value="TITLE">Title</SelectItem>
                        <SelectItem value="BEST_SELLING">
                          Best Selling
                        </SelectItem>
                        <SelectItem value="CREATED">New Arival</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <ProductListing />
        </div>
      </div>
      <FilterSheet modal={modal} setModal={setModal} />
    </div>
  );
};

export default ListingSection;
