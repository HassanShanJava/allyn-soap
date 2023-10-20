
import langContent from '~/locales';
import { RootState } from '~/store/store';
import { useSelector } from 'react-redux';
import CategorySection from './category_section';

export default function Home() {
  return (
    <div className=" flex flex-col w-full ">
      {/* // <div className=""> */}

      {/* product section 1 */}
      <div className="relative flex flex-col gap-4 md:gap-14  md:px-10  py-6 md:py-12  ">
       <CategorySection />
       
      </div>

      {/* Video section */}
      <div className="relative bg-background-footer px-4 flex flex-col gap-4 md:gap-14  md:px-14  py-6 md:py-12">
        
      </div>
    </div>
  );
}
