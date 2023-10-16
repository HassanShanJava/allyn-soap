'use client';
import { StarIcon } from '@heroicons/react/20/solid';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { productsData } from 'data';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

// import required modules

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function generateStarRatingArray(rating: number) {
  const ratings = [];
  for (let i = 1; i <= 5; i++) {
    ratings.push(i <= rating ? 'orange' : 'gray');
  }
  return ratings;
}

const BestSellingProducts =  (props:any) => {
  console.log({props})
  return (
    <section id="best-sellers" className="bg-subsec px-3 py-20 md:px-12">
      <div className="text-center">
        <p className="text-lg text-sub md:text-xl">Check Our</p>
        <h3 className="mb-7 text-2xl font-bold text-main md:mb-10 md:text-3xl">
          Best Selling Products
        </h3>
      </div>
      <Swiper
        slidesPerView={4}
        loop={true}
        dir="rtl"
        pagination={{
          clickable: true
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 5
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 8
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10
          }
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {productsData.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="group relative p-2 hover:bg-text">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-text lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div className="grid justify-items-start">
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                  <div className="flex justify-center">
                    {generateStarRatingArray(product.rating).map((color, index) => (
                      <StarIcon
                        key={index}
                        className={classNames(
                          color === 'orange' ? 'text-orange-400' : 'text-gray-200',
                          'h-4 w-4 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <div className="grid justify-items-end">
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BestSellingProducts;
