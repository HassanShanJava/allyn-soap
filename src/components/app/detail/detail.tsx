import { useEffect, useState } from 'react';
import { removeEdgesAndNodes } from '~/utils/helper';
import Counter from './counter';
import { Button } from '~/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  addToCartMutation,
  createCartMutation,
  getCartQuery,
} from '~/server/lib/shopify/query/cart';
import { toggleCart, toggleCartModal } from '~/store/reducers/cart';
import { Progress } from '~/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Package2, Share2 } from 'lucide-react';

import { SocialDialouge } from '~/components/common/modals/social-modal';
import Image from 'next/image';
import { useToast } from '~/components/ui/use-toast';
import Link from 'next/link';

const Detail = (props: any) => {
  const { toast } = useToast();

  const [variant, setVariant] = useState<any>(null);
  const [variants, setVariants] = useState<any>(null);
  const [cartItem, setCartItem] = useState<any>(null);
  const [cartView, setCartView] = useState<boolean>(false);
  const [range, setRange] = useState<number>(1);
  const { cart } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [cartCreate, { loading: cartCreatLoading }] =
    useMutation(createCartMutation);
  const [cartAdd, { loading: cartAddLoading }] = useMutation(addToCartMutation);
  const [getCart, { loading: cartLoading }] = useLazyQuery(getCartQuery);
  useEffect(() => {
    const variants = props?.data?.variants?.edges
      ? removeEdgesAndNodes(props?.data?.variants)
      : [];
    const lines = cart?.cart?.lines?.edges
      ? removeEdgesAndNodes(cart?.cart?.lines)
      : [];

    setCartItem(lines);
    setVariants(variants);
    setVariant(variants[0]);
  }, [props?.data?.variants]);
  console.log(
    {
      deliveryAddress: {
        address1: user?.user?.defaultAddress?.address1 ?? '',
        address2: user?.user?.defaultAddress?.address2 ?? '',
        city: user?.user?.defaultAddress?.city ?? '',
        company: user?.user?.defaultAddress?.company ?? '',
        country: user?.user?.defaultAddress?.country ?? '',
        firstName: user?.user?.defaultAddress?.firstName ?? '',
        lastName: user?.user?.defaultAddress?.lastName ?? '',
        phone: user?.user?.defaultAddress?.phone ?? '',
        province: user?.user?.defaultAddress?.province ?? '',
        zip: user?.user?.defaultAddress?.zip ?? '',
      },
    },
    'user?.user',
  );
  const addtoCart = async () => {
    try {
      let cartAddData: any;
      if (!cart?.cart_id) {
        const data: any = await cartCreate({
          variables: {
            customerAccessToken: user?.token_id,
            email: user?.user?.email,
            customerAddressId: user?.user?.defaultAddress?.id,
          },
        });
        //  deliveryAddress: {
        //       address1: user?.user?.defaultAddress?.address1 ?? '',
        //       address2: user?.user?.defaultAddress?.address2 ?? '',
        //       city: user?.user?.defaultAddress?.city ?? '',
        //       company: user?.user?.defaultAddress?.company ?? '',
        //       country: user?.user?.defaultAddress?.country ?? '',
        //       firstName: user?.user?.defaultAddress?.firstName ?? '',
        //       lastName: user?.user?.defaultAddress?.lastName ?? '',
        //       phone: user?.user?.defaultAddress?.phone ?? '',
        //       province: user?.user?.defaultAddress?.province ?? '',
        //       zip: user?.user?.defaultAddress?.zip ?? '',
        //     },
        if (data?.data?.cartCreate?.cart) {
          localStorage.setItem(
            'cartID',
            data?.data?.cartCreate?.cart?.id?.toString(),
          );
          cartAddData = await cartAdd({
            variables: {
              cartId: data?.data?.cartCreate?.cart?.id?.toString(),
              lines: [{ merchandiseId: variant?.id, quantity: range }],
            },
          });
          if (cartAddData?.data) {
            const cartData = await getCart({
              variables: {
                cartId: data?.data?.cartCreate?.cart?.id?.toString(),
              },
            });
            if (cartData)
              dispatch(
                toggleCart({
                  cart_id: data?.data?.cartCreate?.cart?.id?.toString(),
                  cart: { ...cartData?.data?.cart },
                }),
              );
          }
        }
      } else {
        cartAddData = await cartAdd({
          variables: {
            cartId: cart?.cart_id,
            lines: [{ merchandiseId: variant?.id, quantity: range }],
          },
        });
        if (cartAddData?.data) {
          const cartData = await getCart({
            variables: { cartId: cart?.cart_id },
          });
          if (cartData?.data)
            dispatch(
              toggleCart({
                cart_id: cart?.cart_id,
                cart: { ...cartData?.data?.cart },
              }),
            );
        }
        setCartView(true);
      }
      toast({
        variant: 'success',
        title: `Added to cart successfully!`,
      });
      setCartView(true);
      setRange(1);
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: e.message,
      });
      console.log('error :::', e?.message);
    }
  };
  function toggleVariant(text: string) {
    const selectedVariant = variants?.find((item: any) => item?.title === text);
    setVariant(selectedVariant);
    setCartView(false);
    setRange(1);
  }
  const cartCheck = cart?.cart?.lines?.edges
    ? removeEdgesAndNodes(cart?.cart?.lines)
    : [];
  const isCartFull =
    cartCheck?.find((item) => variant?.id === item?.merchandise?.id)
      ?.quantity === variant?.quantityAvailable;
  // variant?.title === cartCheck?.merchandise?.title
  return (
    <div className="  flex flex-col gap-8 justify-between">
      <div className="flex flex-col gap-4">
        <div className=" text-4xl font-semibold text-text">
          {/* <p className=" text-sm  uppercase font-bold text-text-gray">Soap</p> */}
          {props?.data?.title}
          <div className="mt-2">
            {props?.reviews?.response?.bottomline && (
              <div className=" text-text-light-gray text-sm font-normal flex items-center gap-2  ">
                <div>
                  {Array.from(
                    Array(
                      Math.floor(
                        props?.reviews?.response?.bottomline?.average_score,
                      ),
                    ).keys(),
                  ).map((item, index) => {
                    return (
                      <i
                        key={index}
                        className="fa-solid fa-star  text-primary"
                      ></i>
                    );
                  })}
                  {/* Check if there's a fractional part and display a half star */}
                  {props?.reviews?.response?.bottomline?.average_score % 1 >
                    0 && (
                    <i className="fa-solid fa-star-half-stroke text-primary"></i>
                  )}
                  {Array.from(
                    Array(
                      5 -
                        Math.floor(
                          props?.reviews?.response?.bottomline?.average_score %
                            1 >
                            0
                            ? Math.ceil(
                                props?.reviews?.response?.bottomline
                                  ?.average_score,
                              )
                            : Math.floor(
                                props?.reviews?.response?.bottomline
                                  ?.average_score,
                              ),
                        ),
                    ).keys(),
                  ).map((item, index) => {
                    return (
                      <i
                        key={index}
                        className="fa-regular fa-star text-primary"
                      ></i>
                    );
                  })}
                </div>
                <span className=" text-text-light-gray text-sm font-normal ">
                  {props?.reviews?.response?.reviews?.length > 0 &&
                    '( ' + props?.reviews?.response?.reviews?.length + ' )'}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className=" text-2xl font-semibold text-text">
            ${(+variant?.price?.amount ?? 0)?.toFixed(2)}
          </div>
          {variant?.compareAtPrice &&
            +variant?.price?.amount < +variant?.compareAtPrice?.amount && (
              <div className=" text-base font-semibold text-text-gray  line-through">
                ${(+variant?.compareAtPrice?.amount ?? 0)?.toFixed(2)}
              </div>
            )}
          {variant?.compareAtPrice &&
            +variant?.price?.amount < +variant?.compareAtPrice?.amount && (
              <div className=" text-[10px] bg-red-600 p-1 w-[4.6rem] text-center text-white rounded-full  text-text-gray  ">
                SAVE{' '}
                {Math.round(
                  ((+variant?.compareAtPrice?.amount -
                    +variant?.price?.amount) /
                    variant?.compareAtPrice?.amount) *
                    100 ?? 0,
                )}
                %
              </div>
            )}
        </div>
      </div>
      <div
        className=" text-text-gray text-base"
        dangerouslySetInnerHTML={{ __html: props?.data?.descriptionHtml }}
      ></div>
      <div className="space-y-10 text-text-gray">
        <div className="space-y-4">
          <div className=" text-base">
            Only <span className="font-bold">{variant?.quantityAvailable}</span>{' '}
            item(s) left in stock!
          </div>
          <Progress value={variant?.quantityAvailable} />
        </div>
        <div className="flex items-center gap-2">
          {variants && variants?.length > 1 && (
            <div className="text-text">
              {props?.data?.options[0]?.name}

              <div className="flex  items-center gap-2">
                <Select
                  onValueChange={toggleVariant}
                  defaultValue={variant?.title}
                  value={variant?.title}
                >
                  <SelectTrigger className=" flex font-bold justify-between h-10 gap-1 w-full xsm:w-32  text-text rounded-md border line-clamp-1 text-center shadow-none   ">
                    <SelectValue placeholder={variant?.title} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {props?.data?.options[0]?.values?.map(
                        (item: any, index: number) => {
                          return (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          );
                        },
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="text-text w-full">
            Quantity
            <div className="flex  items-center gap-2">
              <Counter
                range={range}
                setRange={setRange}
                min={1}
                max={variant?.quantityAvailable}
              />
              <RenderButton
                forSale={variant?.availableForSale}
                quantity={variant?.quantityAvailable}
                cartView={cartView}
                setCartView={setCartView}
                addtoCart={addtoCart}
                cartID={cart?.cart_id}
                isCartFull={isCartFull}
                loading={cartLoading || cartAddLoading || cartCreatLoading}
              />
            </div>
          </div>
        </div>
        <RenderSocials data={props?.data} shop={props?.shop} />
      </div>
    </div>
  );
};
const RenderButton = (props: {
  forSale: boolean;
  cartView: boolean;
  isCartFull: boolean;
  quantity: number;
  addtoCart: () => void;
  setCartView: (e: boolean) => unknown;
  cartID: string | null;
  loading: boolean;
}) => {
  const dispatch = useDispatch();

  if (!props.forSale || props?.quantity <= 0) {
    return (
      <Button
        className="w-full cursor-not-allowed"
        variant={'outline'}
        disabled={true}
      >
        Sold Out
      </Button>
    );
  } else if (props?.cartView) {
    return (
      <Button
        className="w-full "
        variant={'outline'}
        onClick={() => {
          if (props?.cartID) {
            dispatch(toggleCartModal());
            props?.setCartView(false);
          }
        }}
      >
        View Cart
      </Button>
    );
  } else if (props?.isCartFull) {
    return (
      <Button
        className="w-full "
        variant={'outline'}
        onClick={() => {
          if (props?.cartID) {
            dispatch(toggleCartModal());
            props?.setCartView(false);
          }
        }}
      >
        All items in cart
      </Button>
    );
  } else {
    return (
      <Button
        className="w-full flex items-center gap-2"
        disabled={props?.loading}
        onClick={() => props?.addtoCart()}
      >
        {props?.loading && <i className="fa-solid fa-spinner fa-spin"></i>}
        Add to Cart
      </Button>
    );
  }
};

const RenderSocials = (props: any) => {
  const [isModal, setIsModal] = useState(false);
  const cardData = [
    {
      title: 'VISA',
      image:
        'https://cdn.shopify.com/shopifycloud/web/assets/v1/71a20f5a6c5413cb.svg',
    },
    {
      title: 'MASTERCARD',
      image:
        'https://cdn.shopify.com/shopifycloud/web/assets/v1/2659ae94c062303b.svg',
    },
    {
      title: 'AMERICAN_EXPRESS',
      image:
        'https://cdn.shopify.com/shopifycloud/web/assets/v1/7b32514134e62ce3.svg',
    },
    {
      title: 'DISCOVER',
      image:
        'https://cdn.shopify.com/shopifycloud/web/assets/v1/bc21afcd8821554e.svg',
    },
  ];
  return (
    <div className=" ">
      <span
        onClick={() => {
          setIsModal(!isModal);
        }}
        className=" flex gap-2 items-center text-text text-xl  cursor-pointer"
      >
        <Share2 className="h-[1.3rem]" /> Share
      </span>

      <hr className=" my-6" />
      <div className="w-full flex gap-2 items-center text-text text-xl  cursor-pointer overflow-hidden line-clamp-1">
        <Package2 className="h-[1.3rem]" />
        <Link href="/shipping">
          <span className=" underline text-text-blue font-semibold">
            Shipping
          </span>
        </Link>
        calculated at checkout.
      </div>

      <div className=" flex flex-col gap-2 items-center rounded-sm my-6 text-text text-xl w-full h-28 bg-text-light-secondary mx-auto text-center justify-center  cursor-pointer">
        <div className="flex items-center gap-2">
          {props?.shop?.paymentSettings?.acceptedCardBrands &&
            props?.shop?.paymentSettings?.acceptedCardBrands.map(
              (item: any, index: number) => {
                const selectImage = cardData.find(
                  (value) => value.title === item,
                );
                if (selectImage)
                  return (
                    <Image
                      key={index}
                      src={selectImage?.image ?? ''}
                      alt={item}
                      height={30}
                      width={30}
                      className=" h-7 w-10"
                    />
                  );
              },
            )}
        </div>

        <p className=" text-text text-base">Guarantee safe & secure checkout</p>
      </div>
      <SocialDialouge
        isModal={isModal}
        setIsModal={setIsModal}
        data={''}
        title={'Share this Product'}
        type={`${process.env.NEXT_PUBLIC_BASE_URL}/product-detail/${props?.data?.handle}`}
      />
    </div>
  );
};
export default Detail;
