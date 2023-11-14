import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LoadingDialog } from '~/components/common/loading/loadingModal';
import { Skeleton } from '~/components/ui/skeleton';
import { getPageDetail, getTermsDetail } from '~/server/lib/shopify/query/menu';

const CmsContent = () => {
  const router = useRouter();
  const {
    error,
    data: cmsData,
    loading,
  } = useQuery(getPageDetail, {
    variables: { handle: router?.query?.index },
  });
  const {
    error: termsError,
    data: termsData,
    loading: termsLoading,
  } = useQuery(getTermsDetail, {
    skip: router?.query?.index === 'terms-of-service' ? false : true,
  });
  console.log(termsData?.shop?.termsOfService?.body, 'termsData');
  return (
    <div className="relative  font-poppins">
      <div className="absolute -z-10 bg-secondary min-w-[200px] w-full  max-w-[70%] md:max-w-[80%] h-20 md:h-28 rounded-br-[100px] transform-all ease-in-out duration-300"></div>
      <div className="p-6 md:px-12 my-auto md:-my-2  w-full md:max-w-[50%]  ">
        <div className=" mb-6">
          <p className=" md:block text-xs md:text-sm  py-2 ">
            {`Home > `}
            <span className="capitalize font-[#272D4E]">
              {cmsData?.pageByHandle?.title ??
                termsData?.shop?.termsOfService?.title}
            </span>
          </p>
        </div>
      </div>
      {!termsLoading && !loading ? (
        !termsError && !error ? (
          <div className=" w-full md:w-3/5 mx-auto   px-4 py-12 2xl:container sm:px-6 ">
            <h1 className=" text-2xl font-bold mb-4">
              {cmsData?.pageByHandle?.title ??
                termsData?.shop?.termsOfService?.title}
            </h1>
            <div
              className="  text-base text-left"
              dangerouslySetInnerHTML={{
                __html:
                  cmsData?.pageByHandle?.body ??
                  termsData?.shop?.termsOfService?.body,
              }}
            ></div>
          </div>
        ) : (
          <div className="w-full md:w-1/2 mx-auto  p-8 flex flex-col gap-4 relative">
            No Data Found!
          </div>
        )
      ) : (
        <div className="w-full md:w-1/2 mx-auto  p-8 flex flex-col gap-4 relative">
          <Skeleton className=" h-10 w-1/5 object-cover object-center rounded-md " />
          <Skeleton className=" h-60 w-full object-cover object-center rounded-md " />
        </div>
      )}
      {/* <LoadingDialog open={loading} text="Loading..." /> */}
    </div>
  );
};

export default CmsContent;
