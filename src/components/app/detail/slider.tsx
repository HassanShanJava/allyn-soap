import React, { useEffect, useState } from 'react';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { removeEdgesAndNodes } from '~/utils/helper';
import NextImage from '~/components/common/custom_image';

const DetailSlider = (props: any) => {
  const [imagesData, setImagesData] = useState<any>(null);

  // FOR ANIMATION IN THE
  useEffect(() => {
    const images: any = props?.data?.images?.edges
      ? removeEdgesAndNodes(props?.data?.images)
      : [];
    //  setCartItem(lines);
    setImagesData(images);
  }, [props?.data?.images]);

  const settings = {
    className: ' h-full  w-full    items-center relative   ',
    customPaging: function (i: number) {
      return (
        <a className=" h-16 w-20 mx-auto     cursor-pointer ">
          <NextImage
            alt="feature"
            src={imagesData[i]?.url}
            width={1000}
            height={1000}
            loading="lazy"
            className="h-[4.5rem] w-[4.3rem] mt-6 object-cover  object-center  rounded-sm   duration-700 ease-in-out"
          />
          {/* <img src={`${baseUrl}/abstract0${i + 1}.jpg`} /> */}
        </a>
      );
    },
    dots: true,

    appendDots: (dots: any) => <ul>{dots}</ul>,
    dotsClass:
      'hidden md:flex flex-row flex-wrap gap-4 relative bottom-0 justify-center ',

    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: false,
    arrows: false,
  };
  // lg:w-[34rem]
  return (
    <div className="relative   rounded-md  w-full xl:w-[40rem] h-full ">
      <Slider {...settings}>
        {imagesData &&
          imagesData?.length &&
          imagesData?.map((item: any, index: number) => {
            return (
              <div className={`h-[18rem] md:h-[34rem]  relative`} key={index}>
                <NextImage
                  alt="feature"
                  src={item?.url}
                  width={5000}
                  height={5000}
                  loading="lazy"
                  className="relative object-cover rounded-md object-center h-full w-full   ease-in-out"
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default DetailSlider;
