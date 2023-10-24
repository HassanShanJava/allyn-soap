import { useRouter } from 'next/router';
import Detail from './detail';
import Slider from './slider';
import { getProductQuery } from '~/server/lib/shopify/query/product';
import { useQuery } from '@apollo/client';
import { LoadingDialog } from '~/components/common/loading/loadingModal';

const DetailPage = () => {
  const router = useRouter();
  const id = router?.query?.id ?? '';
  const {
    error,
    data: productData,
    loading,
  } = useQuery(getProductQuery, {
    variables: { handle: id },
  });
  console.log({ productData }, 'product Details');
  return (
    <>
      <div className="relative  font-poppins">
        {/* for bg color */}
        <div className="w-full px-4 py-12 2xl:container sm:px-6 xl:px-20 2xl:mx-auto 2xl:px-0 ">
          <div className="grid grid-cols-2">
            <Slider data={productData?.product} />
            <Detail data={productData?.product} />
          </div>
        </div>
      </div>
      {/* <LoadingDialog open={loading} text="Loading..." /> */}
    </>
  );
};

export default DetailPage;
