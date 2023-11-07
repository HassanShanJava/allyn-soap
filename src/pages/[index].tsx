import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LoadingDialog } from '~/components/common/loading/loadingModal';
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
            <h1 className=" text-2xl font-bold">
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
        <></>
      )}
      <LoadingDialog open={loading} text="Loading..." />
    </>
  );
};

export default CmsContent;
