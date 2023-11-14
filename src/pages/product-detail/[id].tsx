import { gql } from '@apollo/client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import DetailPage from '~/components/app/detail';
import SeoHead from '~/components/common/seo-head';
import { NextPageWithLayout } from '~/pages/_app';
import { getProductQuery } from '~/server/lib/shopify/query/product';
import apolloClient from '~/utils/apolloClient';
import { removeEdgesAndNodes } from '~/utils/helper';
const ProductDetails = dynamic(() => import('~/components/app/detail'), {
  ssr: true,
});
export async function getStaticPaths() {
  const client = apolloClient();
  const { data } = await client.query({
    query: gql`
      query Products {
        products(first: 10) {
          edges {
            node {
              handle
              id
              title
            }
          }
        }
      }
    `,
  });
  const productData = data?.products
    ? await removeEdgesAndNodes(data?.products)
    : [];
  console.log('productData productData', productData);

  const paths = productData?.map((post: any) => ({
    params: { id: post?.handle as string },
  }));

  return { paths, fallback: true };
}
export async function getStaticProps({ params }: any) {
  const client = apolloClient();

  const { data } = await client.query({
    query: getProductQuery,
    variables: { handle: params?.id },
  });
  return { props: { productData: data } };
}

const ProductDetailsPage = ({ productData }: any) => {
  return (
    <>
      {productData?.product && (
        <SeoHead
          title={productData?.product?.title}
          description={productData?.product?.description}
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
