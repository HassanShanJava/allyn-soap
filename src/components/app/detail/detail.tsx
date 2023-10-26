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
