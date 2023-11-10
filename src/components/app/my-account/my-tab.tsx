import { accountNavigation } from './my-account-grid';
import AccountAddress from './my-address';
import AccountOrders from './my-orders';

type AccountViewType = {
  selectedMenu: string;
  customerData: any;
  refetch: () => unknown;
};
const MyAccountView = (props: AccountViewType) => {
  const selectViewTitle = accountNavigation.find(
    (item) => item?.slug === props?.selectedMenu,
  )?.view_title;
  return (
    <>
      {props?.selectedMenu === 'account' ? (
        <AccountDetail
          selectViewTitle={selectViewTitle}
          customerData={props?.customerData}
          selectedMenu={props?.selectedMenu}
        />
      ) : props?.selectedMenu === 'address' ? (
        <AccountAddress
          selectViewTitle={selectViewTitle}
          customerData={props?.customerData}
          selectedMenu={props?.selectedMenu}
          refetch={props?.refetch}
        />
      ) : (
        <AccountOrders
          selectViewTitle={selectViewTitle}
          selectedMenu={props?.selectedMenu}
          refetch={props?.refetch}
        />
      )}
    </>
  );
};
type AccountDetailType = {
  selectedMenu: string;
  customerData: any;
  selectViewTitle: string | undefined;
};
const AccountDetail = (props: AccountDetailType) => {
  return (
    <div className="relative  font-poppins px-4 py-2">
      {/* for bg color */}
      <div className=" text-text text-xl font-semibold">
        {props?.selectViewTitle}
      </div>
      <div className="mt-6 grid grid-cols-2 w-full md:w-1/4 gap-4">
        <div>Name:</div>
        <div className=" capitalize">{props?.customerData?.displayName}</div>
      </div>
      <div className="mt-6 grid grid-cols-2 w-full md:w-1/4 gap-4">
        <div>Email:</div>
        <div className=" ">{props?.customerData?.email}</div>
      </div>
    </div>
  );
};
export default MyAccountView;
