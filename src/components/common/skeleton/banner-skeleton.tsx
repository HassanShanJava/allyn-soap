import React, { useState } from 'react';
import { Skeleton } from '~/components/ui/skeleton';

const BannerSkeleton = ({ collectionBanner }: any) => {
  //   const [hide, setHide] = useState(false);
  return (
    <>
      {collectionBanner ? (
        <div className="!flex flex-col md:!flex-row w-full  gap-5 md:gap-10 justify-between items-start  ">
          <div className="p-6 md:px-12 my-auto w-full md:max-w-[50%] ">
            <Skeleton className="text-text-dark rounded-xl uppercase leading-none text-3xl h-24 lg:text-[3.5rem] font-black" />
            <Skeleton className="text-text-light rounded-xl py-10 my-5 w-[70%] leading-none text-sm h-18 md:text-base  " />
          </div>

          <Skeleton className="h-96 w-full rounded-xl p-6 m-6 md:px-12 " />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default BannerSkeleton;
