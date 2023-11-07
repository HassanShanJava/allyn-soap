import { Skeleton } from '~/components/ui/skeleton';

const CartSkeleton = () => {

  return (
    <div
      className={`group relative  flex  gap-2   mx-auto w-full h-full    transition ease-in   `}
    >
      <div className=" relative w-[30%] h-26      ">
        <Skeleton className="h-full w-full rounded-md" />
      </div>
      <div className=" flex-1 flex flex-col gap-2  ">
        <div
          className={`w-full  font-normal gap-2   flex justify-between items-center   `}
        >
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-8 w-1/4 rounded-md" />
        </div>
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-1/4 rounded-md" />

        {/* <p
          className={`w-full text-base font-normal   line-clamp-1  overflow-hidden text-ellipsis    `}
        >
          ${+variants[0].price?.amount * +item?.quantity}
        </p> */}
        {/* <CartCounter
          min={1}
          qty={item?.quantity}
          max={variants[0]?.quantityAvailable}
        /> */}
        {/* <p
                  className={`text-sm  font-normal  line-clamp-1  overflow-hidden text-ellipsis `}
                >
                  {item?.merchandise?.product?.description}
                </p> */}
      </div>
    </div>
  );
};

export default CartSkeleton;
