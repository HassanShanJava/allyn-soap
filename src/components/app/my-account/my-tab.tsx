import { accountNavigation } from './my-account-grid';

type AccountViewType = {
  selectedMenu: string;
  customerData: any;
};
const MyAccountView = (props: AccountViewType) => {
  const selectViewTitle = accountNavigation.find(
    (item) => item?.slug === props?.selectedMenu,
  );
  return (
    <div className="relative  font-poppins px-4 py-2">
      {/* for bg color */}
      <div className=" text-text text-xl font-semibold">
        {selectViewTitle?.view_title}
      </div>
      <div className=" grid grid-cols-2 md:w-1/4 gap-4">
        <div>Name:</div>
        <div className="redux">{props?.customerData?.displayName}</div>
        <div>Location:</div>
        <div>United States</div>
      </div>
    </div>
  );
};

export default MyAccountView;
