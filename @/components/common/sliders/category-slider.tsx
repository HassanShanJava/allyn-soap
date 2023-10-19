'use client';
// import { getCollections } from 'lib/shopify';
import { useRef } from 'react';
import Slider from 'react-slick';
import CategoryCard from '../cards/category-card';

const CategorySlider = (props:any) => {
      const slider = useRef<any>(null);

        const next = () => {
    slider?.current?.slickNext();
  };
  const previous = () => {
    slider?.current?.slickPrev();
  };
  const settings = {
    className: 'center slider variable-width flex gap-3 ',

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
           1536,
        settings: {
          slidesToShow:
             3,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint:
           1280,
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
             2,
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
        <div className='w-full md:w-3/5  mx-auto flex items-center justify-center gao-2 md:gap-4'>
          <div onClick={() => previous()} className='group hidden sm:flex bg-text-light-secondary hover:bg-primary  h-10 w-10 text-center justify-center items-center rounded-full cursor-pointer  transition ease-in delay-150'>
            <i className="fa-solid fa-chevron-left text-base text-text-light group-hover:text-text-white"></i>
          </div>
          <div className='w-3/5  mx-auto flex-1'>

          <Slider ref={slider} {...settings}>
         
          {props?.collection?.map((item:any, index:number) => {
            if(item?.products?.filters[0]?.values[0]?.count >=1)
            {

              return (
                <div key={index} className={` w-full sm:ml-2`}>
                <CategoryCard item={item} index={index}
                />
              </div>
            );
          }
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

          <div onClick={() => next()} className='group hidden sm:flex bg-text-light-secondary hover:bg-primary  h-10 w-10 text-center justify-center items-center rounded-full cursor-pointer  transition ease-in delay-150'>
            <i className="fa-solid fa-chevron-right text-base text-text-light group-hover:text-text-white"></i>
          </div>
        </div>
    )
}

export default CategorySlider