import { useQuery } from '@apollo/client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '~/components/common/cards/product-cards';
import { LoadingContent } from '~/components/common/loading/loadingContent';
import { Button } from '~/components/ui/button';
import { getCollectionProductsQuery } from '~/server/lib/shopify/query/collection';
import { toggleFilters } from '~/store/reducers/filters';
import { RootState } from '~/store/store';
import { defaultSort } from '~/utils/constant';
import { removeEdgesAndNodes } from '~/utils/helper';

const ProductListing = () => {
  const router = useRouter();
  const id = router?.query?.id ?? '';
  const { sortKey, reverse } = defaultSort;
  const [after, setAfter] = useState(null);
  const [before, setBefore] = useState(null);
  const [pagination, setPagination] = useState<any>({
    first: 12,
    last: null,
  });
  const dispatch = useDispatch();

  const { filters } = useSelector((state: RootState) => state.filters);
  console.log({ filters }, 'filters toggle');
  const { error, data, loading } = useQuery(getCollectionProductsQuery, {
    variables: { handle: id, ...filters, after, before },
  });
  useEffect(() => {
    setAfter(null);
    setBefore(null);
    dispatch(
      toggleFilters({
        ...filters,
        first: 12,
        last: null,
      }),
    );
  }, [router?.query?.id]);
  const productData = data?.collection?.products
    ? removeEdgesAndNodes(data?.collection?.products)
    : [];
  console.log(before, 'PRODUCT DATA FILTERS');
  const handleNextPage = () => {
    if (data?.collection?.products?.pageInfo?.hasNextPage) {
      setAfter(data?.collection?.products?.pageInfo?.endCursor);
      setPagination((prev: any) => ({ ...prev, first: 12, last: null }));
      dispatch(
        toggleFilters({
          ...filters,
          first: 12,
          last: null,
        }),
      );
      setBefore(null);
    }
  };

  const handlePrevPage = () => {
    if (data?.collection?.products?.pageInfo?.hasPreviousPage) {
      setBefore(data?.collection?.products?.pageInfo?.startCursor);
      setPagination((prev: any) => ({ ...prev, first: null, last: 12 }));
      dispatch(
        toggleFilters({
          ...filters,
          first: null,
          last: 12,
        }),
      );
      setAfter(null);
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
        <div className=" ">
          <LoadingContent text={'Loading...'} />
        </div>
      )}
      {(data?.collection?.products?.pageInfo?.hasPreviousPage ||
        data?.collection?.products?.pageInfo?.hasNextPage) && (
        <div className="  flex items-center justify-end gap-2 mb-2">
          <div className=" flex gap-4 items-center ">
            <Button
              variant="outline"
              className="h-8  w-max p-2"
              onClick={() => handlePrevPage()}
              disabled={
                data?.collection?.products?.pageInfo?.hasPreviousPage
                  ? false
                  : true
              }
            >
              {/* <ChevronLeftIcon className="h-4 w-4" /> */}
              <ArrowLeft className="h-4 w-4" />
              <span className=" text-sm">Previous</span>
            </Button>
          </div>
          <div className=" flex gap-4 items-center ">
            <Button
              variant="outline"
              className="h-8 w-max p-2"
              onClick={() => handleNextPage()}
              disabled={
                data?.collection?.products?.pageInfo?.hasNextPage ? false : true
              }

              // onClick={() => handlePagination(filters.first + 1)}
              // disabled={
              //   (filters.first + 1) * filters.rows > (data?.count ?? 0) ||
              //   Math.ceil((data?.count ?? 0) / filters.rows) ==
              //     filters.first + 1
              // }
            >
              <span className=" text-sm">Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
