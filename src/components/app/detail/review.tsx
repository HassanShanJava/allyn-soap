import { useRef } from 'react';
import Slider from 'react-slick';
import { Button } from '~/components/ui/button';

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
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
        <div className=" flex flex-col sm:flex-row   gap-2 justify-between items-center">
          <div>
            <h1 className=" font-bold text-text text-4xl">
              All Reviews{' '}
              <span className=" text-text-light-gray text-base font-normal ">
                {props?.reviews?.response?.reviews?.length > 0 &&
                  '( ' + props?.reviews?.response?.reviews?.length + ' )'}
              </span>
            </h1>
            {!props?.reviews?.response?.reviews?.length && (
              <span className=" text-text-light-gray text-sm font-normal ">
                No Reviews Available
              </span>
            )}
          </div>

          <Button
            onClick={() => {
              props?.setIsModal(true);
            }}
            className="rounded-sm h-12 w-max"
          >
            Write a Review
          </Button>
        </div>
        {props?.reviews?.response?.reviews?.length > 0 && (
          <>
            <div className="w-full">
              <Slider ref={reviewSlider} {...settings}>
                {props?.reviews?.response?.reviews?.length &&
                  props?.reviews?.response?.reviews?.map(
                    (item: any, index: number) => {
                      return (
                        <div key={index} className="flex gap-2 p-2 relative">
                          <div className=" h-60  w-full     m-auto  border border-border max-w-1/2 rounded-2xl p-4 flex flex-col gap-4  ">
                            <div className=" text-base flex items-center gap-1 mt-4">
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
                              {Array.from(
                                Array(5 - Math.floor(item?.score)).keys(),
                              ).map((item, index) => {
                                return (
                                  <i
                                    key={index}
                                    className="fa-regular fa-star text-text-yellow"
                                  ></i>
                                );
                              })}
                              {!Number.isInteger(item?.score) && (
                                <i className="fa-solid fa-star-half text-text-yellow"></i>
                              )}
                            </div>
                            <div className=" text-text text-lg font-bold">
                              {item?.user?.display_name}{' '}
                              <i className="fa-solid fa-circle-check text-text-green"></i>
                            </div>
                            <div className=" text-text-light text-base font-medium ">
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
      </div>
    </>
  );
};
export default ReveiewContent;
