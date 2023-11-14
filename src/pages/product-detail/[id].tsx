import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import SeoHead from '~/components/common/seo-head';
import { getProductQuery } from '~/server/lib/shopify/query/product';
import apolloClient from '~/utils/apolloClient';
const ProductDetails = dynamic(() => import('~/components/app/detail'), {
  ssr: true,
});

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const { id } = context.query;
  const client = apolloClient();

  const { data } = await client.query({
    query: getProductQuery,
    variables: { handle: id },
  });

  // Pass data to the page via props
  return { props: { productData: data } };
}

const ProductDetailsPage = (props: any) => {
  console.log(props?.productData, 'propspropspropspropspropsprops');
  return (
    <>
      {props?.productData?.product && (
        <SeoHead
          title={props?.productData?.product?.title ?? ''}
          description={props?.productData?.product?.description ?? ''}
          image_url={
            'https://cdn.shopify.com/s/files/1/0372/6124/6603/files/fb_logo_with_kraft_paper.png?v=1613915363'
          }
        />
      )}
      <Suspense fallback={<p>Loading home</p>}>
        <ProductDetails />
      </Suspense>
    </>
  );
};

export default ProductDetailsPage;
