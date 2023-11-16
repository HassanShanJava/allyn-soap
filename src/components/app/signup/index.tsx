import RegisterForm from './register-form';
import StaticBanner from '~/components/common/static-banner-card';
import SignUp from '~/public/assets/sign_up.jpg';

const SignupSection = () => {
  return (
    <>
      <div className="relative  font-poppins">
        {/* for bg color */}
        <div className="absolute -z-10 bg-secondary min-w-[200px] w-full  max-w-[70%] md:max-w-[80%] h-20 md:h-28 rounded-br-[100px] transform-all ease-in-out duration-300"></div>
        <StaticBanner
          type="signup"
          key={1}
          data={{
            title: 'Sign up your Account',
            slug: 'Create Account',
            description:
              'Small Batch Bars of Soap. Made with the freshest ingredients for a rich and soft lather that will leave your skin feeling silky smooth!!',
            src: SignUp.src,
          }}
        />
        <RegisterForm />
        <div className="py-8" />
      </div>
    </>
  );
};

export default SignupSection;
