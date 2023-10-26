import { removeEdgesAndNodes } from '~/utils/helper';

const Detail = (props: any) => {
  const variants = props?.data?.variants?.edges
    ? removeEdgesAndNodes(props?.data?.variants)
    : [];
  console.log(variants, 'props?.data');
  return <div className="  p-4">{props?.data?.title}</div>;
};

export default Detail;
