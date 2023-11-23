import { Skeleton } from '~/components/ui/skeleton';
import ProductSkeleton from './product-skeleton';

const DescriptionSkeleton = () => {
  return (
    <div className=" relative w-full px-4 py-12 2xl:container sm:px-6  ">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-6">
          <Skeleton className="w-full xl:w-[88%]  h-[18rem] md:h-[38rem] rounded-md " />

          {/* <Slider data={productData?.product} /> */}
        </div>
        <div className="col-span-12 md:col-span-6 space-y-4">
          <Skeleton className="w-1/2 h-10 rounded-md " />
          <Skeleton className="w-1/4 h-8 rounded-md " />
          <Skeleton className="w-full h-[18.5rem] rounded-md " />
          <Skeleton className="w-1/6 h-3 rounded-md " />

          <Skeleton className="w-1/3 h-6 rounded-md " />
          <Skeleton className="w-full h-2 rounded-md " />
          <>
            <Skeleton className="w-1/4 h-4 rounded-md " />

            <div className="flex items-center gap-3">
              <Skeleton className="w-1/6 h-8 rounded-md " />
              <Skeleton className="w-1/6 h-8 rounded-md " />
              <Skeleton className="w-full  h-8 rounded-md " />
            </div>
          </>
          <Skeleton className="w-1/6 h-3 rounded-md " />
          <Skeleton className="w-full h-1 rounded-md " />
          <Skeleton className="w-1/5 h-3 rounded-md " />

          {/* {false ? <>Detail</> : <Detail data={productData?.product} />} */}
        </div>
      </div>
      <div className=" flex justify-between items-center mt-6 gap-2">
        <Skeleton className="w-1/6 h-10 rounded-md " />
        <Skeleton className="w-1/6  h-10 rounded-md " />
      </div>
      <div className=" flex justify-between items-center mt-6 gap-2">
        <Skeleton className="w-1/6 h-10 rounded-md " />
      </div>
      <>
        {Array.from(Array(4).keys()).map((item, index) => {
          return (
            <div key={index}>
              <ProductSkeleton />
            </div>
          );
        })}
      </>
    </div>
  );
};

export default DescriptionSkeleton;
