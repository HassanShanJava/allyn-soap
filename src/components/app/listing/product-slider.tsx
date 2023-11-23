import React, { useEffect, useRef, useState } from 'react';
import NextImage from '~/components/common/custom_image';
import { Button } from '~/components/ui/button';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery } from '@apollo/client';
import { getSalesProductQuery } from '~/server/lib/shopify/query/collection';
import { removeEdgesAndNodes } from '~/utils/helper';
import { useRouter } from 'next/router';

const ProductSlider = () => {
  const productSlider = useRef<any>(null);
  const [index, setIndex] = useState(0);
  const [productList, setProductList] = useState<any>([]);
  const settings = {
    // className:"mx-2",
    focusOnSelect: true,
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 2.2,
    slidesToScroll: 1,
    // swipe: false,
    arrows: false,
    autoplay: true,

    beforeChange: (current: number, next: number) => {
      setIndex(Math.ceil(next));
    },
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

  const { data, loading } = useQuery(getSalesProductQuery, {
    variables: { handle: 'special-sale' },
  });

  const productData = data?.collectionByHandle?.products
    ? removeEdgesAndNodes(data?.collectionByHandle?.products)
    : [];

  useEffect(() => {
    if (productData) {
      setProductList(productData);
    }
  }, [data]);

  const next = () => {
    productSlider.current.slickNext();
  };

  const previous = () => {
    productSlider.current.slickPrev();
  };

  const router = useRouter();

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
          <Button
            onClick={() =>
              router.push(`/product-detail/${productList[index]?.handle}`)
            }
            className="w-[140px] h-[40px] md:w-[200px] md:h-[50px] text-sm md:text-base bg-white text-[#272D4E] rounded-lg"
          >
            Buy Now
          </Button>

          <div className="pt-4  md:pt-10 flex gap-2 px-1">
            <Button
              className={` cursor-pointer disabled:cursor-not-allowed   font-thin w-8 h-8 md:w-12 md:h-12 shadow-lg bg-white  text-text hover:text-primary rounded-full flex items-center justify-center `}
              onClick={previous}
              disabled={index == 0 ? true : false}
            >
              <i className="text-sm md:text-xl fas fa-angle-left  "></i>
            </Button>
            <Button
              className={`cursor-pointer disabled:cursor-not-allowed  font-thin w-8 h-8 md:w-12 md:h-12 shadow-lg bg-white text-text hover:text-primary   rounded-full flex items-center justify-center `}
              onClick={next}
              disabled={index == productData?.length - 1 ? true : false}
            >
              <i className=" text-sm md:text-xl fas fa-angle-right "></i>
            </Button>
          </div>
        </div>

        <div className="sm:max-w-[50%] w-full px-6 sm:px-0">
          <Slider ref={productSlider} {...settings}>
            {productData.map((item, i) => {
              const price = Number(item?.priceRange.maxVariantPrice.amount);
              const compare = Number(
                item?.compareAtPriceRange.maxVariantPrice.amount,
              );
              const precentage = Math.floor(
                ((compare - price) / compare) * 100,
              );

              return (
                <div
                  key={i}
                  className=" flex justify-between items-center  px-1     "
                >
                  <div
                    className={`realtive rounded-lg cursor-pointer bg-white p-6 w-fit   mx-auto md:m-0 border-4 ${
                      i === index
                        ? 'border-primary opacity-100'
                        : 'border-transparent opacity-75'
                    } `}
                    onClick={() =>
                      router.push(`/product-detail/${item?.handle}`)
                    }
                  >
                    <div className=" p-auto  my-auto  ">
                      <NextImage
                        src={item.featuredImage.url}
                        width={300}
                        height={400}
                        alt="/"
                        className="w-96 h-48 md:w-[20rem] md:h-[22rem] object-cover rounded-md"
                      />
                    </div>

                    <div className="m-auto h-fit   py-2">
                      <p className="font-[600] text-[#272D4E] py-1 text-xs">
                        {`${(i < 9 ? '0' : '') + (i + 1)} `}&#8213;
                        {' ' + item.title}
                      </p>
                      <p className="font-[600] text-[#272D4E] text-xl">{`${precentage}%`}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
