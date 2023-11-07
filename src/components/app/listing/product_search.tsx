import { useLazyQuery, useQuery } from '@apollo/client';
import { get } from 'jquery';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '~/components/common/cards/product-cards';
import ProductSkeleton from '~/components/common/skeleton/product-skeleton';
import { Button } from '~/components/ui/button';
import { getCollectionProductsQuery } from '~/server/lib/shopify/query/collection';
import { getSearchProductsQuery } from '~/server/lib/shopify/query/search';
import { toggleFilters } from '~/store/reducers/filters';
import { RootState } from '~/store/store';
import { defaultSort } from '~/utils/constant';
import { removeEdgesAndNodes } from '~/utils/helper';

const ProductSearch = (props:{search:string}) => {
  const router = useRouter();
  const id = router?.query?.id === 'search' ? router?.query?.id : '';
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
 
 
  const { filters } = useSelector((state: RootState) => state.filters);
  const { error, data, loading } = useQuery(getSearchProductsQuery, {
    variables: { query: props?.search,...filters },
    
  });

  useEffect(() => {
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
  }, [router?.query?.id]);

  const productData = data?.search ? removeEdgesAndNodes(data?.search) : [];
  const handleNextPage = () => {
    if (data?.search?.pageInfo?.hasNextPage) {
      dispatch(
        toggleFilters({
          ...filters,
          first: 12,
          last: null,
          after: data?.search?.pageInfo?.endCursor,
          before: null,
        }),
      );
      if (window) window?.scrollTo(0, 400);
    }
  };

  const handlePrevPage = () => {
    if (data?.search?.pageInfo?.hasPreviousPage) {
      dispatch(
        toggleFilters({
          ...filters,
          first: null,
          last: 12,
          after: null,
          before: data?.search?.pageInfo?.startCursor,
        }),
      );
      if (window) window?.scrollTo(0, 400);
    }
  };
  return (
    <div className="relative flex flex-col gap-4">
      {!loading ? (
        <div className=" grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4   gap-4">
          {productData.length > 0 ? (
            productData.map((item: any, index: any) => {
              return (
                <div key={index}>
                  <ProductCard item={item} index={index} />
                </div>
              );
            })
          ) : (
            <p className="py-3 text-lg col-span-2">{`Sorry, there are no products in this search.`}</p>
          )}
        </div>
      ) : (
        <div className=" grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4   gap-4">
          {Array.from(
            Array(filters.first ? filters.first : filters.last).keys(),
          ).map((item, index) => {
            return (
              <div key={index}>
                <ProductSkeleton />
              </div>
            );
          })}

        </div>
      )}
      {
        <>
          <hr className="mt-4" />
          <div className="  flex items-center justify-between xsm:justify-center gap-2 xsm:gap-8 mb-2">
            <div className=" flex gap-4 items-center ">
              <Button
                variant="outline"
                className="h-9 flex  gap-2  w-max p-2 text-base rounded-lg"
                onClick={() => handlePrevPage()}
                disabled={
                  data?.search?.pageInfo?.hasPreviousPage
                    ? false
                    : true
                }
              >
                <ArrowLeft className="h-4 w-4" />
                <span className=" ">Previous</span>
              </Button>
            </div>
            <div className=" flex gap-4 items-center ">
              <Button
                variant="outline"
                className="h-9 flex  gap-2 w-max p-2 text-base rounded-lg"
                onClick={() => handleNextPage()}
                disabled={
                  data?.search?.pageInfo?.hasNextPage
                    ? false
                    : true
                }
              >
                <span className=" ">Next</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default ProductSearch;
