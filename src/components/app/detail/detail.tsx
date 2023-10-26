const Detail = (props: any) => {
  console.log(props?.data, 'props?.data');
  return <div className="  p-4">{props?.data?.title}</div>;
};

export default Detail;
