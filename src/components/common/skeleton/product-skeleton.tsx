import { Skeleton } from '~/components/ui/skeleton';

const ProductSkeleton = () => {
  //   console.log({category})

  return (
    <div
      className={`group relative  hover:bg-primary hover:border-none py-6 mx-auto w-full h-72 rounded-3xl shadow-md  transition ease-in  cursor-pointer border border-border`}
    >
      <div className="relative h-3/5 w-full  px-4">
        <Skeleton className="h-full w-full rounded-3xl" />
      </div>
      <div className=" px-4 flex flex-col gap-1 mt-2">
        <Skeleton
          className={`w-full h-8 text-2xl font-semibold  group-hover:text-text-white line-clamp-1  overflow-hidden text-ellipsis    `}
        />

        <Skeleton
          className={`text-sm h-4  font-normal group-hover:text-text-white line-clamp-1  overflow-hidden text-ellipsis `}
        />

        <Skeleton
          className={`w-1/2 h-6 text-3xl font-semibold  group-hover:text-text-white line-clamp-1  overflow-hidden text-ellipsis    `}
        />
      </div>
    </div>
  );
};

export default ProductSkeleton;
