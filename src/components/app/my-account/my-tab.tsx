import Image from 'next/image';
import { AccountAddressFilterType, accountNavigation } from './my-account-grid';
import AccountAddress from './my-address';
import AccountOrders from './my-orders';
import MyAccount from '~/public/assets/Illustration.svg';

type AccountViewType = {
  selectedMenu: string;
  customerData: any;
  refetch: () => unknown;
  filters: AccountAddressFilterType;
  setFilters: (e: AccountAddressFilterType) => unknown;
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
          filters={props?.filters}
          setFilters={props?.setFilters}
        />
      ) : props?.selectedMenu === 'orders' ? (
        <AccountOrders
          selectViewTitle={selectViewTitle}
          selectedMenu={props?.selectedMenu}
          refetch={props?.refetch}
        />
      ) : (
        <></>
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
    <div className="relative  font-poppins px-4 py-2 w-full h-full ">
      {/* for bg color */}
      <div className=" text-text text-xl font-semibold">
        {props?.selectViewTitle}
      </div>
      <div className="mt-6 flex gap-6 w-full md:w-1/4  items-center">
        <div>Name:</div>
        <div className=" capitalize">{props?.customerData?.displayName}</div>
      </div>
      <div className="mt-6 flex gap-6 w-full md:w-1/4  items-center">
        <div>Email:&nbsp; </div>{' '}
        <div className=" ">{props?.customerData?.email}</div>
      </div>

      <Image className="  relative ml-auto" src={MyAccount} alt="this image" />
    </div>
  );
};
export default MyAccountView;
