import { useRouter } from 'next/router';
import FilterSection from './filter';

import ProductListing from './product_listing';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

const ListingSection = () => {
  const router = useRouter();
  const id = router?.query?.id ?? '';
  function toggleLanguageHandler(lang: 'en' | 'ar') {
    const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr';
    const lang_id: 1 | 2 = lang === 'en' ? 1 : 2;
    const language = { lang, dir, lang_id };
  }
  return (
    <section id="Home-Page">
      <div className="relative grid grid-cols-12  text-black px-20 gap-4">
        <div className="h-1/2  shadow-md border border-text-light-secondary  col-span-3 hidden md:block p-2 rounded-2xl">
          <FilterSection />
        </div>
        <div className=" relative col-span-12 md:col-span-9 text-black flex flex-col gap-4">
          <div className=" flex  justify-between">
            <p className="w-full text-text text-4xl capitalize font-semibold">
              {id}
            </p>
            <div className="w-full  flex items-center gap-2 justify-end text-base">
              <p>Sort by:</p>
              <Select onValueChange={toggleLanguageHandler}>
                <SelectTrigger className=" flex font-bold justify-between h-8 w-36 text-text rounded-none border-none line-clamp-1 text-center shadow-none   ">
                  <SelectValue placeholder="Best Selling" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="BEST_SELLING">Best Selling</SelectItem>
                    <SelectItem value="TRENDING">Trending</SelectItem>
                    <SelectItem value="LATEST_ARRIVALS">
                      Latest arrivals
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <ProductListing />
        </div>
      </div>
    </section>
  );
};

export default ListingSection;
