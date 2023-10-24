import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { LoadingContent } from '~/components/common/loading/loadingContent';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { getFilterQuery } from '~/server/lib/shopify/query/menu';
import { getRoutData } from '~/utils/helper';

const FilterSection = () => {
  const {
    error,
    loading,
    data: FilterData,
  } = useQuery(getFilterQuery, {
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
      <div className="h-full">
        <Accordion type="single" collapsible className="w-full">
          {!loading ? (
            <>
              {FilterData?.menu?.items?.map((item: any, index: number) => {
                if (item?.items?.length > 0) {
                  return (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger>{item?.title}</AccordionTrigger>
                      <AccordionContent>
                        {item?.items &&
                          item.items.map((subItem: any, index: number) => {
                            return (
                              <Link
                                href={`/products/${getRoutData(subItem?.url)}`}
                                key={index}
                              >
                                <p>{subItem?.title}</p>
                              </Link>
                            );
                          })}
                      </AccordionContent>
                    </AccordionItem>
                  );
                } else {
                  return (
                    <Link
                      href={`/products/${getRoutData(item?.url)}`}
                      key={index}
                    >
                      {item?.title}
                    </Link>
                  );
                }
              })}
            </>
          ) : (
            <div className=" w-full h-full flex justify-center items-center">
              {/* <LoadingContent text={'Loading...'} /> */}
            </div>
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default FilterSection;
