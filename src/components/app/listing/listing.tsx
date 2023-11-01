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
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilters } from '~/store/reducers/filters';
import { FilterSection, FilterSheet } from './filter';
import { useState } from 'react';
import { RootState } from '~/store/store';
import { defaultSort } from '~/utils/constant';

const ListingSection = () => {
  const router = useRouter();
  const id = router?.query?.id ?? '';
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { filters } = useSelector((state: RootState) => state.filters);

  function toggleLanguageHandler(text: string) {
    dispatch(
      toggleFilters({
        ...filters,

        sortKey: text,
        reverse: text === 'CREATED' ? true : false,
        first: 12,
        last: null,
        after: null,
        before: null,
      }),
    );
  }
  const clearFilter = () => {
    dispatch(
      toggleFilters({
        ...filters,
        sortKey: defaultSort.sortKey,
        reverse: false,
        first: 12,
        last: null,
        after: null,
        before: null,
        price: null,
      }),
    );
  };
  console.log({ filters }, 'clear filter issue');
  return (
    <div className="relative grid grid-cols-12  text-black px-4 py-4 sm:p-6 lg:px-12 gap-4">
      <div className=" h-max sticky top-36  shadow-md border border-text-light-secondary  col-span-3 hidden lg:block  rounded-2xl">
        <FilterSection />
      </div>
      <div className=" relative w-full col-span-12 lg:col-span-9 text-black  ">
        <div className="relative flex flex-col gap-8">
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
              <div className="flex flex-col xsm:flex-row gap-2 justify-start xsm:justify-end w-full items-center">
                {(filters.sortKey !== defaultSort.sortKey || filters.price) && (
                  <>
                    <div
                      onClick={() => {
                        clearFilter();
                      }}
                      className="w-full cursor-pointer flex text-xl underline text-text-blue justify-start bg-red-600s xsm:justify-end"
                    >
                      Clear Filter
                    </div>
                  </>
                )}
                <div className="   w-max   flex items-center gap-1 xsm:gap-2  justify-start xsm:justify-end text-sm xsm:text-base">
                  <div className=" text-right w-max ">Sort by:</div>
                  <div>
                    <Select
                      onValueChange={toggleLanguageHandler}
                      defaultValue={filters.sortKey}
                      value={filters.sortKey}
                    >
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
          </div>
          <ProductListing />
        </div>
      </div>
      <FilterSheet modal={modal} setModal={setModal} />
    </div>
  );
};

export default ListingSection;
