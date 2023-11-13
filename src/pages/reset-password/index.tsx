import { NextPageWithLayout } from '~/pages/_app';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// import Home from '~/components/app/home';
export const LoadingComponent: React.FC = () => {
  return <p>Loading form dynamic import</p>;
};

const ResetPassword = dynamic(() => import('~/components/app/reset-password'), {
  loading: () => <LoadingComponent />,
});

const IndexPage: NextPageWithLayout = () => {
  return (
    <Suspense fallback={<p>Loading home from fallback</p>}>
      <ResetPassword />
    </Suspense>
  );
};

export default IndexPage;
