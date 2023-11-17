import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutMutation } from '~/server/lib/shopify/mutations/auth';
import { toggleAuth } from '~/store/reducers/auth';
import { RootState } from '~/store/store';
import { deleteCookie } from 'cookies-next';
import { getCustomerQuery } from '~/server/lib/shopify/query/customer';
import MyAccountView from './my-tab';
import { LoadingDialog } from '~/components/common/loading/loadingModal';
export const accountNavigation = [
  {
    title: 'Account',
    view_title: 'Account Details',
    slug: 'account',
  },
  {
    title: 'Address',
    view_title: 'Details Address',

    slug: 'address',
  },
  {
    title: 'Orders',
    view_title: 'Orders History',
    slug: 'orders',
  },
  {
    title: 'Log Out',
    view_title: 'Orders History',

    slug: 'logout',
  },
];
export type AccountAddressFilterType = {
  customerAccessToken: string | null;
  first: number | null;
  last: number | null;
  after: string | null;
  before: string | null;
};
const MyAccountGrid = () => {
  // states
  const [selectedMenu, setSelectMenu] = useState('account');
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const [filters, setFilters] = useState<AccountAddressFilterType>({
    customerAccessToken: user?.token_id,
    first: 2,
    last: null,
    after: null,
    before: null,
  });
  // queries & mutations
  const {
    data: customerData,
    loading,
    refetch,
  } = useQuery(getCustomerQuery, {
    variables: { ...filters },
    skip: user?.token_id ? false : true,
  });
  const [customerLogout] = useMutation(LogoutMutation);
  console.log({ customerData });
  // useEffect
  useEffect(() => {
    setFilters({
      customerAccessToken: user?.token_id,
      first: 2,
      last: null,
      after: null,
      before: null,
    });
    // refetch();
  }, [user?.token_id]);

  // functions
  const handleActive = (type: string) => {
    setSelectMenu(type);
    setFilters({
      customerAccessToken: user?.token_id,
      first: 2,
      last: null,
      after: null,
      before: null,
    });
    if (type == 'logout') {
      handleLogout();
    }
  };
  const handleLogout = async () => {
    // router.replace('/');
    // router.reload();
    const customerLogoutData = await customerLogout({
      variables: {
        customerAccessToken: user?.token_id,
      },
    });
    if (
      customerLogoutData?.data?.customerAccessTokenDelete?.deletedAccessToken
    ) {
      deleteCookie('allynssoapco_token');
      dispatch(
        toggleAuth({
          token_id: null,
          is_login: false,
          user: null,
        }),
      );
      if (window) window.location.href = '/';
    }
  };
  return (
    <>
      <div className="relative grid grid-cols-12 gap-4 items-start align-middle px-2 md:px-8">
        <div className="w-full h-max col-span-12 md:col-span-3 px-4 md:px-2">
          <MyAccountMenu
            data={accountNavigation}
            selectedMenu={selectedMenu}
            handleActive={handleActive}
            customerData={customerData?.customer}
          />
        </div>
        <div className="w-full h-full col-span-12 md:col-span-9">
          <MyAccountView
            selectedMenu={selectedMenu}
            customerData={customerData?.customer}
            refetch={refetch}
            filters={filters}
            setFilters={setFilters}
          />

          {/* <MyAccountMenu
          data={accountNavigation}
          selectedMenu={selectedMenu}
          handleActive={handleActive}
        /> */}
        </div>
      </div>
      <LoadingDialog open={loading} text="Loading..." />
    </>
  );
};
type accountDataType = {
  title: string;
  slug: string;
};
type AccountMenuType = {
  data: accountDataType[];
  selectedMenu: string;
  handleActive: (type: string) => unknown;
  customerData: any;
};
const MyAccountMenu = (props: AccountMenuType) => {
  return (
    <div className="relative w-full bg-primary-light h-full flex flex-col gap-4 py-8  px-1 border border-border rounded-2xl shadow-xl  mx-auto font-poppins">
      {/* for bg color */}
      <div className=" flex flex-col gap-2 justify-center items-center capitalize">
        <div className="photo-wrapper relative text-center flex items-center justify-center   h-20 w-20 rounded-full   bg-border  ">
          <i className="fa-solid fa-user text-center text-text-gray text-3xl"></i>
        </div>
        <div className=" text-text text-xl font-semibold">
          {props?.customerData?.displayName}
        </div>
      </div>
      <ul className="px-2 mt-6 space-y-2">
        {props?.data &&
          props?.data.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  props?.handleActive(item?.slug);
                }}
                className={`p-2 ${
                  props?.selectedMenu == item?.slug
                    ? 'text-text border-b border-text'
                    : 'text-text-light border-b border-transparent'
                } text-text-light font-semibold text-base  hover:text-text hover:border-b hover:border-text cursor-pointer`}
              >
                {item?.title}
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default MyAccountGrid;
