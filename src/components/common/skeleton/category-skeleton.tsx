import { Skeleton } from '~/components/ui/skeleton';

const CategorySkeleton = () => {
  //   console.log({category})

  return (
    <div
      className={`group relative  hover:bg-primary bg-primary-foreground
       w-48 h-48 rounded-2xl  transition ease-in  cursor-pointer mx-auto`}
    >
      <div className="relative h-4/6 w-full p-4">
        <Skeleton className=" h-full w-full object-cover object-center rounded-2xl " />
      </div>
      <div className=" px-4 mx-auto flex flex-col w-full gap-4">
        <Skeleton className=" h-6 w-3/4 object-cover object-center  " />
        <Skeleton className=" h-4 w-3/4 object-cover object-center  " />
      </div>
    </div>
  );
};

export default CategorySkeleton;
