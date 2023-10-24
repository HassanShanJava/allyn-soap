import { useQuery } from '@apollo/client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { getFilterQuery } from '~/server/lib/shopify/query/menu';

const FilterSection = () => {
  const { error, data: FilterData } = useQuery(getFilterQuery, {
    variables: { handle: 'main-menu' },
  });
  return (
    <div className="  p-4">
      <div className="flex items-center justify-between text-dark border-b border-border-light py-4 ">
        <div className=" font-bold text-xl">Filters</div>
        <div>
          <i className="fa-solid fa-sliders text-xl rotate-90 text-text-light-gray"></i>
        </div>
      </div>
      <div>
        <Accordion type="single" collapsible className="w-full">
          {FilterData?.menu?.items?.map((item: any, index) => {
            if (item?.items?.length > 0) {
              return (
                <AccordionItem value="item-1" key={index}>
                  <AccordionTrigger>{item?.title}</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              );
            } else {
              return <p key={index}>{item?.title}</p>;
            }
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default FilterSection;
