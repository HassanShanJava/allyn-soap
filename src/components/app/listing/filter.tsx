import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Button } from '~/components/ui/button';
import { Slider } from '~/components/ui/input-slider';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';
import { getFilterQuery } from '~/server/lib/shopify/query/menu';
import { toggleFilters } from '~/store/reducers/filters';
import { RootState } from '~/store/store';
import { getRoutData } from '~/utils/helper';

export function FilterSection() {
  return (
    <div className="  px-2 text-text">
      <FilterContent isSheet={false} />
    </div>
  );
}

type FilterSheetType = {
  modal: boolean;
  setModal: (e: boolean) => void;
};
export function FilterSheet(props: FilterSheetType) {
  return (
    <Sheet open={props?.modal} onOpenChange={(e) => props.setModal(e)}>
      <SheetContent className="font-poppins">
        <SheetHeader>
          {/* <SheetTitle>Are you sure absolutely sure?</SheetTitle> */}
        </SheetHeader>
        <SheetDescription className="h-screen overflow-y-scroll px-2 font-poppins">
          <FilterContent isSheet={true} />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

export function FilterContent(props: { isSheet: boolean }) {
  const {
    error,
    loading,
    data: FilterData,
  } = useQuery(getFilterQuery, {
    variables: { handle: 'main-menu' },
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const { filters } = useSelector((state: RootState) => state.filters);

  const [range, setRange] = useState([5, 300]);
  const [category, setCategory] = useState<any>(null);
  const [activeIndex, seActiveIndex] = useState<any>(null);
  console.log({ range, category });
  const handleCategory = (text: string, index: number) => {
    setCategory(text);
    seActiveIndex(index);
  };
  const applyFilter = () => {
    console.log(' applying filter');
    const price = {
      min: range[0] ?? 0,
      max: range[1] ?? 0,
    };
    category && router.replace(category);

    dispatch(
      toggleFilters({
        ...filters,
        first: 12,
        last: null,
        after: null,
        before: null,
        price: price,
      }),
    );
  };
  return (
    <div className="  p-4 text-text font-poppins">
      <div className="flex items-center justify-between text-dark border-b border-border-light pb-4 ">
        <div
          className={` font-bold font-poppins ${
            props?.isSheet ? 'text-2xl' : 'text-xl'
          } `}
        >
          Filters
        </div>
        {!props?.isSheet && (
          <div>
            <i className="fa-solid fa-sliders text-xl rotate-90 text-text-light-gray"></i>
          </div>
        )}
      </div>
      <div className="h-full">
        <Accordion type="single" collapsible className="w-full">
          {!loading ? (
            <>
              {FilterData?.menu?.items?.map((item: any, index: number) => {
                if (item?.items?.length > 0) {
                  return (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="indent-1 font-poppins">
                        {item?.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        {item?.items &&
                          item.items.map((subItem: any, i: number) => {
                            return (
                              <div
                                onClick={() => {
                                  handleCategory(
                                    `/products/${getRoutData(subItem?.url)}`,
                                    index,
                                  );
                                }}
                                className={`${
                                  category ===
                                  '/products/' + getRoutData(subItem?.url)
                                    ? ' font-bold bg-text-light-secondary '
                                    : ' '
                                } cursor-pointer p-2 hover:bg-text-light-secondary mt-1 rounded-md`}
                                key={i}
                              >
                                <p>{subItem?.title}</p>
                              </div>
                            );
                          })}
                      </AccordionContent>
                    </AccordionItem>
                  );
                } else {
                  return (
                    <p
                      onClick={() => {
                        handleCategory(
                          `/products/${getRoutData(item?.url)}`,
                          index,
                        );
                      }}
                      className={`${
                        category === '/products/' + getRoutData(item?.url)
                          ? ' font-bold bg-text-light-secondary '
                          : ' '
                      } cursor-pointer py-1 indent-1 hover:bg-text-light-secondary mt-1 rounded-md`}
                      key={index}
                    >
                      {item?.title}
                    </p>
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
        <hr className="mt-4" />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={`item-price`}>
            <AccordionTrigger className=" text-text text-xl font-bold">
              Price
            </AccordionTrigger>
            <AccordionContent className=" h-20">
              <div>
                <Slider
                  defaultValue={range}
                  value={range}
                  min={1}
                  max={300}
                  className={'w-full mt-6'}
                  onValueChange={(e: any) => {
                    setRange(e);
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="w-full max-w-lg mx-auto">
          <Button
            className="w-full rounded-md"
            onClick={() => {
              applyFilter();
            }}
          >
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  );
}

// export default FilterSection;
