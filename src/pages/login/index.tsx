import { NextPageWithLayout } from '~/pages/_app';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import SeoHead from '~/components/common/seo-head';

// import Home from '~/components/app/home';
export const LoadingComponent: React.FC = () => {
  return <p>Loading form dynamic import</p>;
};

const Login = dynamic(() => import('~/components/app/login'), {
  loading: () => <LoadingComponent />,
});

const IndexPage: NextPageWithLayout = () => {
  return (
    <>
      <SeoHead
        title="Login"
        description="Allyn's Soap Co. is dedicated to producing quality handmade soaps and lotions and other bath products with ingredients you can pronounce and understand."
        image_url={
          'https://cdn.shopify.com/s/files/1/0372/6124/6603/files/fb_logo_with_kraft_paper.png?v=1613915363'
        }
      />
      <Suspense fallback={<p>Loading home from fallback</p>}>
        <Login />
      </Suspense>
    </>
  );
};

export default IndexPage;
