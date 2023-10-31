import React, { useRef, useState } from 'react';
import NextImage from '~/components/common/custom_image';
import { Button } from '~/components/ui/button';

import Soap1 from '~/public/assets/soap1.png';
import Soap2 from '~/public/assets/soap2.png';
import Soap3 from '~/public/assets/soap3.png';
import Soap4 from '~/public/assets/soap4.png';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const productData = [
  {
    name: 'New Products Sale',
    price: '30% OFF',
    img: Soap1,
  },
  {
    name: 'New Products Sale',
    price: '30% OFF',
    img: Soap2,
  },
  {
    name: 'New Products Sale',
    price: '30% OFF',
    img: Soap3,
  },
  {
    name: 'New Products Sale',
    price: '30% OFF',
    img: Soap4,
  },
];

const ProductSlider = () => {
  const productSlider = useRef<any>(null);
  const [index, setIndex] = useState(0);
  const settings = {
    // className:"mx-2",
    dots: false,
    infinite: false,
    speed: 800,
    slidesToShow: 2.2,
    slidesToScroll: 1,
    swipe: false,
    arrows: false,

    mobileFirst: true,
    beforeChange: (current: number, next: number) => setIndex(next),
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          swipe: true,
          slidesToShow: 1.7,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          swipe: true,
          slidesToShow: 1.6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          swipe: true,
          slidesToShow: 1,
        },
      },
    ],
  };

  const next = () => {
    productSlider.current.slickNext();
  };

  const previous = () => {
    productSlider.current.slickPrev();
  };

  return (
    <div className="bg-primary w-full py-6 sm:py-12 lg:py-24 ">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center">
        <div className="w-full my-5 md:my-0 sm:max-w-[50%] md:max-w-[40%]  px-6 md:px-12 md:py-0">
          <p className="capitalize text-4xl text-white font-bold">
            People Also Loved
          </p>
          <p className="capitalize text-sm text-white pt-6 pb-6 md:pb-10 font-[400] ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore
          </p>
          <Button className="w-[140px] h-[40px] md:w-[200px] md:h-[50px] text-sm md:text-base bg-white text-[#272D4E] rounded-lg">
            Buy Now
          </Button>

          <div className="pt-4  md:pt-10 flex gap-2 px-1">
            <Button
              className={` cursor-pointer disabled:cursor-not-allowed   font-thin w-8 h-8 md:w-12 md:h-12 shadow-lg bg-white  text-text hover:text-primary rounded-full flex items-center justify-center `}
              onClick={previous}
            >
              <i className="text-sm md:text-xl fas fa-angle-left  "></i>
            </Button>
            <Button
              className={`cursor-pointer disabled:cursor-not-allowed  font-thin w-8 h-8 md:w-12 md:h-12 shadow-lg bg-white text-text hover:text-primary   rounded-full flex items-center justify-center `}
              onClick={next}
            >
              <i className=" text-sm md:text-xl fas fa-angle-right "></i>
            </Button>
          </div>
        </div>

        <div className="sm:max-w-[50%]   w-full px-6 sm:px-0">
          <Slider ref={productSlider} {...settings}>
            {productData.map((item, i) => (
              <div
                key={i}
                className=" flex justify-between items-center  px-1    "
              >
                <div className="realtive rounded-md bg-white p-6 w-fit   mx-auto md:m-0 ">
                  <div className=" p-auto  my-auto  ">
                    <NextImage
                      src={item.img}
                      alt="/"
                      className="w-96 h-48 md:w-[20rem] md:h-[22rem] object-cover rounded-md"
                    />
                  </div>

                  <div className="m-auto h-fit   py-2">
                    <p className="font-[600] text-[#272D4E] py-1 text-xs">
                      {`${'0' + (i + 1)} -- ${item.name} `}
                    </p>
                    <p className="font-[600] text-[#272D4E] text-xl">{`${item.price}`}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
