'use client';
// import { getCollections } from 'lib/shopify';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { useQuery } from '@apollo/client';
import { removeEdgesAndNodes } from '~/utils/helper';
import ArrivalCard from '../cards/arrival-cards';
import { getProductsQuery } from '~/server/lib/shopify/query/product';
import ArrivalSkeleton from '../skeleton/arrival-skeleton';

const ArrivalSlider = () => {
  const slider = useRef<any>(null);
  const [active, setActive] = useState(0);
  const { data, loading } = useQuery(getProductsQuery, {
    variables: {
      query: 'totalInventory:>=1',
      reverse: true,
      sortKey: 'CREATED_AT',
      first: 8,
    },
  });
  // const { error, data } = useQuery(getCollectionsQuery);
  const newArrivalData = data?.products
    ? removeEdgesAndNodes(data?.products)
    : [];

  const next = () => {
    slider?.current?.slickNext();

    setActive((prev) =>
      Math.floor(
        newArrivalData?.length / slider?.current?.props?.slidesToShow - 2,
      ) > prev
        ? prev + 1
        : prev,
    );
  };

  const previous = () => {
    slider?.current?.slickPrev();
    setActive((prev) => (prev === 0 ? 0 : prev - 1));
  };
  const settings = {
    className: 'center slider variable-width flex gap-3 ',
    customPaging: function (i: number) {
      return (
        <a className={` hidden lg:block    `}>
          <div
            onClick={() => setActive(i)}
            className={`mt-4 flex items-center justify-center relative rounded-full h-4 w-4   ${
              i === active ? ' border border-primary p-1 ' : ' p-1'
            }`}
          >
            <div
              className={`h-full w-full  rounded-full    ${
                i === active ? 'bg-primary  ' : 'bg-primary-muted '
              } `}
            ></div>
          </div>
        </a>
      );
    },
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    centerMode: false,
    mobileFirst: true,

    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
          slidesToShow: 2,
          slidesToScroll: 2,
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
  //   const collection = await getCollections()
  return (
    <div
      className={`w-full md:w-5/6  mx-auto flex items-center justify-center gao-2 md:gap-4  ${
        !loading ? 'fade-in-card' : ''
      }`}
    >
      <div
        onClick={() => previous()}
        className="group flex bg-text-light-secondary hover:bg-primary  h-10 w-10 text-center justify-center items-center rounded-full cursor-pointer  transition ease-in delay-150"
      >
        <i className="fa-solid fa-chevron-left text-base text-text-light group-hover:text-text-white"></i>
      </div>
      <div className="w-4/5  mx-auto flex-1">
        <Slider ref={slider} {...settings}>
          {newArrivalData.length > 0 &&
            newArrivalData?.map((item: any, index: number) => {
              return (
                <div key={index} className={`w-full md:mr-4`}>
                  <ArrivalCard item={item} index={active} />
                </div>
              );
            })}
          {loading &&
            Array.from(Array(8).keys()).map((item, index) => {
              return (
                <div key={index} className={`w-full sm:mr-4`}>
                  <ArrivalSkeleton />
                </div>
              );
            })}
          {newArrivalData?.length === 0 ? (
            <div className="text-center w-full py-10 text-lg">
              Coming Soon...
            </div>
          ) : (
            ''
          )}
        </Slider>
      </div>

      <div
        onClick={() => next()}
        className="group flex bg-text-light-secondary hover:bg-primary  h-10 w-10 text-center justify-center items-center rounded-full cursor-pointer  transition ease-in delay-150"
      >
        <i className="fa-solid fa-chevron-right text-base text-text-light group-hover:text-text-white"></i>
      </div>
    </div>
  );
};

export default ArrivalSlider;
