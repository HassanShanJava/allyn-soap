import { Suspense } from 'react';
import DetailPage from '~/components/app/detail';
import { NextPageWithLayout } from '~/pages/_app';

const ProductDetails: NextPageWithLayout = () => (
  <Suspense fallback={<p>Loading home</p>}>
    <DetailPage />
  </Suspense>
);

export default ProductDetails;
