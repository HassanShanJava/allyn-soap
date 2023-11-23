import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import NextImage from '../custom_image';
import Link from 'next/link';

const ArrivalCard = (props: { item: any; index: number }) => {
  const { category } = useSelector((state: RootState) => state.category);

  return (
    <Link href={`/product-detail/${props?.item?.handle}`} aria-hidden="true">
      <div
        className={`group relative   ${
          category?.category_id == props?.item?.id ? '' : 'bg-card'
        } w-60 h-60 rounded-xl  transition ease-in  cursor-pointer shadow-md mx-auto  `}
      >
        <div className="w-full h-full absolute overflow-hidden">
          <div
            className=" absolute   rounded-2xl border-t-[15rem] border-l-[15rem] 
border-solid border-tranparent border-l-card-foreground overflow-hidden   "
          ></div>
        </div>
        <div className="relative h-4/5 w-full p-4 py-6">
          {props?.item?.featuredImage ? (
            <NextImage
              height={1000}
              width={1000}
              src={props?.item?.featuredImage?.url}
              alt=""
              className=" h-full w-full object-cover object-center rounded-2xl "
            />
          ) : (
            <div className=" h-full w-full flex items-center justify-center bg-white border border-text-light rounded-2xl">
              <i className="fa-solid fa-image text-2xl text-text-light text-center"></i>
            </div>
          )}
        </div>
        <div className="relative px-4">
          <p
            className={`w-full text-lg font-semibold text-left line-clamp-1  overflow-hidden text-ellipsis    ${
              category?.category_id == props?.item?.id
                ? ' text-text-white '
                : ' text-text '
            }`}
          >
            {props?.item?.title}
          </p>
          <p
            className={`text-sm  font-medium line-clamp-1  overflow-hidden text-ellipsis   ${
              category?.category_id == props?.item?.id
                ? ' text-text-light '
                : ' text-text-light '
            } `}
          ></p>
        </div>
      </div>
    </Link>
  );
};

export default ArrivalCard;
