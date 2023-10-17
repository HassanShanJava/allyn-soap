import { Button } from '@/components/ui/button';
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
              <div className="mt-4 flex flex-col space-y-4 md:mt-0 md:space-y-8 ">

                <div className="group relative flex h-full w-full max-h-[20rem] lg:max-w-[30rem] items-center justify-center">
                  <img
                    className="h-80 w-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                    alt="shoe-image"
                  />
                  <Button className="absolute bottom-4 z-10 w-36 bg-[#ffffff] shadow-md py-3 text-base font-medium leading-none text-main focus:text-subsec focus:outline-none focus:ring-2 focus:ring-offset-2">
                    Shoes
                  </Button>
                  <div className="absolute bottom-3 z-0 w-36 bg-[#ffffff] shadow-md bg-opacity-50 px-20 py-6 opacity-0 transition duration-500 group-hover:opacity-40" />
                </div>

                <div className="group relative flex h-full w-full max-h-[20rem] lg:max-w-[30rem] items-center justify-center">
                  <img
                    className="h-80 w-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80"
                    alt="watch-image"
                  />
                  <Button className="absolute bottom-4 z-10 w-36 bg-[#ffffff] shadow-md py-3 text-base font-medium leading-none text-main focus:text-subsec focus:outline-none focus:ring-2 focus:ring-offset-2">
                    Shoes
                  </Button>
                  <div className="absolute bottom-3 z-0 w-36 bg-[#ffffff] shadow-md bg-opacity-50 px-20 py-6 opacity-0 transition duration-500 group-hover:opacity-40" />
                </div>

              </div>


              <div className="group relative mt-4 flex h-full w-full lg:max-h-[42rem]  lg:max-w-[30rem] items-center justify-center md:mt-0 ">
                <img
                  className="h-full w-full object-cover object-center"
                  src="https://images.unsplash.com/photo-1534565337397-2a97f4e093b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=654&q=80"
                  alt="girl-image"
                />
                <Button className="absolute bottom-4 z-10 w-36 bg-[#ffffff] shadow-md py-3 text-base font-medium leading-none text-main focus:text-subsec focus:outline-none focus:ring-2 focus:ring-offset-2">
                  Shoes
                </Button>
                <div className="absolute bottom-3 z-0 w-36 bg-[#ffffff] shadow-md bg-opacity-50 px-20 py-6 opacity-0 transition duration-500 group-hover:opacity-40" />
              </div>


              <div className="mt-8 flex flex-col space-y-4 md:mt-0 md:space-y-8 ">

                <div className="group relative flex h-full w-full max-h-[20rem] lg:max-w-[30rem] items-center justify-center">
                  <img
                    className="h-full w-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1608379894453-c6b729b05596?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="shoe-image"
                  />
                  <Button className="absolute bottom-4 z-10 w-36 bg-[#ffffff] shadow-md py-3 text-base font-medium leading-none text-main focus:text-subsec focus:outline-none focus:ring-2 focus:ring-offset-2">
                    Shoes
                  </Button>
                  <div className="absolute bottom-3 z-0 w-36 bg-[#ffffff] shadow-md bg-opacity-50 px-20 py-6 opacity-0 transition duration-500 group-hover:opacity-40" />
                </div>

                <div className="group relative flex h-full w-full max-h-[20rem] lg:max-w-[30rem] items-center justify-center">
                  <img
                    className="h-full w-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80"
                    alt="watch-image"
                  />
                  <Button className="absolute bottom-4 z-10 w-36 bg-[#ffffff] shadow-md py-3 text-base font-medium leading-none text-main focus:text-subsec focus:outline-none focus:ring-2 focus:ring-offset-2">
                    Shoes
                  </Button>
                  <div className="absolute bottom-3 z-0 w-36 bg-[#ffffff] shadow-md bg-opacity-50 px-20 py-6 opacity-0 transition duration-500 group-hover:opacity-40" />
                </div>

              </div>
            </div>
          </div>
          <div className="mt-7 flex justify-center md:mt-10">
            <Button className="w-48  py-4 px-8 text-base  leading-none bg-black text-[#ffffff] font-semibold cursor-pointer hover:bg-black/70 ">
              Explore More
            </Button>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
