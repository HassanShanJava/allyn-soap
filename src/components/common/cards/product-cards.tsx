import Image from 'next/image';

import NextImage from '../custom_image';
import Link from 'next/link';
import SoldOut from '../../../public/assets/soldout.svg';
const ProductCard = (props: { item: any; index: number }) => {
  return (
    <Link href={`/product-detail/${props?.item?.handle}`}>
      <div
        className={`relative group    hover:bg-primary hover:border-none py-4 mx-auto w-full h-80 rounded-3xl shadow-md  transition ease-in  cursor-pointer border border-border`}
      >
        {(props?.item?.totalInventory === 0 ||
          !props?.item?.availableForSale) && (
          <div className=" absolute top-1  -right-[22px] px-2    text-white text-sm z-20">
            <Image
              height={1000}
              width={1000}
              src={SoldOut}
              alt=""
              className=" h-8 w-full object-cover object-center rounded-3xl"
            />
          </div>
        )}
        <div className="relative h-[12rem] w-full  px-4 ">
          {props?.item?.featuredImage ? (
            <NextImage
              height={1000}
              width={1000}
              src={props?.item?.featuredImage?.url}
              alt=""
              className=" h-full w-full object-cover object-center rounded-2xl"
            />
          ) : (
            <div className=" h-full w-full flex items-center justify-center bg-white border border-text-light rounded-xl">
              <i className="fa-solid fa-image text-2xl text-text-light text-center"></i>
            </div>
          )}
        </div>
        <div className=" px-4 flex flex-col gap-1 mt-2 ">
          <p
            className={`w-full text-xl font-semibold  group-hover:text-text-white line-clamp-1  overflow-hidden text-ellipsis    `}
          >
            {props?.item?.title}
          </p>
          <p
            className={`text-sm  font-normal group-hover:text-text-white line-clamp-1  overflow-hidden text-ellipsis `}
          >
            {props?.item?.description}
          </p>
          <p
            className={`w-full text-2xl font-semibold  group-hover:text-text-white line-clamp-1  overflow-hidden text-ellipsis    `}
          >
            <span className=" text-xl font-semibold text-red-500">$</span>
            {(+props?.item?.priceRange?.minVariantPrice?.amount)?.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
