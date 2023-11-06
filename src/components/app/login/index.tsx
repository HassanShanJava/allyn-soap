import BannerCard from '~/components/common/banner-card';
import LoginForm from './login-form';

const LoginSection = () => {
  return (
    <>
      <div className="relative  font-poppins">
        {/* for bg color */}
        <div className="absolute -z-10 bg-secondary min-w-[200px] w-full  max-w-[70%] md:max-w-[80%] h-20 md:h-28 rounded-br-[100px] transform-all ease-in-out duration-300"></div>
        <BannerCard banner={undefined} key={1} type="product-listing" />
        <LoginForm />
        <div className="py-4" />
      </div>
    </>
  );
};

export default LoginSection;
