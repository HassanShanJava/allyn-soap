import React, { useState } from 'react';
import { Skeleton } from '~/components/ui/skeleton';

const BannerSkeleton = () => {
  //   const [hide, setHide] = useState(false);

  return (
    <>
      <div className="!flex flex-col md:!flex-row w-full  gap-5 md:gap-10 justify-between items-start  ">
        <div className="p-6 md:px-12 my-auto w-full md:max-w-[50%] ">
          <Skeleton className="text-text-dark rounded-xl uppercase leading-none text-3xl h-[3.5rem] lg:text-[3.5rem] font-black" />
          <Skeleton className="text-text-light rounded-xl py-10 my-5 w-3/4 leading-none text-sm h-20  md:text-base  " />
          <Skeleton className="text-text-light rounded-xl my-5 w-1/5 leading-none text-sm h-12  md:text-base  " />
        </div>

        <Skeleton className=" h-80 md:h-96 w-full rounded-xl p-6 m-6 md:px-12 " />
      </div>
    </>
  );
};

export default BannerSkeleton;
