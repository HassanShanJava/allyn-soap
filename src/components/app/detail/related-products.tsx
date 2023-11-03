import { useQuery } from '@apollo/client';
import ProductCard from '~/components/common/cards/product-cards';
import ProductSkeleton from '~/components/common/skeleton/product-skeleton';
import { Button } from '~/components/ui/button';
import { getProductRecommendationsQuery } from '~/server/lib/shopify/query/product';

const RelatedProducts = (props: any) => {
  const {
    error,
    data: relatedProducts,
    loading,
  } = useQuery(getProductRecommendationsQuery, {
    variables: { productId: props?.dataID },
  });

  return (
    <>
      <div className="flex flex-col gap-4 space-y-6 ">
        {/* heading */}
        <div className=" flex flex-col sm:flex-row   gap-2 justify-between items-center">
          <div>
            <h1 className=" font-bold text-text text-4xl">Related Products </h1>
          </div>
        </div>
        <div className="    sm:mx-auto  grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 w-full gap-6 mb-4   ">
          {!loading ? (
            <>
              {relatedProducts?.productRecommendations?.length > 0 ? (
                relatedProducts?.productRecommendations
                  .slice(0, 5)
                  ?.map((item: any, index: number) => {
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
      </div>
    </>
  );
};
export default RelatedProducts;
