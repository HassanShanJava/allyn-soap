import { Button } from '~/components/ui/button';
import { accountNavigation } from './my-account-grid';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { loginCustomerSchema } from '~/schema/customer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '~/components/ui/use-toast';
import CountriesData from '~/data/countries.json';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { CustomerAddressSchema } from '~/schema/address';

const formSchema = [
  {
    type: 'text',
    name: 'firstName',
    label: 'firstName',

    placeholder: 'Please Enter First Name',
  },
  {
    type: 'text',
    name: 'lastName',
    label: 'lastName',

    placeholder: 'Please Enter Last Name',
  },
  {
    type: 'text',
    name: 'company',
    label: 'company',

    placeholder: 'Please Enter Company',
  },

  {
    type: 'text',
    name: 'address1',
    label: 'address1',

    placeholder: 'Please Enter Address 1',
  },
  {
    type: 'text',
    name: 'address2',
    label: 'address2',

    placeholder: 'Please Enter Address 2',
  },

  {
    type: 'text',
    name: 'city',
    label: 'city',

    placeholder: 'Please Enter City',
  },
  {
    type: 'select',
    name: 'country',
    label: 'city',

    placeholder: 'Please Enter Country',
  },
  {
    type: 'select',
    name: 'province',
    label: 'province',

    placeholder: 'Please Enter Country',
  },
  {
    type: 'text',
    name: 'zip',
    label: 'zip',

    placeholder: 'Postal/Zip Code',
  },
  {
    type: 'text',
    name: 'phone',
    label: 'phone',

    placeholder: 'Phone',
  },
];

type AccountDetailType = {
  selectedMenu: string;
  customerData: any;
  selectViewTitle: string | undefined;
};
const AccountAddress = (props: AccountDetailType) => {
  const [addAddress, setAddAdress] = useState(null);
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
const CustomerAddressForm = (props: customerAddressViewType) => {
  const { toast } = useToast();
  const [provinces, setProvinces] = useState<any>(null);
  const form = useForm<z.infer<typeof CustomerAddressSchema>>({
    resolver: zodResolver(CustomerAddressSchema),
    defaultValues: {
      country: 'United States',
    },
  });
  useEffect(() => {
    const countryname = form.watch('country');
    const selectCountry = CountriesData.countries?.find(
      (item) => item?.name === countryname,
    );
    if (selectCountry && selectCountry?.provinces.length > 0) {
      setProvinces(selectCountry?.provinces as any);

      form.setValue('province', selectCountry?.provinces[0]?.name);
    } else {
      setProvinces(null);
    }
  }, [form.watch('country')]);
  async function onSubmit(values: z.infer<typeof CustomerAddressSchema>) {
    try {
      console.log({ values });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: error.message,
      });
    }
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className=" text-text text-xl font-semibold">Add Address</div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="justify-center items-center  py-4 "
        >
          <div className="grid  grid-cols-2 gap-2 ">
            {formSchema.map((item: any, i: number) => {
              if (item?.type == 'text') {
                return (
                  <FormField
                    key={i}
                    control={form.control}
                    name={item?.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type={'text'}
                            placeholder={item?.placeholder}
                            {...form.register(item.name)}
                            className="bg-text-light-secondary"
                          />
                        </FormControl>

                        <div className="relative pb-4">
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                );
              }
              if (item?.name == 'country') {
                return (
                  <FormField
                    key={i}
                    control={form.control}
                    name={item?.name}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value + ''}
                          defaultValue="United States"
                        >
                          <FormControl>
                            <SelectTrigger className=" h-10  bg-text-light-secondary">
                              <SelectValue placeholder={'Select Country'} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background  h-80">
                            <SelectGroup>
                              {CountriesData?.countries &&
                                CountriesData?.countries?.map(
                                  (item: any, index: number) => {
                                    return (
                                      <div key={index}>
                                        <SelectItem
                                          value={(item?.name).toString()}
                                        >
                                          {item?.name}
                                        </SelectItem>
                                      </div>
                                    );
                                  },
                                )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <div className="relative pb-4">
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                );
              }
              if (
                item?.name == 'province' &&
                provinces &&
                provinces?.length > 0
              ) {
                return (
                  <FormField
                    key={i}
                    control={form.control}
                    name={item?.name}
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value + ''}
                        >
                          <FormControl>
                            <SelectTrigger className=" h-10  bg-text-light-secondary">
                              <SelectValue placeholder={'Select Province'} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background max-h-80">
                            <SelectGroup>
                              {provinces &&
                                provinces?.map((item: any, index: number) => {
                                  return (
                                    <div key={index}>
                                      <SelectItem
                                        value={(item?.name).toString()}
                                      >
                                        {item?.name}
                                      </SelectItem>
                                    </div>
                                  );
                                })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <div className="relative pb-4">
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                );
              }
            })}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-full"></div>
            <Button type="submit" className="w-full h-12" disabled={false}>
              {false ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                'Add  Address'
              )}

              {/* {props?.id ? 'Update' : 'Add'} */}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
