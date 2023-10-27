import { Skeleton } from '~/components/ui/skeleton';

const DescriptionSkeleton = () => {
  //   console.log({category})

  return (
    <div className="w-full px-4 py-12 2xl:container sm:px-6 xl:px-20 2xl:mx-auto 2xl:px-0 ">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12 md:col-span-6">
          <Skeleton className="w-full h-full rounded-md " />

          {/* <Slider data={productData?.product} /> */}
        </div>
        <div className="col-span-12 md:col-span-6 space-y-2">
          <Skeleton className="w-1/2 h-10 rounded-md " />
          <Skeleton className="w-full h-52 rounded-md " />
          <Skeleton className="w-full h-8 rounded-md " />
          <div className="flex items-center gap-3">
            <Skeleton className="w-1/6 h-8 rounded-md " />
            <Skeleton className="w-full  h-8 rounded-md " />
          </div>

          {/* {false ? <>Detail</> : <Detail data={productData?.product} />} */}
        </div>
      </div>
    </div>
  );
};

export default DescriptionSkeleton;
