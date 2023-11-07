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
  editCartItemsMutation,
  getCartQuery,
  noteCartMutation,
  removeFromCartMutation,
} from '~/server/lib/shopify/query/cart';
import CartSkeleton from '../skeleton/cart-skeleton';
import { Button } from '~/components/ui/button';
import Link from 'next/link';
import { poppins } from '~/components/layouts/app';
import { useToast } from '~/components/ui/use-toast';
import { Input } from '~/components/ui/input';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type FilterSheetType = {
  modal: boolean;
  setModal: (e: boolean) => void;
};

export default function CartSheet() {
  const { isCartOpen, cart } = useSelector((state: RootState) => state.cart);
  const [note, setNote] = useState(null);
  useEffect(() => {
    setNote(cart?.cart?.note);
  }, [cart?.cart?.note]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [cartNote, { loading: cartNoteLoading }] =
    useMutation(noteCartMutation);

  const lines = cart?.cart?.lines?.edges
    ? removeEdgesAndNodes(cart?.cart?.lines)
    : [];
  const handleCheckout = async (text: string) => {
    let cartAddData;
    if (note && cart?.cart?.note !== note) {
      cartAddData = await cartNote({
        variables: {
          cartId: cart?.cart_id,
          note: note,
        },
      });
    }
    router.push(text);
  };
  console.log(cart?.cart?.note, 'CartID drawer');
  return (
    <Sheet open={isCartOpen} onOpenChange={(e) => dispatch(toggleCartModal())}>
      <SheetContent
        className={` ${poppins.variable} ${poppins.className} w-full pt-4  md:min-w-[420px] h-screen flex flex-col`}
      >
        <SheetHeader>
          <div className=" text-text font-bold !font-poppins text-xl md:text-3xl">
            Shopping Cart
          </div>
          <div className=" text-text-light-gray capitalize text-sm md:text-xl">
            {cart?.cart?.cost?.totalAmount?.amount > 100 ? (
              'Free Shipping'
            ) : (
              <>
                Buy{' '}
                <span className=" text-text  font-bold ">
                  ${100 - cart?.cart?.cost?.totalAmount?.amount}
                </span>{' '}
                More and get{' '}
                <span className=" text-text  font-bold ">free shipping</span>
              </>
            )}
          </div>
        </SheetHeader>
        <SheetDescription className="relative h-[calc(100vh-6rem)]  flex flex-col item-start justify-between gap-2 ">
          <ScrollArea className="h-full  pb-6     mt-2 pr-2   font-poppins w-full relative">
            <ScrollBar orientation="vertical" />
            <CartProduct products={lines} cart_id={cart?.cart_id} />
            {/* <FilterContent isSheet={true} /> */}
          </ScrollArea>
          <div className="flex-1 flex flex-col   justify-end mb-4 h-full">
            <hr className="mb-6" />
            <div className="flex flex-col gap-4  space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Special instructions for seller"
                  className="bg-text-light-secondary border-none focus:outline-none"
                  value={note ?? ''}
                  autoFocus={false}
                  onChange={(e: any) => {
                    setNote(e.target.value);
                  }}
                />
              </div>
              <div className=" flex flex-col gap-2">
                {cart?.cart?.cost?.totalAmount?.amount <
                  cart?.cart?.cost?.subtotalAmount?.amount && (
                  <div className=" flex justify-between items-center ">
                    <div>{'Discount (-20%)'}</div>
                    <div>
                      -$
                      {(
                        cart?.cart?.cost?.subtotalAmount?.amount -
                        cart?.cart?.cost?.totalAmount?.amount
                      )
                        .toFixed(2)
                        .toString()}
                    </div>
                  </div>
                )}

                <div className=" flex justify-between items-center">
                  <div>
                    Taxes and{' '}
                    <Link href="/shipping">
                      <span className="text-text-blue underline cursor-pointer">
                        shipping
                      </span>{' '}
                    </Link>
                    calculated at checkout
                  </div>
                </div>
                <hr className="mt-4" />

                <div className=" flex justify-between items-center">
                  <div>{'Subtotal'}</div>
                  <div>
                    $
                    {cart?.cart?.cost?.totalAmount?.amount < 100
                      ? (+cart?.cart?.cost?.totalAmount?.amount).toFixed(2)
                      : cart?.cart?.cost?.totalAmount?.amount}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-between mt-3">
              <Button
                onClick={() => {
                  dispatch(toggleCartModal());
                }}
                className="w-full border-primary text-primary "
                variant={'outline'}
              >
                Continue Shopping
              </Button>

              <Button
                className="w-full  "
                disabled={cartNoteLoading}
                onClick={() => {
                  handleCheckout(cart?.cart ? cart?.cart?.checkoutUrl : '');
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
const CartProduct = (props: any) => {
  const { toast } = useToast();

  const [cartDelete, { loading: cartDeleteLoading }] = useMutation(
    removeFromCartMutation,
  );

  const [cartUpdate, { loading: cartUpdateLoading }] = useMutation(
    editCartItemsMutation,
  );
  const [getCart, { loading: cartLoading }] = useLazyQuery(getCartQuery);
  const dispatch = useDispatch();

  const deleteItem = async (item: any) => {
    try {
      const cartDeleteData = await cartDelete({
        variables: { cartId: props?.cart_id, lineIds: [item?.id] },
      });
      if (cartDeleteData) {
        const cartData = await getCart({
          variables: { cartId: props?.cart_id },
        });
        if (cartData?.data?.cart?.totalQuantity > 0) {
          dispatch(
            toggleCart({
              cart_id: props?.cart_id,
              cart: { ...cartData?.data?.cart },
            }),
          );
          toast({
            variant: 'success',
            title: `Cart item deleted Succesfully!`,
          });
        } else {
          const deleteStorage = localStorage.removeItem('cartID');
          dispatch(toggleCartModal());
          dispatch(
            toggleCart({
              cart_id: null,
              cart: null,
            }),
          );
          toast({
            variant: 'success',
            title: `Cart deleted Succesfully`,
          });
        }
      }
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: e.message,
      });
    }
  };
  return (
    <div className="flex flex-col gap-4">
      {cartDeleteLoading || cartLoading ? (
        <>
          {Array.from(Array(3).keys()).map((item, index) => {
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
                  className={`group relative  flex  gap-2   mx-auto w-full h-24    transition ease-in   `}
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
                        className={`w-full text-lg font-normal   line-clamp-1     `}
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
                      className={`w-full text-base font-normal flex gap-2 items-center       `}
                    >
                      $
                      {item?.discountAllocations[0]?.discountedAmount ? (
                        <>
                          {+variants[0].price?.amount * +item?.quantity -
                            +item?.discountAllocations[0]?.discountedAmount
                              ?.amount}
                          <span className=" text-sm text-red-500 line-through">
                            ${+variants[0].price?.amount * +item?.quantity}
                          </span>
                        </>
                      ) : (
                        +variants[0].price?.amount * +item?.quantity
                      )}
                    </p>
                    <CartCounter
                      min={1}
                      qty={item?.quantity}
                      max={variants[0]?.quantityAvailable}
                      cartUpdate={cartUpdate}
                      id={item?.id}
                      cart_id={props?.cart_id}
                      cartUpdateLoading={cartUpdateLoading}
                      getCart={getCart}
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
