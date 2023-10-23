import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import ProductCard from '~/components/common/cards/product-cards';
import { LoadingContent } from '~/components/common/loading/loadingContent';
import { getCollectionProductsQuery } from '~/server/lib/shopify/query/collection';
import { getProductsQuery } from '~/server/lib/shopify/query/product';
import { defaultSort } from '~/utils/constant';
import { removeEdgesAndNodes } from '~/utils/helper';

const ProductListing = () => {
  const router = useRouter();
  const id = router?.query?.id ?? '';
  const { sortKey, reverse } = defaultSort;

  const { error, data, loading } = useQuery(getCollectionProductsQuery, {
    variables: { handle: id, reverse, sortKey, first: 12 },
  });
  const productData = data?.collection?.products
    ? removeEdgesAndNodes(data?.collection?.products)
    : [];
  console.log({ productData }, 'product Dynamic Data');
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
            <p className="py-3 text-lg">{`No products found in this collection`}</p>
          )}
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
