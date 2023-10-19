'use client';
// import { getCollections } from 'lib/shopify';
import { useRef } from 'react';
import Slider from 'react-slick';
import CategoryCard from '../cards/category-card';

const CategorySlider = (props:any) => {
      const slider = useRef<any>(null);
  const settings = {
    className: 'center slider variable-width flex gap-3 mx-auto',

    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow:
      4,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint:
           1024,
        settings: {
          slidesToShow:
             2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint:
           800,
        settings: {
          slidesToShow:
          2,
          slidesToScroll: 1,
          centerMode: false,
        },
      },

      {
        breakpoint:
          600,
        settings: {
          slidesToShow:
             1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.05,
          slidesToScroll: 1,
        },
      },
    ],
  };
//   const collection = await getCollections()
    return (
        <div className='w-3/5 bg-black mx-auto'>
          <Slider ref={slider} {...settings}>
         
          {props?.collection?.map((item, index) => {
            return (
              <div key={index} className={` z-10 w-full`}>
                <CategoryCard
                />
              </div>
            );
          })}
          {props?.collection?.length === 0 ? (
            <div className="text-center w-full py-10 text-lg">
              Coming Soon...
            </div>
          ) : (
            ''
          )}
        </Slider>
        </div>
    )
}

export default CategorySlider