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

const Detail = (props: any) => {
  const [variant, setVariant] = useState<any>(null);
  const [cartItem, setCartItem] = useState<any>(null);
  const [cartView, setCartView] = useState<boolean>(false);
  const [range, setRange] = useState<number>(1);
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const [cartCreate] = useMutation(createCartMutation);
  const [cartAdd] = useMutation(addToCartMutation);
  const [getCart, { data: cartData, loading: cartLoading, error: cartError }] =
    useLazyQuery(getCartQuery);
  useEffect(() => {
    const variants = props?.data?.variants?.edges
      ? removeEdgesAndNodes(props?.data?.variants)
      : [];
    const lines = cart?.cart?.lines?.edges
      ? removeEdgesAndNodes(cart?.cart?.lines)
      : [];

    setCartItem(lines);
    setVariant(variants[0]);
  }, [props?.data?.variants]);
  const addtoCart = async () => {
    try {
      let cartAddData: any;
      if (!cart?.cart_id) {
        console.log('add to cart');
        const data: any = await cartCreate();
        console.log(data, 'add to Cart');
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
          setCartView(true);
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
    } catch (e: any) {
      console.log('error :::', e?.message);
    }
  };
  console.log({ cart }, 'setCartItem');
  return (
    <div className="  p-4 flex flex-col gap-4">
      <div className=" text-4xl font-semibold">{props?.data?.title}</div>
      <div className="flex items-center">
        <div className=" text-xl font-semibold">
          ${(+variant?.price?.amount ?? 0)?.toFixed(2)}
        </div>
        {variant?.compareAtPrice && (
          <div className=" text-base font-semibold text-text-light-secondary">
            ${(+variant?.compareAtPrice?.amount ?? 0)?.toFixed(2)}
          </div>
        )}
      </div>
      <div
        className=" "
        dangerouslySetInnerHTML={{ __html: props?.data?.descriptionHtml }}
      >
        {/* {props?.data?.description} */}
      </div>
      <div>Only {variant?.quantityAvailable} item(s) left in stock!</div>
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
          addtoCart={addtoCart}
        />
      </div>
    </div>
  );
};
const RenderButton = (props: {
  forSale: boolean;
  cartView: boolean;
  quantity: number;
  addtoCart: () => void;
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
        // disabled={true}
        onClick={() => {
          dispatch(toggleCartModal());
        }}
      >
        View Cart
      </Button>
    );
  } else {
    return (
      <Button className="w-full" onClick={() => props?.addtoCart()}>
        Add to Cart
      </Button>
    );
  }
};
export default Detail;
