import { useRouter } from 'next/router';
import Detail from './detail';
import Slider from './slider';
import { getProductQuery } from '~/server/lib/shopify/query/product';
import { useQuery } from '@apollo/client';
import { LoadingDialog } from '~/components/common/loading/loadingModal';
import Script from 'next/script';

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
          <div className="grid grid-cols-12 gap-2">
            <div className=" col-span-6">
              <Slider data={productData?.product} />
            </div>
            <div className=" col-span-6">
              <Detail data={productData?.product} />
            </div>
          </div>

          <ReveiewContent data={productData?.product} />
        </div>
      </div>
      {/* <LoadingDialog open={loading} text="Loading..." /> */}
    </>
  );
};
const ReveiewContent = (props: any) => {
  return (
    <>
      <Script
        src="https://cdn-widgetsrepository.yotpo.com/v1/loader/5m8xhAHtJf2ak4R6ihcYA08d9QdD7NNTDkVromWz"
        async
        onReady={() => {
          console.log('Script has loaded');
        }}
      ></Script>
      <div
        className="yotpo-widget-instance"
        data-yotpo-instance-id="522581"
        data-yotpo-product-id={`{{${props?.data?.id}}}`}
        data-yotpo-name={`{{ ${props?.data?.title} | escape }}`}
        data-yotpo-url={`{{ https://allyns-soap-co.myshopify.com }}{{ ${props?.data?.onlineStoreUrl} }}`}
        data-yotpo-image-url={`"{{ ${props?.data?.featuredImage?.url} | product_img_url: "large" |replace: '?', '%3F' | replace: '&','%26'}}"`}
        data-yotpo-description={`{{ ${props?.data?.description} | escape }}`}
      ></div>
    </>
  );
};
export default DetailPage;
