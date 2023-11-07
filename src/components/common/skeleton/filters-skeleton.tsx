import { Skeleton } from '~/components/ui/skeleton';

const FilterSkeleton = () => {

  return (
    <div className="relative w-full mt-4">
      <div className=" flex  gap-4">
        <Skeleton className="w-full h-8 rounded-md " />
        <Skeleton className="w-16 h-8 rounded-md " />
      </div>
    </div>
  );
};

export default FilterSkeleton;
