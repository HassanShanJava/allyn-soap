import { useEffect, useState } from 'react';
import { removeEdgesAndNodes } from '~/utils/helper';
import Counter from './counter';
import { Button } from '~/components/ui/button';

const Detail = (props: any) => {
  const [variant, setVariant] = useState<any>(null);
  const [range, setRange] = useState<any>(1);

  useEffect(() => {
    const variants = props?.data?.variants?.edges
      ? removeEdgesAndNodes(props?.data?.variants)
      : [];
    setVariant(variants[0]);
  }, [props?.data?.variants]);
  console.log(props?.data, 'props?.data');
  return (
    <div className="  p-4">
      <div>{props?.data?.title}</div>
      <div>${variant?.price?.amount}</div>
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
        />
      </div>
    </div>
  );
};
const RenderButton = (props: { forSale: boolean; quantity: number }) => {
  return (
    <>
      {!props.forSale || props?.quantity <= 0 ? (
        <>
          <Button
            className="w-full cursor-not-allowed"
            variant={'outline'}
            disabled={true}
          >
            Sold Out
          </Button>
        </>
      ) : (
        <>
          <Button className="w-full">Add to Cart</Button>
        </>
      )}
    </>
  );
};
export default Detail;
