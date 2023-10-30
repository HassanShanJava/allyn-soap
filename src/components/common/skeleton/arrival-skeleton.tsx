import { Skeleton } from '~/components/ui/skeleton';

const ArrivalSkeleton = () => {
  return (
    <div
      className={`group relative   w-60 h-60 rounded-xl  transition ease-in  cursor-pointer bg-card shadow-md mx-auto  `}
    >
      <div className="w-full h-full absolute overflow-hidden">
        <div
          className=" absolute   rounded-2xl border-t-[15rem] border-l-[15rem] 
border-solid border-tranparent border-l-card-foreground overflow-hidden   "
        ></div>
      </div>
      <div className="relative h-4/5 w-full p-4 py-6">
        <Skeleton className=" h-full w-full object-cover object-center rounded-2xl " />
      </div>
      <div className="relative w-full mx-auto px-4">
        <Skeleton className=" h-6 w-3/4 object-cover object-center  " />
      </div>
    </div>
  );
};

export default ArrivalSkeleton;
