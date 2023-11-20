import React from 'react';
import { Skeleton } from '~/components/ui/skeleton';

const NavSkeleton = () => {
  return (
    <div className="hidden xl:flex  gap-4 items-center">
      {Array.from(Array(10).keys()).map((item, i) => (
        <div>
          <Skeleton className="w-14 h-2 rounded-md " />
        </div>
      ))}
    </div>
  );
};

export default NavSkeleton;

export const FooterSkeleton = () => {
  return (
    <>
      {Array.from(Array(4).keys()).map((item, i) => (
        <li key={i}>
          <Skeleton className="w-24 h-2 rounded-md " />
        </li>
      ))}
    </>
  );
};
