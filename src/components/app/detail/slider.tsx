import React, { useEffect, useRef, useState } from 'react';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { removeEdgesAndNodes } from '~/utils/helper';
import NextImage from '~/components/common/custom_image';

const DetailSlider = (props: any) => {
  const [imagesData, setImagesData] = useState<any>(null);
  console.log({ props, imagesData }, 'slider image');

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
        <a className=" h-16 w-20 mx-auto    cursor-pointer ">
          <NextImage
            alt="feature"
            src={imagesData[i]?.url}
            width={1000}
            height={1000}
            loading="lazy"
            className="h-16 w-20  object-cover  object-center border border-border p-2 rounded-sm   duration-700 ease-in-out"
          />
          {/* <img src={`${baseUrl}/abstract0${i + 1}.jpg`} /> */}
        </a>
      );
    },
    dots: true,

    appendDots: (dots: any) => <ul>{dots}</ul>,
    dotsClass:
      'hidden md:flex flex-row flex-wrap gap-2 relative bottom-0 justify-center ',

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
  return (
    <div className="relative p-6 border border-border rounded-md mx-auto w-full lg:w-5/6 ">
      <Slider {...settings}>
        {imagesData &&
          imagesData?.length &&
          imagesData?.map((item: any, index: number) => {
            return (
              <div className="h-[18rem] lg:h-[24rem] relative" key={index}>
                <NextImage
                  alt="feature"
                  src={item?.url}
                  width={5000}
                  height={5000}
                  loading="lazy"
                  className="relative object-cover rounded-sm object-center h-full w-full   ease-in-out"
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default DetailSlider;
