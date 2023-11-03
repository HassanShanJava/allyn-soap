import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCategory } from '~/store/reducers/category';
import { RootState } from '~/store/store';
import NextImage from '../custom_image';
import { useEffect } from 'react';

const CategoryCard = (props: { item: any; index: number }) => {
  const dispatch = useDispatch();
  const { category } = useSelector((state: RootState) => state.category);
  const onDataSubmit = (data: any) => {
    dispatch(
      toggleCategory({
        handle: data?.handle,
        title: data?.title,
        category_id: data?.id,
        index: props?.index,
      }),
    );
  };
  useEffect(() => {
    dispatch(
      toggleCategory({
        title: 'Body',
        handle: 'body',
        index: 0,
        category_id: 'gid://shopify/Collection/463137538321',
      }),
    );
  }, []);
  return (
    <>
      <div
        className={`group relative  hover:bg-primary ${
          category?.category_id == props?.item?.id
            ? 'bg-primary'
            : 'bg-primary-foreground'
        } w-48 h-48 rounded-2xl  transition ease-in  cursor-pointer mx-auto`}
        onClick={() => onDataSubmit(props?.item)}
      >
        <div className="relative h-4/6 w-full p-4">
          {props?.item?.image ? (
            <NextImage
              height={1000}
              width={1000}
              src={props?.item?.image?.src}
              alt=""
              className=" h-full w-full object-cover object-center rounded-2xl "
            />
          ) : (
            <div className=" h-full w-full flex items-center  justify-center bg-white border border-text-light rounded-2xl">
              <i className="fa-solid fa-image text-5xl  text-text-light-gray text-center"></i>
            </div>
          )}
        </div>
        <div className=" px-4">
          <p
            className={`w-full text-lg font-semibold text-center group-hover:text-text-white line-clamp-1      ${
              category?.category_id == props?.item?.id
                ? ' text-text-white '
                : ' text-text '
            }`}
          >
            {props?.item?.title}
          </p>
          <p
            className={`text-sm  font-medium group-hover:text-text-white line-clamp-1    text-center ${
              category?.category_id == props?.item?.id
                ? ' text-text-white '
                : ' text-text-light '
            } `}
          >
            {`(${props?.item?.products?.filters[0]?.values[0]?.count} ${props?.item?.title})`}{' '}
          </p>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
