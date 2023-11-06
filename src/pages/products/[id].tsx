import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { NextPageWithLayout } from '~/pages/_app';
import { LoadingComponent } from '../signup';

const ListingPage = dynamic(() => import('~/components/app/listing'), {
  loading: () => <LoadingComponent />,
})


const ProductDetails: NextPageWithLayout = () => (
  <Suspense fallback={<p>Loading home</p>}>
    <ListingPage />
  </Suspense>
);

export default ProductDetails;
