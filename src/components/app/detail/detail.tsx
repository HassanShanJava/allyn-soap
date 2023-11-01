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

const Detail = (props: any) => {
  const [variant, setVariant] = useState<any>(null);
  const [cartItem, setCartItem] = useState<any>(null);
  const [cartView, setCartView] = useState<boolean>(false);
  const [range, setRange] = useState<number>(1);
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const [cartCreate] = useMutation(createCartMutation);
  const [cartAdd] = useMutation(addToCartMutation);
  const [getCart] = useLazyQuery(getCartQuery);
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
        const data: any = await cartCreate();
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
  console.log({ props }, 'product data');
  return (
    <div className="  flex flex-col gap-8 justify-between">
      <div>
        <div className=" text-4xl font-semibold text-text">
          {props?.data?.title}
          <div>
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
                  {Array.from(
                    Array(
                      5 -
                        Math.floor(
                          props?.reviews?.response?.bottomline?.average_score,
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
        <div className="flex items-center">
          <div className=" text-2xl font-semibold text-text">
            ${(+variant?.price?.amount ?? 0)?.toFixed(2)}
          </div>
          {variant?.compareAtPrice && (
            <div className=" text-base font-semibold text-text-light-secondary">
              ${(+variant?.compareAtPrice?.amount ?? 0)?.toFixed(2)}
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

        <div className="text-text">
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

const RenderSocials = () => {
  return <Button className="w-full">Add to Cart</Button>;
};
export default Detail;
