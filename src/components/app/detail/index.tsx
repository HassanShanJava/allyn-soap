import { useRouter } from 'next/router';
import Detail from './detail';
import { getProductQuery } from '~/server/lib/shopify/query/product';
import { useQuery } from '@apollo/client';
import { LoadingDialog } from '~/components/common/loading/loadingModal';
import Script from 'next/script';
import DescriptionSkeleton from '~/components/common/skeleton/description-skeleton';
import DetailSlider from './slider';
import jqeury from 'jquery';
import { useEffect, useState } from 'react';

const DetailPage = () => {
  const router = useRouter();
  const id = router?.query?.id ?? '';
  const [reviews, setReviews] = useState(null);
  const {
    error,
    data: productData,
    loading,
  } = useQuery(getProductQuery, {
    variables: { handle: id },
  });
  useEffect(() => {
    // productData?.product?.id?.split('/')[
    //   productData?.product?.id?.split('/').length - 1
    // ]
    if (!loading && !error) {
      console.log(
        productData?.product?.id?.split('/')[
          productData?.product?.id?.split('/').length - 1
        ],
        'productID',
      );
      const url = `https://api-cdn.yotpo.com/v1/widget/${process.env.NEXT_PUBLIC_SHOPIFY_REVIEW}/products/4727631511691/reviews.json`;
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error('error:' + err));

      //   const Addoptions = {
      //     method: 'POST',
      //     headers: {
      //       accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       appkey: `${process.env.NEXT_PUBLIC_SHOPIFY_REVIEW}`,
      //       domain: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      //       sku: `${
      //         productData?.product?.id?.split('/')[
      //           productData?.product?.id?.split('/').length - 1
      //         ]
      //       }`,
      //       product_title: `${productData?.product?.title}`,
      //       product_description: `${productData?.product?.title}`,
      //       product_url: `${
      //         process.env.NEXT_PUBLIC_BASE_URL
      //       }product-detail/${'boll-weevil-soap'}}`,
      //       product_image_url: 'http://www.shop.com/phone.jpg',
      //       display_name: 'Shehzad',
      //       email: 'shehzadmunir.qsols@gmail.com',
      //       is_incentivized: true,
      //       review_content: 'It’s really good',
      //       review_title: 'Great Phone',
      //       review_score: 5,
      //       time_stamp: '1415107190',
      //       // image_urls: [
      //       //   'https://i.imgur.com/FtFkDF1.jepg',
      //       //   'https://cnn.com/image/2.jpg',
      //       // ],
      //     }),
      //   };

      //   fetch('https://api.yotpo.com/reviews/dynamic_create', Addoptions)
      //     .then((response) => response.json())
      //     .then((response) => console.log(response))
      //     .catch((err) => console.error(err));
    }
  }, [productData?.product]);
  return (
    <>
      <div className="relative  font-poppins">
        {/* for bg color */}
        {!loading ? (
          <div className="relative w-full px-4 py-12 2xl:container sm:px-6 xl:px-20 ">
            <div className="relative grid grid-cols-12 gap-2">
              <div className="col-span-12 md:col-span-6 relative  md:sticky md:top-36   ">
                {false ? (
                  <>Slider</>
                ) : (
                  <DetailSlider data={productData?.product} />
                )}
              </div>
              <div className="col-span-12 md:col-span-6">
                {false ? <>Detail</> : <Detail data={productData?.product} />}
              </div>
            </div>
            {productData?.product && !loading && !error && (
              <ReveiewContent data={productData?.product} />
            )}
          </div>
        ) : (
          <DescriptionSkeleton />
        )}
      </div>
      {/* <LoadingDialog open={loading} text="Loading..." /> */}
    </>
  );
};
const ReveiewContent = (props: any) => {
  const [reviewWidget, setReviewWidget] = useState(false);
  console.log({ reviewWidget });
  return (
    <>
      <Script
        src={`https://cdn-widgetsrepository.yotpo.com/v1/loader/${process.env.NEXT_PUBLIC_SHOPIFY_REVIEW}`}
        async
        onReady={() => {
          setTimeout(() => {
            setReviewWidget(true);
          }, 4000);

          console.log('Script has loaded');
        }}
      ></Script>
      <div
        className="yotpo-widget-instance"
        data-yotpo-instance-id="522581"
        data-yotpo-product-id={`${
          props?.data?.id?.split('/')[props?.data?.id?.split('/').length - 1]
        }`}
        data-yotpo-name={`${props?.data?.title} | escape`}
        data-yotpo-url={`${
          process.env.NEXT_PUBLIC_BASE_URL
        }/product-detail/${'boll-weevil-soap'}}`}
        data-yotpo-image-url={`${props?.data?.featuredImage?.url} | product_img_url: "large" |replace: '?', '%3F' | replace: '&','%26'`}
        data-yotpo-description={`${props?.data?.description} | escape`}
      ></div>
      {/* {reviewWidget && (
        <div
          className="yotpo-widget-instance"
          data-yotpo-instance-id="522581"
          data-yotpo-product-id={`${
            props?.data?.id?.split('/')[props?.data?.id?.split('/').length - 1]
          }`}
          data-yotpo-name={`${props?.data?.title} | escape`}
          data-yotpo-url={`${
            process.env.NEXT_PUBLIC_BASE_URL
          }/product-detail/${'boll-weevil-soap'}}`}
          data-yotpo-image-url={`${props?.data?.featuredImage?.url} | product_img_url: "large" |replace: '?', '%3F' | replace: '&','%26'`}
          data-yotpo-description={`${props?.data?.description} | escape`}
        ></div>
      )} */}
    </>
  );
};
export default DetailPage;
