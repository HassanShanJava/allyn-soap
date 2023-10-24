import { useQuery } from '@apollo/client';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import {
  ArrowBigLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import ProductCard from '~/components/common/cards/product-cards';
import { LoadingContent } from '~/components/common/loading/loadingContent';
import { Button } from '~/components/ui/button';
import { getCollectionProductsQuery } from '~/server/lib/shopify/query/collection';
import { RootState } from '~/store/store';
import { defaultSort } from '~/utils/constant';
import { removeEdgesAndNodes } from '~/utils/helper';

const ProductListing = () => {
  const router = useRouter();
  const id = router?.query?.id ?? '';
  const { sortKey, reverse } = defaultSort;
  const { filters } = useSelector((state: RootState) => state.filters);
  console.log({ filters }, 'filters toggle');
  const { error, data, loading } = useQuery(getCollectionProductsQuery, {
    variables: { handle: id, ...filters, first: 12 },
  });
  const productData = data?.collection?.products
    ? removeEdgesAndNodes(data?.collection?.products)
    : [];
  console.log({ data }, 'PRODUCT DATA FILTERS');
  return (
    <>
      {!loading ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

          <div className=" col-span-4 flex items-center justify-between space-x-2">
            <div className=" flex gap-4 items-center ">
              {/* <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                // onClick={() => handlePagination(0)}
                // disabled={filters.first === 0}
              >
                <span className="sr-only">Go to first page</span>
                <DoubleArrowLeftIcon className="h-4 w-4" />
              </Button> */}

              <Button
                variant="outline"
                className="h-8  w-max p-2"
                // onClick={() => handlePagination(filters?.first - 1)}
                // disabled={filters?.first === 0}
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
        </div>
      ) : (
        <div className=" col-span-4">
          <LoadingContent text={'Loading...'} />
        </div>
      )}
    </>
  );
};

export default ProductListing;
