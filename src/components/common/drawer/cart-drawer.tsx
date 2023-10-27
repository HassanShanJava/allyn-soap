import { useDispatch, useSelector } from 'react-redux';
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from '~/components/ui/sheet';
import { toggleCartModal } from '~/store/reducers/cart';
import { RootState } from '~/store/store';
import { removeEdgesAndNodes } from '~/utils/helper';
import NextImage from '../custom_image';

type FilterSheetType = {
  modal: boolean;
  setModal: (e: boolean) => void;
};
export default function CartSheet() {
  const { isCartOpen, cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const lines = cart?.cart?.lines?.edges
    ? removeEdgesAndNodes(cart?.cart?.lines)
    : [];
  console.log({ lines });
  return (
    <Sheet open={isCartOpen} onOpenChange={(e) => dispatch(toggleCartModal())}>
      <SheetContent className="font-poppins w-full ">
        <SheetHeader>
          <div className=" text-text font-bold !font-poppins text-3xl">
            Shopping Cart
          </div>
        </SheetHeader>
        <SheetDescription className="mt-4">
          <CartProduct products={lines} cart_id={cart?.cart_id} />

          <ScrollArea className="h-screen  pb-8  font-poppins w-full relative">
            <ScrollBar orientation="vertical" />
            Cart Item
            {/* <FilterContent isSheet={true} /> */}
          </ScrollArea>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
const CartProduct = (props: any) => {
  return (
    <div className="flex flex-col gap-4">
      {props?.products?.map((item: any, index: number) => {
        console.log({ item }, 'product line item');
        return (
          <div className="" key={index}>
            <div
              className={`group  flex  gap-2   mx-auto w-full h-full    transition ease-in  cursor-pointer `}
            >
              <div className=" relative w-2/5 h-full    px-2  m-auto">
                {item?.merchandise?.product?.featuredImage ? (
                  <NextImage
                    height={1000}
                    width={1000}
                    src={item?.merchandise?.product?.featuredImage?.url}
                    alt=""
                    className=" h-full w-80 object-cover object-center rounded-lg"
                  />
                ) : (
                  <div className=" h-full w-full flex items-center justify-center bg-white border border-text-light rounded-xl">
                    <i className="fa-solid fa-image text-2xl text-text-light text-center"></i>
                  </div>
                )}
              </div>
              <div className=" flex-1 flex flex-col gap-1 mt-2">
                <p
                  className={`w-full text-2xl font-semibold  e line-clamp-1  overflow-hidden text-ellipsis    `}
                >
                  {item?.merchandise?.product?.title}
                </p>
                <p
                  className={`text-sm  font-normal  line-clamp-1  overflow-hidden text-ellipsis `}
                >
                  {item?.merchandise?.product?.description}
                  {/* {`(${props?.item?.products?.filters[0]?.values[0]?.count} ${props?.item?.title})`}{' '} */}
                </p>
                <p
                  className={`w-full text-3xl font-semibold   line-clamp-1  overflow-hidden text-ellipsis    `}
                >
                  <span className=" text-xl font-semibold text-red-500">$</span>
                  {/* {(+props?.item?.priceRange?.minVariantPrice?.amount)?.toFixed(
                    2,
                  )} */}
                  {/* {(props?.item?.totalInventory === 0 ||
              !props?.item?.availableForSale) && (
              <span className="w-full text-sm font-semibold text-red-500 mr-auto">
                {' '}
                Sold Out
              </span>
            )} */}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
