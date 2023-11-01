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
                {true ? (
                  <>Slider</>
                ) : (
                  <DetailSlider data={productData?.product} />
                )}
              </div>
              <div className="col-span-12 md:col-span-6">
                {true ? (
                  <>Detail</>
                ) : (
                  <Detail data={productData?.product} reviews={reviews} />
                )}
              </div>
              {productData?.product && !loading && !error && (
                <div className="col-span-12  mt-8">
                  <ReveiewContent
                    data={productData?.product}
                    isModal={isModal}
                    setIsModal={setIsModal}
                    reviews={reviews}
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
        data={productData?.product}
        setIsModal={setIsModal}
      />
      {/* <LoadingDialog open={loading} text="Loading..." /> */}
    </>
  );
};
const ReveiewContent = (props: any) => {
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
  return (
    <>
      <div className="flex flex-col gap-4 ">
        {/* heading */}
        <div className=" flex  justify-between gap-2 items-center">
          <h1 className=" font-bold text-text text-4xl">
            All Reviews{' '}
            <span className=" text-text-light-gray text-base font-normal ">
              {props?.reviews?.response?.reviews?.length > 0 &&
                '( ' + props?.reviews?.response?.reviews?.length + ' )'}
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
        {props?.reviews && (
          <>
            <div className="w-full">
              <Slider ref={reviewSlider} {...settings}>
                {props?.reviews?.response?.reviews &&
                  props?.reviews?.response?.reviews?.map(
                    (item: any, index: number) => {
                      console.log({ item }, 'review item');
                      return (
                        <div key={index} className="flex gap-2 p-2 relative">
                          <div className=" h-60  w-full     m-auto  border border-border max-w-1/2 rounded-2xl p-4 flex flex-col gap-4  ">
                            <div className=" text-lg mt-4">
                              {Array.from(Array(item?.score).keys()).map(
                                (item, index) => {
                                  return (
                                    <i
                                      key={index}
                                      className="fa-solid fa-star  text-text-yellow"
                                    ></i>
                                  );
                                },
                              )}
                              {!Number.isInteger(item?.score) && (
                                <i className="fa-solid fa-star-half text-text-yellow"></i>
                              )}
                            </div>
                            <div className=" text-text text-lg font-bold">
                              {item?.user?.display_name}
                            </div>
                            <div className=" text-text-light text-base ">
                              {item?.title}
                              <br />
                              {item?.content}
                            </div>
                            <div className=" text-black/60">
                              Posted on{' '}
                              {new Date(item?.created_at)?.toDateString()}
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}
                {/* {Array.from(Array(8).keys()).map((item, index) => {
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Scelerisque duis ultrices sollicitudin aliquam
                          sem. Scelerisque duis ultrices sollicitudin
                        </div>
                        <div className=" text-black/60">
                          Posted on August 14, 2023
                        </div>
                      </div>
                    </div>
                  );
                })} */}
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
          </>
        )}

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
    </>
  );
};
export default DetailPage;
