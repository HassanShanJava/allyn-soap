import { Button } from '~/components/ui/button';
import { useState } from 'react';

import CustomerAddressForm from './address-form';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { useQuery } from '@apollo/client';
import { getCustomerAddressQuery } from '~/server/lib/shopify/query/customer';

type AccountDetailType = {
  selectedMenu: string;
  customerData: any;
  selectViewTitle: string | undefined;
};
const AccountAddress = (props: AccountDetailType) => {
  const [addAddress, setAddAdress] = useState(null);

  // queries & mutations

  const optionData = {
    ...props,
    addAddress,
    setAddAdress,
  };
  return (
    <div className="relative  font-poppins px-4 py-2">
      {/* for bg color */}
      {!addAddress ? (
        <CustomerAddressView {...optionData} />
      ) : (
        <CustomerAddressForm {...optionData} />
      )}
    </div>
  );
};

export default AccountAddress;
type customerAddressViewType = AccountDetailType & {
  addAddress: string | null;
  setAddAdress: any;
};
const CustomerAddressView = (props: customerAddressViewType) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className=" text-text text-xl font-semibold">
          {props?.selectViewTitle}
        </div>
        <Button onClick={() => props?.setAddAdress('addAdress')}>
          Add Address
        </Button>
      </div>
      <div className="mt-6 grid grid-cols-2 w-full md:w-1/4 gap-4">
        <div>Name:</div>
        <div className=" capitalize">{props?.customerData?.displayName}</div>
      </div>
    </div>
  );
};
