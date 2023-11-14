import React from 'react';
import { Skeleton } from '~/components/ui/skeleton';

const NavSkeleton = () => {
  return (
    <div className="flex  gap-4 items-center">
      {['', '', '', '', '', '', '', '', '', ''].map((item, i) => (
        <div>
          <Skeleton className="w-14 h-2 rounded-md " />
        </div>
      ))}
    </div>
  );
};

export default NavSkeleton;
