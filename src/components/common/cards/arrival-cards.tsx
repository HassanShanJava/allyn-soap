import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCategory } from '~/store/reducers/category';
import { RootState } from '~/store/store';

const ArrivalCard = (props: { item: any; index: number }) => {
  console.log(props?.item, 'props?.item');
  const dispatch = useDispatch();
  const { category } = useSelector((state: RootState) => state.category);
  //   console.log({category})
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
  return (
    <>
      <div
        className={`group relative   ${
          category?.category_id == props?.item?.id ? '' : 'bg-card'
        } w-60 h-60 rounded-xl  transition ease-in  cursor-pointer shadow-md mx-auto  `}
        onClick={() => onDataSubmit(props?.item)}
      >
        <div className="w-full h-full absolute overflow-hidden">
          <div
            className=" absolute   rounded-2xl border-t-[15rem] border-l-[15rem] 
border-solid border-tranparent border-l-card-foreground overflow-hidden   "
          ></div>
          {/* <div className=" absolute bottom-0 w-full h-1/2 bg-red-400"></div> */}
        </div>
        <div className="relative h-4/5 w-full p-4 py-6">
          {props?.item?.image ? (
            <>
              <Image
                height={1000}
                width={1000}
                className=" h-full w-full object-cover object-center rounded-2xl "
                src={props?.item?.image?.src}
                alt="girl-image"
              />
            </>
          ) : (
            <div className=" h-full w-full flex items-center justify-center bg-white border border-text-light rounded-2xl">
              <i className="fa-solid fa-image text-2xl text-text-light text-center"></i>
            </div>
          )}
        </div>
        <div className="relative px-4">
          <p
            className={`w-full text-lg font-semibold text-center group-hover:text-text-white line-clamp-1  overflow-hidden text-ellipsis    ${
              category?.category_id == props?.item?.id
                ? ' text-text-white '
                : ' text-text '
            }`}
          >
            {props?.item?.title}
          </p>
          <p
            className={`text-sm  font-medium group-hover:text-text-white line-clamp-1  overflow-hidden text-ellipsis  text-center ${
              category?.category_id == props?.item?.id
                ? ' text-text-white '
                : ' text-text-light '
            } `}
          ></p>
        </div>
      </div>
    </>
  );
};

export default ArrivalCard;
