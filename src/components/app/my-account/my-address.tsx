import { Button } from '~/components/ui/button';
import { useState } from 'react';

import CustomerAddressForm from './address-form';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { useQuery } from '@apollo/client';
import { getCustomerAddressQuery } from '~/server/lib/shopify/query/customer';
import { removeEdgesAndNodes } from '~/utils/helper';
import { AddressDialouge } from '~/components/common/modals/address-modal';

type AccountDetailType = {
  selectedMenu: string;
  customerData: any;
  selectViewTitle: string | undefined;
  refetch: () => unknown;
};
const AccountAddress = (props: AccountDetailType) => {
  const [addAddress, setAddAdress] = useState(null);
  const [addressData, setAddressData] = useState<any>(null);

  const { user } = useSelector((state: RootState) => state.auth);
  console.log({ props }, 'props data');
  // queries & mutations
  const addresses = props?.customerData?.addresses
    ? removeEdgesAndNodes(props?.customerData?.addresses)
    : [];

  const optionData = {
    ...props,
    addAddress,
    setAddAdress,
    refetch: props?.refetch,
    addressData: addressData,
    setAddressData: setAddressData,
  };
  return (
    <div className="relative  font-poppins px-4 py-2">
      {/* for bg color */}
      {!addAddress ? (
        <CustomerAddressView {...optionData} addresses={addresses} />
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
  addresses: any;
  setAddressData: (e: any) => unknown;
  addressData: any;
};
const addressFields = [
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Company', key: 'company' },
  { label: 'Address1', key: 'address1' },
  { label: 'Address2', key: 'address2' },
  { label: 'City', key: 'city' },
  { label: 'Country', key: 'country' },
  { label: 'Province', key: 'province' },
];
const CustomerAddressView = (props: customerAddressViewType) => {
  const [isModal, setIsModal] = useState(false);
  const [addressID, setAddressId] = useState<string | null>(null);
  const DeleteAddress = (id: string) => {
    setIsModal(true);
    setAddressId(id);
  };
  const EditAddress = (data: string) => {
    console.log('edit address');
    props?.setAddressData(data);
    props?.setAddAdress('edit');
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className=" text-text text-xl font-semibold">
          {props?.selectViewTitle}
        </div>
        <Button onClick={() => props?.setAddAdress('add')}>Add Address</Button>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full   gap-4">
        {props?.addresses ? (
          <>
            {props?.addresses?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="relative p-4 border border-border flex flex-col justify-between rounded-lg"
                >
                  <div>
                    {addressFields.map((field) => (
                      <div
                        key={field.key}
                        className="grid grid-cols-2 gap-2 items-center"
                      >
                        {field.label}: <span>{item?.[field.key]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-end   justify-end gap-2 pt-4">
                    <Button onClick={() => EditAddress(item)} className=" h-8">
                      Edit
                    </Button>
                    <Button
                      onClick={() => DeleteAddress(item?.id)}
                      className=" h-8 text-red-500"
                      variant={'outline'}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
      <AddressDialouge
        isModal={isModal}
        setIsModal={setIsModal}
        refetch={props?.refetch}
        data={''}
        title={'Share this Product'}
        addressID={addressID}
      />
    </div>
  );
};
