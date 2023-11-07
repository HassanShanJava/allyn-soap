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
import { useEffect, useState } from 'react';
import { RootState } from '~/store/store';
import { defaultSort } from '~/utils/constant';
import { poppins } from '~/components/layouts/app';
import ProductSearch from './product_search';

const ListingSection = () => {
  const router = useRouter();
  const id = router?.query?.id ?? '';
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const [modal, setModal] = useState(false);
  const { filters } = useSelector((state: RootState) => state.filters);
  const searchQuery = localStorage.getItem('search') as string;

  function toggleFilter(text: string) {
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
            <div className="w-full flex  flex-row  items-end justify-end xsm:justify-end gap-2 xsm:gap-4">
              <p
                onClick={() => setModal(!modal)}
                className="w-full cursor-pointer text-text font-bold flex text-base xsm:text-xl items-center gap-2 lg:hidden"
              >
                <i className="fa-solid fa-sliders  rotate-90 text-text-light-gray"></i>
                Filters
              </p>

              {id !== 'search' && (
                <div className="flex flex-col xsm:flex-row gap-x-2 justify-end xsm:justify-end  items-center">
                  {(filters.sortKey !== defaultSort.sortKey ||
                    filters.price) && (
                    <>
                      <div
                        onClick={() => {
                          clearFilter();
                        }}
                        className="w-max cursor-pointer px-2 flex ml-auto text-base underline text-text-blue justify-start  xsm:justify-end"
                      >
                        Clear Filter
                      </div>
                    </>
                  )}
                  <div className="   w-max   flex items-center gap-x-1 xsm:gap-x-2  justify-start xsm:justify-end text-sm xsm:text-base">
                    <div className=" text-right w-max ">Sort by:</div>
                    <div>
                      <Select
                        onValueChange={toggleFilter}
                        defaultValue={filters.sortKey}
                        value={filters.sortKey}
                      >
                        <SelectTrigger
                          className={`${poppins.variable} ${poppins.className}  flex font-bold justify-between h-8 gap-1 w-full xsm:w-36  text-text rounded-none border-none line-clamp-1 text-center shadow-none text-base   `}
                        >
                          <SelectValue placeholder="Relevance" />
                        </SelectTrigger>
                        <SelectContent
                          className={`${poppins.variable} ${poppins.className} text-base`}
                        >
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
              )}
            </div>
          </div>
          {id !== 'search' ? (
            <ProductListing />
          ) : (
            <ProductSearch search={searchQuery} />
          )}
        </div>
      </div>
      <FilterSheet modal={modal} setModal={setModal} />
    </div>
  );
};

export default ListingSection;
