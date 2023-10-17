import CategoryCard from '../common/cards/category-card';

const index =async () => {
  return (
    <section id="category">
    <div className="pb-10">
      <div className="flex items-center justify-center">
        <div className="w-full px-4 py-12 2xl:container sm:px-6 xl:px-20 2xl:mx-auto 2xl:px-0">
          <div className="jusitfy-center flex flex-col items-center">
            <div className="mb-2 flex flex-col items-center justify-center gap-2">
              <p className="text-5xl font-extrabold  text-grayColor">SHOP BY CATEGORIES</p>
              <p className="text-base text-lightColor w-4/6 text-center ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </p>
            </div>
            <div className="grid w-full grid-cols-1 md:grid-cols-3 md:gap-x-8 ">
<CategoryCard />
              
            </div>
          </div>
         
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
