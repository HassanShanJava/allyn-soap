import { useState } from 'react';

import { useSelector } from 'react-redux';
import { Button } from '~/components/ui/button';
import { RootState } from '~/store/store';

type AccountOrdersType = {
  selectedMenu: string;
  selectViewTitle: string | undefined;
  refetch: () => unknown;
};
const AccountOrders = (props: AccountOrdersType) => {
  const { user } = useSelector((state: RootState) => state.auth);
  console.log({ props }, 'props data orders');

  return (
    <div className="relative  font-poppins px-4 py-2">
      <div className="flex items-center justify-between">
        <div className=" text-text text-xl font-semibold">
          {props?.selectViewTitle}
        </div>
      </div>
    </div>
  );
};

export default AccountOrders;
