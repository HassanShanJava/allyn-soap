import CategorySection from './category_section';
import BannerSection from './banner_section';
import RelatedProducts from './related_product';
import ArrivalSection from './arrival_section';
import CustomerTestimonials from '~/components/common/customer-testimonials';
import { useRouter } from 'next/router';
import CompressImage from '~/components/common/compress_image';

const demoList = [
  {
    heading: 'Plant based & Handmade daily',
    desc: 'Discover your perfect scent, handcrafted in a Makery near you.',
    image:
      'https://images.unsplash.com/photo-1697560985980-dc45109f83ef?auto=format&fit=crop&q=80&w=870&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/',
  },
  {
    heading: 'Plant based & Handmade daily 1',
    desc: 'Discover your perfect scent, handcrafted in a Makery near you. 1',
    image:
      'https://images.unsplash.com/photo-1697560948381-8563d45c971e?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/',
  },
  {
    heading: 'Plant based & Handmade daily 2',
    desc: 'Discover your perfect scent, handcrafted in a Makery near you. 2',
    image:
      'https://images.unsplash.com/photo-1585287706739-d4e0560d3096?auto=format&fit=crop&q=80&w=2672&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/',
  },
  {
    heading: 'Plant based & Handmade daily 3',
    desc: 'Discover your perfect scent, handcrafted in a Makery near you.',
    image:
      'https://images.unsplash.com/photo-1697560985980-dc45109f83ef?auto=format&fit=crop&q=80&w=870&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/',
  },
];

const Home = () => {
  return (
    <>
      <div className="relative  font-poppins">
        {/* for bg color */}
        <div className="absolute -z-10 bg-secondary min-w-[200px] w-full  max-w-[70%] md:max-w-[80%] h-20 md:h-48 rounded-br-[100px] transform-all ease-in-out duration-300"></div>

        <BannerSection />

        <CategorySection />
        <RelatedProducts />
        {/* <CompressImage/> */}
        <ArrivalSection />
        <CustomerTestimonials />
      </div>
    </>
  );
};

export default Home;
