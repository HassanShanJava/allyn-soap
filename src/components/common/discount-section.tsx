import React from 'react';
import { Button } from '../ui/button';

import NextImage from './custom_image';

import Soap1 from '~/public/assets/soap1.png';
import Soap2 from '~/public/assets/soap2.png';
import Soap3 from '~/public/assets/soap3.png';
import Soap4 from '~/public/assets/soap4.png';
const discountList = [
  {
    name: 'Soap Box',
    img: Soap1,
    price: '24.00',
    compare: '39.00',
    desc: 'Delight your guests with',
  },
  {
    name: 'Candle Box',
    img: Soap2,
    price: '24.00',
    compare: '39.00',
    desc: 'Delight your guests with',
  },
  {
    name: 'Home Box',
    img: Soap3,
    price: '24.00',
    compare: '39.00',
    desc: 'Delight your guests with',
  },
  {
    name: 'Surprise Me Box',
    img: Soap4,
    price: '24.00',
    compare: '39.00',
    desc: 'Delight your guests with',
  },
];

const DiscountSection = () => {
  return (
    <div className="relative p-6 lg:px-12  flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="w-full my-5 md:my-0 md:max-w-[40%]">
        <p className="capitalize text-4xl text-[#272D4E] font-extrabold">
          Our Culinary Journey Best Discount
        </p>
        <p className="capitalize text-[#5E5E5E] py-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore
        </p>
        <Button className="w-[180px] h-[60px]">Explore more</Button>
      </div>
      <div className="grid grid-cols-2 gap-4 ">
        {discountList.map((item, i) => (
          <div
            className="bg-[#FAFAFA] rounded-xl w-fit p-2 sm:p-4  "
            key={i}
          >
            <NextImage src={item.img} alt="/" className="rounded-xl" />
            <p className="font-[600] text-xl md:text-3xl  pp-0.5 md:pt-1 ">
              <span className="text-red-700">$</span>
              {item.price}{''}
              <span className="line-through text-base md:text-lg font-bold">{` $${item.compare}`}</span>
            </p>
            <p className='text-[#272D4E] font-bold text-base md:text-lg py-0.5 md:py-1'>{item.name}</p>
            <p className="line-clamp-1 text-[#5E5E5E]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountSection;
