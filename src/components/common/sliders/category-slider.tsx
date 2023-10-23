'use client';
// import { getCollections } from 'lib/shopify';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import CategoryCard from '../cards/category-cards';
import { useQuery } from '@apollo/client';
import { removeEdgesAndNodes } from '~/utils/helper';
import { getCollectionsQuery } from '~/server/lib/shopify/query/collection';

const CategorySlider = () => {
  const slider = useRef<any>(null);
  const [active, setActive] = useState(0);

  const { error, data } = useQuery(getCollectionsQuery);
  const collectionData = data ? removeEdgesAndNodes(data?.collections) : [];
  console.log({ collectionData });
  const next = () => {
    slider?.current?.slickNext();

    setActive((prev) =>
      Math.floor(
        collectionData?.length / slider?.current?.props?.slidesToShow - 2,
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
    className: 'center slider variable-width flex gap-3  mx-auto',
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
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <div className="w-full md:w-4/6  mx-auto flex items-center justify-center gao-2 md:gap-4">
      <div
        onClick={() => previous()}
        className="group flex  bg-text-light-secondary hover:bg-primary  h-10 w-10 text-center justify-center items-center rounded-full cursor-pointer  transition ease-in delay-150"
      >
        <i className="fa-solid fa-chevron-left text-base text-text-light group-hover:text-text-white"></i>
      </div>
      <div className="w-4/5  mx-auto flex-1">
        <Slider ref={slider} {...settings}>
          {collectionData.length > 0 &&
            collectionData?.map((item: any, index: number) => {
              if (item?.products?.filters[0]?.values[0]?.count >= 1) {
                return (
                  <div key={index} className={` w-full sm:mr-4 mx-auto`}>
                    <CategoryCard item={item} index={active} />
                  </div>
                );
              }
            })}
          {collectionData?.length === 0 ? (
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

export default CategorySlider;
