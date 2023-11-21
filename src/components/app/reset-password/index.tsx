import StaticBanner from '~/components/common/static-banner-card';
import ResetPass from '~/public/assets/pass.webp';
import ResetPasswordForm from './reset-form';

const ResetPasswordSection = () => {
  return (
    <>
      <div className="relative  font-poppins min-h-screen">
        {/* for bg color */}
        <div className="absolute -z-10 bg-secondary min-w-[200px] w-full  max-w-[70%] md:max-w-[80%] h-20 md:h-28 rounded-br-[100px] transform-all ease-in-out duration-300"></div>
        {/* <BannerCard banner={undefined} key={1} type="product-listing" /> */}
        <StaticBanner
          type="reset"
          key={1}
          data={{
            title: 'Reset account password',
            slug: 'Reset Account',
            description:
              'Small Batch Bars of Soap. Made with the freshest ingredients for a rich and soft lather that will leave your skin feeling silky smooth!!',
            src: ResetPass.src,
          }}
        />
        <ResetPasswordForm />
        <div className="py-8" />
      </div>
    </>
  );
};

export default ResetPasswordSection;
