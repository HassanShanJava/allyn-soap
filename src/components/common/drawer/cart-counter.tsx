import { useState } from 'react';

type CounterType = {
  qty: number;
  min: number;
  max: number;
};

const CartCounter = (props: CounterType) => {
  const [range, setRange] = useState(props?.qty);
  const UpdateCounter = (type: string) => {
    if (props?.max > 0) {
      if (type == 'addition' && range !== props?.max) {
        setRange(range + 1);
      } else if (type == 'substraction' && range !== props?.min) {
        setRange(range - 1);
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
