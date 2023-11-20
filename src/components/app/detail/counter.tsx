type CounterType = {
  range: number;
  setRange: (e: number) => void;
  min: number;
  max: number;
  cartView: boolean;
  setCartView: (e: boolean) => unknown;
};

const Counter = (props: CounterType) => {
  const UpdateCounter = (type: string) => {
    if (props?.max > 0) {
      if (type == 'addition' && props?.range !== props?.max) {
        props?.setRange(props?.range + 1);
      } else if (type == 'substraction' && props?.range !== props?.min) {
        props?.setRange(props?.range - 1);
      }
      props?.setCartView(false);
    }
  };
  return (
    <div className="text-lg px-2 py-1 h-10 border border-border w-fit rounded-md flex gap-4 items-center">
      <i
        className={`fa-solid fa-minus ${
          props?.range === props?.min ? ' cursor-not-allowed' : 'cursor-pointer'
        }   text-text-light-gray`}
        onClick={() => UpdateCounter('substraction')}
      ></i>
      <p className="w-8 text-center">{props?.range}</p>
      <i
        className={`fa-solid fa-plus ${
          props?.range === props?.max ? ' cursor-not-allowed' : 'cursor-pointer'
        }   text-text-light-gray`}
        onClick={() => UpdateCounter('addition')}
      ></i>
    </div>
  );
};

export default Counter;
