import { NextPageWithLayout } from '~/pages/_app';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// import Home from '~/components/app/home';
export const LoadingComponent: React.FC = () => {
  return <p>Loading form dynamic import</p>;
};

const Login = dynamic(() => import('~/components/app/login'), {
  loading: () => <LoadingComponent />,
});

const IndexPage: NextPageWithLayout = () => {
  return (
    <Suspense fallback={<p>Loading home from fallback</p>}>
      <Login />
    </Suspense>
  );
};

export default IndexPage;
