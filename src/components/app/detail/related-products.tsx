import { Button } from '~/components/ui/button';

const RelatedProducts = (props: any) => {
  console.log({ props }, 'related products');
  return (
    <>
      <div className="flex flex-col gap-4 ">
        {/* heading */}
        <div className=" flex flex-col sm:flex-row   gap-2 justify-between items-center">
          <div>
            <h1 className=" font-bold text-text text-4xl">Related Products </h1>
          </div>
        </div>
      </div>
    </>
  );
};
export default RelatedProducts;
