import { Button } from '~/components/ui/button';
import { useState } from 'react';

import CustomerAddressForm from './address-form';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';

import { removeEdgesAndNodes } from '~/utils/helper';
import { AddressDialouge } from '~/components/common/modals/address-modal';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AccountAddressFilterType } from './my-account-grid';

type AccountDetailType = {
  selectedMenu: string;
  customerData: any;
  selectViewTitle: string | undefined;
  refetch: () => unknown;
  filters: AccountAddressFilterType;
  setFilters: (e: any) => unknown;
};
const AccountAddress = (props: AccountDetailType) => {
  const [addAddress, setAddAdress] = useState(null);
  const [addressData, setAddressData] = useState<any>(null);

  console.log(props?.customerData?.addresses?.pageInfo, 'props address data');
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
        <CustomerAddressView
          {...optionData}
          addresses={addresses}
          filters={props?.filters}
          setFilters={props?.setFilters}
          pageInfo={props?.customerData?.addresses?.pageInfo}
        />
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
  filters: AccountAddressFilterType;
  setFilters: (e: AccountAddressFilterType) => unknown;
  pageInfo: any;
};
const addressFields = [
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Company', key: 'company' },
  { label: 'Address1', key: 'address1' },
  { label: 'Address2', key: 'address2' },
];
const addressFields1 = [
  { label: 'City', key: 'city' },
  { label: 'Country', key: 'country' },
  { label: 'Province', key: 'province' },
];
const CustomerAddressView = (props: customerAddressViewType) => {
  const [isModal, setIsModal] = useState(false);
  const [addressID, setAddressId] = useState<string | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  const DeleteAddress = (id: string) => {
    setIsModal(true);
    setAddressId(id);
  };
  const EditAddress = (data: string) => {
    console.log('edit address');
    props?.setAddressData(data);
    props?.setAddAdress('edit');
  };
  const handleNextPage = () => {
    if (props?.pageInfo?.hasNextPage) {
      props?.setFilters((prev: any) => ({
        ...prev,
        customerAccessToken: user?.token_id,
        first: 2,
        last: null,
        after: props?.pageInfo?.endCursor,
        before: null,
      }));
    }
  };

  const handlePrevPage = () => {
    if (props?.pageInfo?.hasPreviousPage) {
      props?.setFilters((prev: any) => ({
        ...prev,
        customerAccessToken: user?.token_id,
        first: null,
        last: 2,
        after: null,
        before: props?.pageInfo?.startCursor,
      }));
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className=" text-text text-xl font-semibold">
          {props?.selectViewTitle}
        </div>
        <Button onClick={() => props?.setAddAdress('add')}>Add Address</Button>
      </div>
      <div className="mt-6 grid grid-cols-1  w-full   gap-4">
        {props?.addresses ? (
          <>
            {props?.addresses?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="relative p-4 border border-border grid grid-cols-1 md:grid-cols-2 justify-between rounded-lg"
                >
                  <div className="w-full h-full  flex flex-col justify-between">
                    {addressFields.map((field) => (
                      <div
                        key={field.key}
                        className="grid grid-cols-2 md:grid-cols-3 my-4 items-center"
                      >
                        <span className="w-fit">{field.label}: </span>
                        <span className="">{item?.[field.key]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-full h-full  flex flex-col justify-between">
                    <div>
                      {addressFields1.map((field) => (
                        <div
                          key={field.key}
                          className="grid grid-cols-2 md:grid-cols-3  items-center my-4"
                        >
                          <div>{field.label}: </div>
                          <div>{item?.[field.key]}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-end    justify-end gap-2 pt-4">
                      <Button
                        onClick={() => EditAddress(item)}
                        className=" h-8"
                      >
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
                </div>
              );
            })}
            <hr />
            <div className="  flex items-center w-full justify-center   gap-2 xsm:gap-8 my-2 ">
              <div className=" flex gap-4 items-center ">
                <Button
                  variant="outline"
                  className="h-9 flex  gap-2  w-max p-2 text-base rounded-lg"
                  onClick={() => handlePrevPage()}
                  disabled={props?.pageInfo?.hasPreviousPage ? false : true}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className=" ">Previous</span>
                </Button>
              </div>
              <div className=" flex gap-4 items-center ">
                <Button
                  variant="outline"
                  className="h-9 flex  gap-2 w-max p-2 text-base rounded-lg"
                  onClick={() => handleNextPage()}
                  disabled={props?.pageInfo?.hasNextPage ? false : true}
                >
                  <span className=" ">Next</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
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
