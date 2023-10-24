import { Suspense } from 'react';
import ListingPage from '~/components/app/listing';
import { NextPageWithLayout } from '~/pages/_app';

const ProductDetails: NextPageWithLayout = () => (
  <Suspense fallback={<p>Loading home</p>}>
    <ListingPage />
  </Suspense>
);

export default ProductDetails;
