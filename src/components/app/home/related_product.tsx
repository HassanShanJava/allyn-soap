import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import ProductCard from '~/components/common/cards/product-cards';
import ProductSkeleton from '~/components/common/skeleton/product-skeleton';
import { LoadingContent } from '~/components/common/loading/loadingContent';
import { getCollectionProductsQuery } from '~/server/lib/shopify/query/collection';
import { RootState } from '~/store/store';
import { removeEdgesAndNodes } from '~/utils/helper';
import { Button } from '~/components/ui/button';
import Link from 'next/link';

const RelatedProducts = () => {
  const { category } = useSelector((state: RootState) => state.category);

  const { error, data, loading } = useQuery(getCollectionProductsQuery, {
    variables: { handle: category?.handle, first: 8 },
  });
  const productData = data?.collection?.products
    ? removeEdgesAndNodes(data?.collection?.products)
    : [];

  return (
    <section id="category ">
      <div className=" px-4   sm:mx-auto  grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full md:w-4/6 gap-4 mb-4   ">
        {!loading ? (
          <>
            {productData?.length > 0 ? (
              productData.map((item, index) => {
                return (
                  <div key={index}>
                    <ProductCard item={item} index={index} />
                  </div>
                );
              })
            ) : (
              <>No Data Found!</>
            )}
          </>
        ) : (
          <>
            {Array.from(Array(8).keys()).map((item, index) => {
              return (
                <div key={index}>
                  <ProductSkeleton />
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="w-full mx-auto  text-center mt-14">
        <Link href={`/products/${category?.handle}`}>
          <Button className=" rounded-lg" size={'lg'}>
            View More
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default RelatedProducts;
