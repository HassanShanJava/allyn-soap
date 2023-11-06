import BannerCard from '~/components/common/banner-card';
import LoginForm from './login-form';
import StaticBanner from '~/components/common/static-banner-card';
import SignIn from '~/public/assets/Signin.jpg';

const LoginSection = () => {
  return (
    <>
      <div className="relative  font-poppins">
        {/* for bg color */}
        <div className="absolute -z-10 bg-secondary min-w-[200px] w-full  max-w-[70%] md:max-w-[80%] h-20 md:h-28 rounded-br-[100px] transform-all ease-in-out duration-300"></div>
        {/* <BannerCard banner={undefined} key={1} type="product-listing" /> */}
        <StaticBanner
          type="signup"
          key={1}
          data={{
            title: 'Sign in your Account',
            slug: 'Sign in',
            description:
              'Small Batch Bars of Soap. Made with the freshest ingredients for a rich and soft lather that will leave your skin feeling silky smooth!!',
            src: SignIn.src,
          }}
        />
        <LoginForm />
        <div className="py-8" />
      </div>
    </>
  );
};

export default LoginSection;
