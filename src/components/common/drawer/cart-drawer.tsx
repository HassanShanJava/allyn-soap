import { useDispatch, useSelector } from 'react-redux';
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
} from '~/components/ui/sheet';
import { toggleCart, toggleCartModal } from '~/store/reducers/cart';
import { RootState } from '~/store/store';
import { removeEdgesAndNodes } from '~/utils/helper';
import NextImage from '../custom_image';
import CartCounter from './cart-counter';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  getCartQuery,
  removeFromCartMutation,
} from '~/server/lib/shopify/query/cart';
import CartSkeleton from '../skeleton/cart-skeleton';

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
      <SheetContent className="font-poppins w-full p-2 md:min-w-[420px] ">
        <SheetHeader>
          <div className=" text-text font-bold !font-poppins text-3xl">
            Shopping Cart
          </div>
        </SheetHeader>
        <SheetDescription className="mt-4 h-screen p-0">
          <ScrollArea className="h-1/2  pb-8 pt-8 px-2 font-poppins w-full relative">
            <ScrollBar orientation="vertical" />
            <CartProduct products={lines} cart_id={cart?.cart_id} />
            {/* <FilterContent isSheet={true} /> */}
          </ScrollArea>
          Description
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
const CartProduct = (props: any) => {
  const [
    cartDelete,
    {
      data: cartDeleteData,
      loading: cartDeleteLoading,
      error: cartDeleteError,
    },
  ] = useMutation(removeFromCartMutation);
  const [getCart, { data: cartData, loading: cartLoading, error: cartError }] =
    useLazyQuery(getCartQuery);
  const dispatch = useDispatch();

  const deleteItem = async (item: any) => {
    console.log({ item }, 'delete item');
    const cartDeleteData = await cartDelete({
      variables: { cartId: props?.cart_id, lineIds: [item?.id] },
    });
    if (cartDeleteData) {
      const cartData = await getCart({
        variables: { cartId: props?.cart_id },
      });
      if (cartData) {
        dispatch(
          toggleCart({
            cart_id: props?.cart_id,
            cart: { ...cartData?.data?.cart },
          }),
        );
      }
    }
  };
  return (
    <div className="flex flex-col gap-4">
      {cartDeleteLoading || cartLoading ? (
        <>
          {Array.from(Array(8).keys()).map((item, index) => {
            return (
              <div key={index}>
                <CartSkeleton />
              </div>
            );
          })}
        </>
      ) : (
        <>
          {props?.products?.map((item: any, index: number) => {
            const variants = item?.merchandise?.product?.variants
              ? removeEdgesAndNodes(item?.merchandise?.product?.variants)
              : [];
            return (
              <div className="" key={index}>
                <div
                  className={`group relative  flex  gap-2   mx-auto w-full h-full    transition ease-in   `}
                >
                  <div className=" relative w-[30%] h-26      ">
                    {item?.merchandise?.product?.featuredImage ? (
                      <NextImage
                        height={1000}
                        width={1000}
                        src={item?.merchandise?.product?.featuredImage?.url}
                        alt=""
                        className=" h-full w-full object-cover object-center rounded-md"
                      />
                    ) : (
                      <div className=" h-full w-full flex items-center justify-center bg-white border border-text-light rounded-xl">
                        <i className="fa-solid fa-image text-base text-text-light text-center"></i>
                      </div>
                    )}
                  </div>
                  <div className=" flex-1 flex flex-col gap-2  ">
                    <div
                      className={`w-full  font-normal   flex justify-between items-center   `}
                    >
                      <p
                        className={`w-full text-xl font-normal   line-clamp-1     `}
                      >
                        {item?.merchandise?.product?.title}
                      </p>

                      <div
                        className="  py-1 px-2 bg-text-light-secondary rounded-md cursor-pointer "
                        onClick={() => {
                          deleteItem({ ...item, variants });
                        }}
                      >
                        <i className="fa-solid fa-trash-can  text-red-500"></i>
                      </div>
                    </div>
                    <p
                      className={`w-full text-base font-normal   line-clamp-1  overflow-hidden text-ellipsis    `}
                    >
                      ${+variants[0].price?.amount * +item?.quantity}
                    </p>
                    <CartCounter
                      min={1}
                      qty={item?.quantity}
                      max={variants[0]?.quantityAvailable}
                    />
                    {/* <p
                  className={`text-sm  font-normal  line-clamp-1  overflow-hidden text-ellipsis `}
                >
                  {item?.merchandise?.product?.description}
                </p> */}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
