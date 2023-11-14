import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LoadingDialog } from '~/components/common/loading/loadingModal';
import { Skeleton } from '~/components/ui/skeleton';
import { getPageDetail } from '~/server/lib/shopify/query/menu';

const CmsContent = () => {
  const router = useRouter();
  const {
    error,
    data: cmsData,
    loading,
  } = useQuery(getPageDetail, {
    variables: { handle: router?.query?.index },
  });
  return (
    <>
      {!loading ? (
        !error ? (
          <div className=" w-full md:w-1/2 mx-auto  p-8">
            <h1 className=" text-2xl font-bold mb-4">
              {cmsData?.pageByHandle?.title}
            </h1>
            <div
              className=" text-text-gray text-base text-left"
              dangerouslySetInnerHTML={{
                __html: cmsData?.pageByHandle?.body,
              }}
            ></div>
          </div>
        ) : (
          <>No Data Found</>
        )
      ) : (
        <div className="w-full md:w-1/2 mx-auto  p-8 flex flex-col gap-4 relative">
          <Skeleton className=" h-10 w-1/5 object-cover object-center rounded-md " />
          <Skeleton className=" h-60 w-full object-cover object-center rounded-md " />
        </div>
      )}
      {/* <LoadingDialog open={loading} text="Loading..." /> */}
    </>
  );
};

export default CmsContent;
