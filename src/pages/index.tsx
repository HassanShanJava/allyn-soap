import { NextPageWithLayout } from '~/pages/_app';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import SeoHead from '~/components/common/seo-head';

// import Home from '~/components/app/home';
export const LoadingComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4" />
      <h2 className="text-text text-xl font-semibold">Loading...</h2>
    </div>
  );
};

const HomePage = dynamic(() => import('~/components/app/home'), {
  loading: () => <LoadingComponent />,
});

const IndexPage: NextPageWithLayout = () => {
  return (
    <>
      <SeoHead
        title="Allyn's Soap Co."
        description="Allyn's Soap Co. is dedicated to producing quality handmade soaps and lotions and other bath products with ingredients you can pronounce and understand."
        image_url={
          'https://cdn.shopify.com/s/files/1/0372/6124/6603/files/fb_logo_with_kraft_paper.png?v=1613915363'
        }
      />
      <Suspense
        fallback={<p className="min-h-screen">Loading home from fallback</p>}
      >
        <HomePage />
      </Suspense>
    </>
  );
};

export default IndexPage;
