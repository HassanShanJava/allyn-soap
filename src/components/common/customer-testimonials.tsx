import Image, { StaticImageData } from 'next/image';
import React, { useRef, useState } from 'react';
import User1 from '~/public/assets/user1.jpg';
import User2 from '~/public/assets/user2.png';
import User3 from '~/public/assets/user3.png';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Carousel from 'react-spring-3d-carousel';
import uuidv4 from 'uuid';
import { config } from 'react-spring';

import { Button } from '../ui/button';

type ReviewCard = {
  review: string;
  image: StaticImageData;
  rating: number;
  name: string;
  title: string;
  active?: boolean;
};

const testimonials = [
  {
    review:
      "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!",
    image: User3,
    rating: 5,
    name: 'James K.',
    title: 'merchant',
  },
  {
    review:
      'Just what I was looking for. Thank you for making it painless, pleasant and most of all hassle free! All products are great.',
    image: User2,
    rating: 5,
    name: 'Megen W.',
    title: 'merchant',
  },
  {
    review:
      'Love it. Love it. The scent is amazing and feels awesome on the skin. Will be back for more.',
    image: User1,
    rating: 5,
    name: 'Jesse G.',
    title: 'merchant',
  },
];

const CustomerTestimonials = () => {
  const customerSlider = useRef<any>(null);
  const [index, setIndex] = useState(0);
  const settings = {
    dots: false,
    // fade:true,
    // cssEase:"linear",
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    arrows: false,
    centerMode: true,
    mobileFirst: true,
    beforeChange: (current: number, next: number) => setIndex(next),
    responsive: [
      {
        breakpoint: 480,
        settings: {
          swipe: true,
        },
      },
    ],
  };

  const next = () => {
    customerSlider.current.slickNext();
  };

  const previous = () => {
    customerSlider.current.slickPrev();
  };
  return (
    <div className="w-full py-6 md:p-12 bg-primary">
      <p className="w-full text-center text-4xl md:text-5xl text-white px-6 md:px-0 font-bold ">
        This Is What Our Customers Say
      </p>
      <p className="w-full text-center text-base text-text-dark px-6 md:px-0  pt-6 pb-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
        duis
      </p>

      <div className="pb-6 max-w-[1200px] mx-auto">
        {/* testimonial card */}
        <Slider ref={customerSlider} {...settings}>
          {testimonials.map((review, i) => {
            const payload = { active: i === index, ...review };
            return (
              <>
                <div
                  key={i}
                  className={`relative ${
                    i == index ? ' z-10 ' : ' -z-10 opacity-30'
                  } transition-all ease-in-out duration-300 w-full max-w-6xl mx-auto flex justify-center items-center h-64  sm:h-80   `}
                >
                  <ReviewCard {...payload} />
                </div>
              </>
            );
          })}
        </Slider>
        <div className="flex justify-between w-fit gap-3 md:mt-4 mx-auto">
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
    </div>
  );
};

export default CustomerTestimonials;

const ReviewCard: React.FC<ReviewCard> = (customer: ReviewCard) => {
  console.log({ customer });
  return (
    <div
      className={`  ${
        customer.active
          ? 'absolute h-48 w-[120%] xsm:w-full !max-w-4xl sm:h-72 z-20'
          : 'absolute w-[120%] invisible xsm:visible  h-40 sm:h-60 '
      } flex justify-between items-start bg-white  shadow-lg  p-5 sm:p-7 md:p-10 rounded-xl gap-4 lg:gap-20`}
    >
      <div className="relative w-fit h-fit">
        <div className="relative bg-[#D9D9D9] w-16 xs:w-20 sm:w-44 h-16 xs:h-20 sm:h-44 top-1 xs:top-2 sm:top-3 -left-1 xs:-left-2 sm:-left-3 "></div>
        <Image
          className="relative object-cover w-16 xs:w-20  sm:w-44 h-16 xs:h-20 sm:h-44 top-0 right-0"
          fill
          quality={100}
          src={customer.image}
          alt="/"
        />
      </div>

      <div className="w-full text-xs sm:text-sm md:text-base text-[#5E5E5E] h-16 xs:h-20 sm:h-44">
        <p>{`"${customer.review}"`}</p>

        <div className="my-2 md:my-4">
          {Array.from(Array(customer.rating), (_, index) => (
            <i key={index} className="fa-solid fa-star  text-yellow-400"></i>
          ))}
        </div>

        <div className=" md:my-4 bg-[#484848] h-[1px] w-20 md:w-48" />

        <p className=" md:my-2 text-[#272D4E] font-bold text-base sm:text-lg">
          {customer.name}
        </p>

        <p className="text-md capitalize">{customer.title}</p>
      </div>
    </div>
  );
};
