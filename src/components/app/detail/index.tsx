import { useRouter } from 'next/router';
import Detail from './detail';
import { getProductQuery } from '~/server/lib/shopify/query/product';
import { useQuery } from '@apollo/client';
import DescriptionSkeleton from '~/components/common/skeleton/description-skeleton';
import DetailSlider from './slider';
import { useEffect, useState } from 'react';

import { ReviewDialog } from '~/components/common/modals/review-modal';
import ReveiewContent from './review';
import RelatedProducts from './related-products';
const DetailPage = () => {
  const router = useRouter();

  const id = router?.query?.id ?? '';
  const [reviews, setReviews] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const {
    error,
    data: productData,
    loading,
  } = useQuery(getProductQuery, {
    variables: { handle: id },
  });
  useEffect(() => {
    if (!loading && !error && productData?.product) {
      const dataID = productData?.product?.id?.split('/');
      const url = `https://api-cdn.yotpo.com/v1/widget/${
        process.env.NEXT_PUBLIC_SHOPIFY_REVIEW
      }/products/${dataID[dataID.length - 1]}/reviews.jsons`;
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => setReviews(json))
        .catch((err) => console.error('error:' + err));
    }
  }, [productData?.product]);
  console.log({ router });
  return (
    <>
      <div className="relative  font-poppins ">
        <div className="absolute -z-10 bg-secondary min-w-[200px] w-full  max-w-[70%] md:max-w-[80%] h-8  rounded-br-[250px] transform-all ease-in-out duration-300"></div>

        {productData?.product && (
          <p className=" text-xs text-text-gray  md:text-sm  md:px-12 pt-16">
            {`Home > `}
            {`Detail > `}
            <span className="capitalize text-text">
              {(productData?.product?.title as string).split('-').join(' ')}
            </span>
          </p>
        )}
        {!loading ? (
          <div className="relative w-full px-4 py-12 2xl:container sm:px-6  ">
            <div className="relative grid grid-cols-12 gap-2">
              <div className="col-span-12 md:col-span-6 relative     ">
                {false ? (
                  <>Slider</>
                ) : (
                  <DetailSlider data={productData?.product} />
                )}
              </div>
              <div className="col-span-12 md:col-span-6">
                {false ? (
                  <>Detail</>
                ) : (
                  <Detail
                    data={productData?.product}
                    reviews={reviews}
                    shop={productData?.shop}
                  />
                )}
              </div>
              <div className="col-span-12 space-y-8 my-8">
                <ReveiewContent
                  data={productData?.product}
                  isModal={isModal}
                  setIsModal={setIsModal}
                  reviews={reviews}
                />
                <RelatedProducts dataID={productData?.product?.id} />
              </div>
            </div>
          </div>
        ) : (
          <DescriptionSkeleton />
        )}
      </div>
      <ReviewDialog
        title={'add a reveiew'}
        type={'review'}
        isModal={isModal}
        data={productData?.product}
        setIsModal={setIsModal}
      />
      {/* <LoadingDialog open={loading} text="Loading..." /> */}
    </>
  );
};

export default DetailPage;
