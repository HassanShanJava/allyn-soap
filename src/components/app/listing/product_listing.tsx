import { useQuery } from '@apollo/client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '~/components/common/cards/product-cards';
import ProductSkeleton from '~/components/common/skeleton/product-skeleton';
import { LoadingContent } from '~/components/common/loading/loadingContent';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { getCollectionProductsQuery } from '~/server/lib/shopify/query/collection';
import { toggleFilters } from '~/store/reducers/filters';
import { RootState } from '~/store/store';
import { removeEdgesAndNodes } from '~/utils/helper';

const ProductListing = () => {
  const router = useRouter();
  const id = router?.query?.id ?? '';

  const dispatch = useDispatch();

  const { filters } = useSelector((state: RootState) => state.filters);
  console.log({ filters }, 'filters toggle');
  const { error, data, loading } = useQuery(getCollectionProductsQuery, {
    variables: { handle: id, ...filters },
  });
  useEffect(() => {
    dispatch(
      toggleFilters({
        ...filters,
        first: 12,
        last: null,
        after: null,
        before: null,
      }),
    );
  }, [router?.query?.id]);
  const productData = data?.collection?.products
    ? removeEdgesAndNodes(data?.collection?.products)
    : [];
  const handleNextPage = () => {
    if (data?.collection?.products?.pageInfo?.hasNextPage) {
      dispatch(
        toggleFilters({
          ...filters,
          first: 12,
          last: null,

          after: data?.collection?.products?.pageInfo?.endCursor,
          before: null,
        }),
      );
    }
  };

  const handlePrevPage = () => {
    if (data?.collection?.products?.pageInfo?.hasPreviousPage) {
      dispatch(
        toggleFilters({
          ...filters,
          first: null,
          last: 12,

          after: null,
          before: data?.collection?.products?.pageInfo?.startCursor,
        }),
      );
    }
  };
  return (
    <div className="relative flex flex-col gap-4">
      {!loading ? (
        <div className=" grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4   gap-4">
          {productData?.length > 0 ? (
            productData.map((item, index) => {
              return (
                <div key={index}>
                  <ProductCard item={item} index={index} />
                </div>
              );
            })
          ) : (
            <p className="py-3 text-lg">{`Sorry, there are no products in this collection.`}</p>
          )}
        </div>
      ) : (
        <div className=" grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4   gap-4">
          {Array.from(
            Array(filters.first ? filters.first : filters.last).keys(),
          ).map((item, index) => {
            return (
              <div key={index}>
                <ProductSkeleton />
              </div>
            );
          })}

          {/* <LoadingContent text={'Loading...'} /> */}
        </div>
      )}
      {(data?.collection?.products?.pageInfo?.hasPreviousPage ||
        data?.collection?.products?.pageInfo?.hasNextPage) && (
        <div className="  flex items-center justify-between xsm:justify-end gap-2 mb-2">
          <div className=" flex gap-4 items-center ">
            <Button
              variant="outline"
              className="h-9 flex  gap-2  w-max p-2 text-base rounded-lg"
              onClick={() => handlePrevPage()}
              disabled={
                data?.collection?.products?.pageInfo?.hasPreviousPage
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
                data?.collection?.products?.pageInfo?.hasNextPage ? false : true
              }
            >
              <span className=" ">Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
