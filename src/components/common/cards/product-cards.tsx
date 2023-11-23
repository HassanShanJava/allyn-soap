import Image from 'next/image';

import NextImage from '../custom_image';
import Link from 'next/link';
import SoldOut from '../../../public/assets/soldout.svg';
const ProductCard = (props: { item: any; index: number }) => {
  return (
    <Link
      href={`/product-detail/${props?.item?.handle}`}
      aria-hidden="true"
      tabIndex={-1}
    >
      <div className="relative ">
        <div
          className={`relative group  border border-border py-4 mx-auto w-full max-h transition-all hover:absolute duration-100 rounded-3xl shadow-md ease-in cursor-pointer bg-transparent hover:border-transparent hover:z-20 hover:shadow-2xl hover:bg-text-white  backdrop-blur-3xl  hover:opacity-100 `}
        >
          {(props.item.totalInventory === 0 ||
            !props.item.availableForSale) && (
            <div className="absolute top-1 -right-[22px] px-2 text-white text-sm z-10 ">
              <Image
                height={1000}
                width={1000}
                src={SoldOut}
                alt=""
                className="h-8 w-full object-cover object-center rounded-3xl"
              />
            </div>
          )}
          <div
            className={`relative h-[10rem] group-hover:h-[10rem] w-full px-4`}
          >
            {props.item.featuredImage ? (
              <NextImage
                height={1000}
                width={1000}
                src={props.item.featuredImage.url}
                alt=""
                className="h-full w-full object-cover object-center rounded-2xl"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-white border border-text-light rounded-xl">
                <i className="fa-solid fa-image text-2xl text-text-light text-center"></i>
              </div>
            )}
          </div>
          <div className="relative px-4 flex flex-col justify-between gap-1 mt-2 ">
            <p
              className={`w-full text-xl font-semibold line-clamp-1 group-hover:line-clamp-4 overflow-hidden text-ellipsis`}
            >
              {props.item.title}
            </p>
            <p
              className={`hidden group-hover:relative text-sm font-normal line-clamp-1 group-hover:line-clamp-1 group-hover:overflow-x-hidden group-hover:text-ellipsis`}
            >
              {props.item.description}
            </p>
            <p
              className={`w-full text-2xl font-semibold text-right line-clamp-1`}
            >
              <span className="text-xl font-semibold text-red-500">$</span>
              {(+props.item.priceRange.minVariantPrice.amount)?.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
