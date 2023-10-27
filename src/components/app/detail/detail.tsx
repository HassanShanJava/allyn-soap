import { useEffect, useState } from 'react';
import { removeEdgesAndNodes } from '~/utils/helper';
import Counter from './counter';
import { Button } from '~/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { useMutation } from '@apollo/client';
import {
  addToCartMutation,
  createCartMutation,
} from '~/server/lib/shopify/query/cart';

const Detail = (props: any) => {
  const [variant, setVariant] = useState<any>(null);
  const [cartItem, setCartItem] = useState<any>(null);
  const [cartView, setCartView] = useState<boolean>(false);
  const [range, setRange] = useState<number>(1);
  const { cart } = useSelector((state: RootState) => state.cart);
  const [cartCreate] = useMutation(createCartMutation);
  const [cartAdd] = useMutation(addToCartMutation);
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
      if (!cart?.cart_id) {
        console.log('add to cart');
        const data: any = await cartCreate();
        console.log(data, 'add to Cart');
        if (data?.data?.cartCreate?.cart) {
          localStorage.setItem(
            'cartID',
            data?.data?.cartCreate?.cart?.id?.toString(),
          );
          await cartAdd({
            variables: {
              cartId: data?.data?.cartCreate?.cart?.id?.toString(),
              lines: [{ merchandiseId: variant?.id, quantity: range }],
            },
          });
          setCartView(true);
        }
      } else {
        await cartAdd({
          variables: {
            cartId: cart?.cart_id,
            lines: [{ merchandiseId: variant?.id, quantity: range }],
          },
        });
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
        className="w-full cursor-not-allowed"
        variant={'outline'}
        disabled={true}
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
