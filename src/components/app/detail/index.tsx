import { useRouter } from 'next/router';
import Detail from './detail';
import { getProductQuery } from '~/server/lib/shopify/query/product';
import { useQuery } from '@apollo/client';
import { LoadingDialog } from '~/components/common/loading/loadingModal';
import Script from 'next/script';
import DescriptionSkeleton from '~/components/common/skeleton/description-skeleton';
import DetailSlider from './slider';
import jqeury from 'jquery';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { Button } from '~/components/ui/button';
import { ReviewDialog } from '~/components/common/modals/reviewModal';
const DetailPage = () => {
  const router = useRouter();
  const id = router?.query?.id ?? '';
  const [reviews, setReviews] = useState(null);
  const [isModal, setIsModal] = useState(false);
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
        .then((json) => setReviews(json))
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
  console.log({ reviews });
  return (
    <>
      <div className="relative  font-poppins">
        {/* for bg color */}
        {!loading ? (
          <div className="relative w-full px-4 py-12 2xl:container sm:px-6  ">
            <div className="relative grid grid-cols-12 gap-2">
              <div className="col-span-12 md:col-span-6 relative     ">
                {false ? (
                  <>Slider</>
                ) : (
                  <DetailSlider data={productData?.product} />
                )}
              </div>
              <div className="col-span-12 md:col-span-6">
                {false ? <>Detail</> : <Detail data={productData?.product} />}
              </div>
              {productData?.product && !loading && !error && (
                <div className="col-span-12  mt-8">
                  <ReveiewContent
                    data={productData?.product}
                    isModal={isModal}
                    setIsModal={setIsModal}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <DescriptionSkeleton />
        )}
      </div>
      <ReviewDialog
        title={'add a reveiew'}
        type={'review'}
        isModal={isModal}
        setIsModal={setIsModal}
      />
      {/* <LoadingDialog open={loading} text="Loading..." /> */}
    </>
  );
};
const ReveiewContent = (props: any) => {
  const [reviewWidget, setReviewWidget] = useState(false);
  const reviewSlider = useRef<any>(null);
  const settings = {
    className: 'center slider variable-width  ',

    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    rows: 2,
    centerMode: false,
    mobileFirst: true,

    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 1.9,
          slidesToScroll: 1.9,
          centerMode: false,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1.4,
          slidesToScroll: 1.4,
          centerMode: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1.2,
          centerMode: false,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const next = () => {
    reviewSlider?.current?.slickNext();
  };

  const previous = () => {
    reviewSlider?.current?.slickPrev();
  };
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
      <div className="flex flex-col gap-4 ">
        {/* heading */}
        <div className=" flex  justify-between gap-2 items-center">
          <h1 className=" font-bold text-text text-4xl">
            All Reviews{' '}
            <span className=" text-text-light-gray text-base font-normal ">
              {'(40)'}
            </span>
          </h1>
          <Button
            onClick={() => {
              props?.setIsModal(true);
            }}
            className="rounded-sm h-12"
          >
            Write a Review
          </Button>
        </div>
        <div className="w-full">
          <Slider ref={reviewSlider} {...settings}>
            {Array.from(Array(8).keys()).map((item, index) => {
              return (
                <div key={index} className="flex gap-2 p-2 relative">
                  <div className=" h-60  w-full     m-auto  border border-border max-w-1/2 rounded-2xl p-4 flex flex-col gap-4  ">
                    <div className=" text-lg mt-4">
                      <i className="fa-solid fa-star  text-text-yellow"></i>
                      <i className="fa-solid fa-star  text-text-yellow"></i>
                      <i className="fa-solid fa-star  text-text-yellow"></i>
                      <i className="fa-solid fa-star  text-text-yellow"></i>
                      <i className="fa-solid fa-star-half text-text-yellow"></i>
                    </div>
                    <div className=" text-text text-lg font-bold">
                      Samantha D.
                    </div>
                    <div className=" text-text-light text-base ">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Scelerisque duis ultrices sollicitudin aliquam sem.
                      Scelerisque duis ultrices sollicitudin
                    </div>
                    <div className=" text-black/60">
                      Posted on August 14, 2023
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="flex gap-2 justify-center mt-4">
          <div
            onClick={() => previous()}
            className="group flex bg-text-light-secondary hover:bg-primary  h-12 w-12 text-center justify-center items-center rounded-full cursor-pointer  transition ease-in delay-150"
          >
            <i className="fa-solid fa-chevron-left text-base text-text-light group-hover:text-text-white"></i>
          </div>
          <div
            onClick={() => next()}
            className="group flex bg-text-light-secondary hover:bg-primary  h-12 w-12 text-center justify-center items-center rounded-full cursor-pointer  transition ease-in delay-150"
          >
            <i className="fa-solid fa-chevron-right text-base text-text-light group-hover:text-text-white"></i>
          </div>
        </div>

        {/* <div className=" grid grid-cols-2 gap-2">
          <div className=" h-54 m-auto border border-border rounded-xl p-4 flex flex-col gap-4">
            <div>
              <i className="fa-solid fa-star  text-text-yellow"></i>
              <i className="fa-solid fa-star  text-text-yellow"></i>
              <i className="fa-solid fa-star  text-text-yellow"></i>
              <i className="fa-solid fa-star  text-text-yellow"></i>
              <i className="fa-solid fa-star-half text-text-yellow"></i>
            </div>
            <div className=" text-text text-lg font-bold">Samantha D.</div>
            <div className=" text-text-light text-base ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque
              duis ultrices sollicitudin
            </div>
            <div className=" text-black/60">Posted on August 14, 2023</div>
          </div>
          <div className=" h-54 m-auto border border-border rounded-xl p-4 flex flex-col gap-4">
            <div>
              <i className="fa-solid fa-star  text-text-yellow"></i>
              <i className="fa-solid fa-star  text-text-yellow"></i>
              <i className="fa-solid fa-star  text-text-yellow"></i>
              <i className="fa-solid fa-star  text-text-yellow"></i>
              <i className="fa-solid fa-star-half text-text-yellow"></i>
            </div>
            <div className=" text-text text-lg font-bold">Samantha D.</div>
            <div className=" text-text-light text-base ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque
              duis ultrices sollicitudin
            </div>
            <div className=" text-black/60">Posted on August 14, 2023</div>
          </div>
        </div> */}
        {/* section */}
      </div>

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
