import { useState } from 'react';
const accountNavigation = [
  {
    title: 'Account',
    slug: 'account',
  },
  {
    title: 'Address',
    slug: 'address',
  },
  {
    title: 'Orders',
    slug: 'orders',
  },
  {
    title: 'Log Out',
    slug: 'logout',
  },
];
const MyAccountGrid = () => {
  const [selectedMenu, setSelectMenu] = useState('account');

  const handleActive = (type: string) => {
    setSelectMenu(type);
    if (type == 'logout') {
      handleLogout();
    }
  };
  const handleLogout = () => {
    console.log(' logout ');
  };
  return (
    <div className="relative grid grid-cols-12 gap-4 items-center align-middle px-2 md:px-8">
      <div className="w-full h-full col-span-3">
        <MyAccountMenu
          data={accountNavigation}
          selectedMenu={selectedMenu}
          handleActive={handleActive}
        />
      </div>
      <div className="w-full h-full col-span-9">
        <MyAccountMenu
          data={accountNavigation}
          selectedMenu={selectedMenu}
          handleActive={handleActive}
        />
      </div>
    </div>
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
};
const MyAccountMenu = (props: AccountMenuType) => {
  return (
    <div className="relative w-full bg-primary-light h-full flex flex-col gap-4 py-8  px-1 border border-border rounded-2xl shadow-xl  mx-auto font-poppins">
      {/* for bg color */}
      <div className=" flex flex-col gap-2 justify-center items-center">
        <div className="photo-wrapper   h-20 w-20 rounded-full  bg-gradient-to-r from-green-500 via-orange-500 to-yellow-500"></div>
        <div className=" text-text text-xl font-semibold">Sofia Havertz</div>
      </div>
      <ul className="px-2 mt-6">
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
                    : 'text-text-light'
                } text-text-light font-semibold text-base hover:text-text hover:border-b hover:border-text cursor-pointer`}
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
