import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { poppins } from '~/components/layouts/app';
import { useToast } from '~/components/ui/use-toast';
import { toggleCart } from '~/store/reducers/cart';

type CounterType = {
  qty: number;
  min: number;
  max: number;
  id: string;
  cart_id: string;
  cartUpdateLoading: boolean;
  getCart: (data: any) => unknown;
  cartUpdate: (data: any) => unknown;
};

const CartCounter = (props: CounterType) => {
  const { toast } = useToast();

  const [range, setRange] = useState(props?.qty);
  const dispatch = useDispatch();

  const UpdateCounter = async (type: string) => {
    try {
      if (!props?.cartUpdateLoading) {
        if (props?.max > 0) {
          let cartUpdate: any;
          if (type == 'addition' && range !== props?.max) {
            cartUpdate = await props?.cartUpdate({
              variables: {
                cartId: props?.cart_id,
                lines: [{ id: props?.id, quantity: range + 1 }],
              },
            });
            setRange(range + 1);
          } else if (type == 'substraction' && range !== props?.min) {
            cartUpdate = await props?.cartUpdate({
              variables: {
                cartId: props?.cart_id,
                lines: [{ id: props?.id, quantity: range - 1 }],
              },
            });
            setRange(range - 1);
          }
          if (cartUpdate?.data) {
            const cartData: any = await props?.getCart({
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
          if (range === props?.min || range === props?.max) {
          } else {
            toast({
              variant: 'success',
              title: `Cart updated Succesfully`,
            });
          }
        }
      }
    } catch (e: any) {
      console.log(e);
      toast({
        variant: 'destructive',
        title: e.message,
      });
    }
  };
  return (
    <div
      className={`${poppins.variable} ${poppins.className} text-base px-2 py-1 h-8  bg-text-light-secondary w-fit rounded-sm flex gap-4 items-center`}
    >
      <i
        className={`fa-solid fa-minus ${
          range === props?.min ? ' cursor-not-allowed' : 'cursor-pointer'
        }   text-text-light-gray`}
        onClick={() => UpdateCounter('substraction')}
      ></i>
      <p className="w-6 text-base text-center">
        {range}
        {/* {props?.cartUpdateLoading ? (
          <i className="fa-solid fa-spinner fa-spin"></i>
        ) : (
          // range
        )} */}
      </p>
      <i
        className={`fa-solid fa-plus ${
          range === props?.max ? ' cursor-not-allowed' : 'cursor-pointer'
        }   text-text-light-gray`}
        onClick={() => UpdateCounter('addition')}
      ></i>
    </div>
  );
};

export default CartCounter;
