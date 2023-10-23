import { Suspense } from 'react';
import Listing from '~/components/app/listing';
import { NextPageWithLayout } from '~/pages/_app';

const ProductDetails: NextPageWithLayout = () => (
  <Suspense fallback={<p>Loading home</p>}>
    <Listing />
  </Suspense>
);

export default ProductDetails;
