import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import ProductCard from '~/components/common/cards/product-cards';
import { LoadingContent } from '~/components/common/loading/loadingContent';
import { getCollectionProductsQuery } from '~/server/lib/shopify/query/collection';
import { RootState } from '~/store/store';
import { removeEdgesAndNodes } from '~/utils/helper';

const RelatedProducts = () => {
  const { category } = useSelector((state: RootState) => state.category);

  const { error, data, loading } = useQuery(getCollectionProductsQuery, {
    variables: { handle: category?.handle, first: 8 },
  });
  const productData = data
    ? removeEdgesAndNodes(data?.collection?.products)
    : [];
  console.log(productData, 'product Data');

  return (
    <section id="category ">
      <div className=" px-4   sm:mx-auto  grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full md:w-4/6 gap-4 mb-4   ">
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
          <div className=" col-span-4">
            <LoadingContent text={'Loading...'} />
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;
