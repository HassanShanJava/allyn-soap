import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCategory } from '~/store/reducers/category';
import { RootState } from '~/store/store';
import NextImage from '../custom_image';
import Link from 'next/link';

const ProductCard = (props: { item: any; index: number }) => {
  const dispatch = useDispatch();
  const { category } = useSelector((state: RootState) => state.category);
  //   console.log({category})

  return (
    <Link href={`/product-detail/${props?.item?.handle}`}>
      <div
        className={`group relative  hover:bg-primary hover:border-none py-6 mx-auto w-full h-72 rounded-3xl shadow-md  transition ease-in  cursor-pointer border border-border`}
      >
        <div className="relative h-3/5 w-full  px-4">
          {/* <Image
            height={1000}
            width={1000}
            className=" h-full w-full object-cover object-center rounded-xl "
            src={LogoImage.src}
            alt="girl-image"
          /> */}
          {props?.item?.featuredImage ? (
            <NextImage
              height={1000}
              width={1000}
              src={props?.item?.featuredImage?.url}
              alt=""
              className=" h-full w-full object-cover object-center rounded-3xl"
            />
          ) : (
            <div className=" h-full w-full flex items-center justify-center bg-white border border-text-light rounded-xl">
              <i className="fa-solid fa-image text-2xl text-text-light text-center"></i>
            </div>
          )}
        </div>
        <div className=" px-4 flex flex-col gap-1 mt-2">
          <p
            className={`w-full text-2xl font-semibold  group-hover:text-text-white line-clamp-1  overflow-hidden text-ellipsis    `}
          >
            {props?.item?.title}
          </p>
          <p
            className={`text-sm  font-normal group-hover:text-text-white line-clamp-1  overflow-hidden text-ellipsis `}
          >
            {props?.item?.description}
            {/* {`(${props?.item?.products?.filters[0]?.values[0]?.count} ${props?.item?.title})`}{' '} */}
          </p>
          <p
            className={`w-full text-3xl font-semibold  group-hover:text-text-white line-clamp-1  overflow-hidden text-ellipsis    `}
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
