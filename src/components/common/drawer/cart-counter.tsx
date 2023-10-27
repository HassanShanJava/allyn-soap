import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { editCartItemsMutation } from '~/server/lib/shopify/query/cart';

type CounterType = {
  qty: number;
  min: number;
  max: number;
  getCart: (data: any) => unknown;
};

const CartCounter = (props: CounterType) => {
  const [range, setRange] = useState(props?.qty);

  const [
    cartUpdate,
    {
      data: cartUpdateData,
      loading: cartUpdateLoading,
      error: cartUpdateError,
    },
  ] = useMutation(editCartItemsMutation);
  const UpdateCounter = (type: string) => {
    if (!cartUpdateLoading) {
      if (props?.max > 0) {
        let cartUpdate: any;
        if (type == 'addition' && range !== props?.max) {
          setRange(range + 1);
        } else if (type == 'substraction' && range !== props?.min) {
          setRange(range - 1);
        }
      }
    }
  };
  return (
    <div className="text-base px-2 py-1 h-8  bg-text-light-secondary w-fit rounded-sm flex gap-4 items-center">
      <i
        className={`fa-solid fa-minus ${
          range === props?.min ? ' cursor-not-allowed' : 'cursor-pointer'
        }   text-text-light-gray`}
        onClick={() => UpdateCounter('substraction')}
      ></i>
      <p className="w-6 text-base text-center">{range}</p>
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
