import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { NextPageWithLayout } from '~/pages/_app';
import { LoadingComponent } from '..';
import { useRouter } from 'next/router';
import SeoHead from '~/components/common/seo-head';

const ListingPage = dynamic(() => import('~/components/app/listing'), {
  loading: () => <LoadingComponent />,
  ssr: true,
});

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  const { id } = context.query;
  const seoHead = (id as string)?.split('-').join(' ');
  const finalhead = seoHead?.charAt(0).toUpperCase() + seoHead?.slice(1);

  // Pass data to the page via props
  return { props: { seotitle: finalhead } };
}

const ProductDetails: NextPageWithLayout = (props: any) => {
  console.log({props},"title change")
  return (
    <>
      {props?.seotitle && (
        <SeoHead
          title={props?.seotitle}
          description="Allyn's Soap Co. is dedicated to producing quality handmade soaps and lotions and other bath products with ingredients you can pronounce and understand."
          image_url={
            'https://cdn.shopify.com/s/files/1/0372/6124/6603/files/fb_logo_with_kraft_paper.png?v=1613915363'
          }
        />
      )}
      <Suspense fallback={<p>Loading home</p>}>
        <ListingPage />
      </Suspense>
    </>
  );
};

export default ProductDetails;
