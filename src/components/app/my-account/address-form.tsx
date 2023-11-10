import { Button } from '~/components/ui/button';
import { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
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
import { Checkbox } from '~/components/ui/checkbox';
import {
  AddCustomerAddressQuery,
  EditCustomerAddressQuery,
} from '~/server/lib/shopify/mutations/address';
import { useMutation } from '@apollo/client';
import { RootState } from '~/store/store';
import { useSelector } from 'react-redux';

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
  addAddress: string | null;
  setAddAdress: any;
  refetch: () => unknown;
  setAddressData: (e: any) => unknown;
  addressData: any;
};
const CustomerAddressForm = (props: AccountDetailType) => {
  // states
  const { toast } = useToast();
  const [provinces, setProvinces] = useState<any>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  const form = useForm<z.infer<typeof CustomerAddressSchema>>({
    resolver: zodResolver(CustomerAddressSchema),
    defaultValues: {
      country: 'United States',
    },
  });

  // mutation apis
  const [addAddress, { loading: addAddressLoading }] = useMutation(
    AddCustomerAddressQuery,
  );
  const [editAddress, { loading: editAddressLoading }] = useMutation(
    EditCustomerAddressQuery,
  );

  // use Effects
  useEffect(() => {
    if (props?.addAddress === 'edit') {
      form.setValue('firstName', props?.addressData?.firstName);
      form.setValue('lastName', props?.addressData?.lastName);
      form.setValue('company', props?.addressData?.company);
      form.setValue('address1', props?.addressData?.address1);
      form.setValue('address2', props?.addressData?.address2);
      form.setValue('city', props?.addressData?.city);
      form.setValue('country', props?.addressData?.country);
      form.setValue('province', props?.addressData?.province);
      form.setValue('zip', props?.addressData?.zip);
      form.setValue('phone', props?.addressData?.phone);
    }
  }, [props?.addressData, props?.addAddress === 'edit']);
  useEffect(() => {
    const countryname = form.watch('country') ?? 'United States';
    const selectCountry: any = CountriesData.countries?.find(
      (item) => item?.name === countryname,
    );
    if (selectCountry && selectCountry?.provinces.length > 0) {
      setProvinces(selectCountry?.provinces as any);

      // form.setValue('province', selectCountry?.provinces[0]?.name);
    } else {
      setProvinces(null);
    }
  }, [form.watch('country')]);

  // submit function
  async function onSubmit(values: z.infer<typeof CustomerAddressSchema>) {
    try {
      console.log({ values });
      let customerAddressData;
      if (props?.addAddress == 'add') {
        customerAddressData = await addAddress({
          variables: {
            customerAccessToken: user?.token_id,
            address: { ...values },
          },
        });
      } else {
        customerAddressData = await editAddress({
          variables: {
            customerAccessToken: user?.token_id,
            id: props?.addressData?.id,
            address: { ...values },
          },
        });
      }

      toast({
        variant: 'success',
        title: `Address  ${
          props?.addAddress == 'add' ? 'added' : 'edited'
        } Successfully`,
      });
      props?.setAddAdress(null);
      props?.setAddressData(null);
      props?.refetch();
      console.log({ customerAddressData });
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
          <div className="grid  grid-cols-2 gap-4 ">
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
                          {...field}
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
                          {...field}
                          defaultValue={provinces[0]?.name}
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
          <div className="grid  grid-cols-2 gap-4">
            <div className="w-full flex items-center gap-2 ">
              <Checkbox
                id="terms"
                className="h-5 w-5 bg-text-light-secondary border-none"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Set as default address
              </label>
            </div>
            <Button
              type="submit"
              className="w-full h-12"
              disabled={addAddressLoading || editAddressLoading}
            >
              {addAddressLoading || editAddressLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : props?.addAddress === 'add' ? (
                'Add  Address'
              ) : (
                'Edit  Address'
              )}

              {/* {props?.id ? 'Update' : 'Add'} */}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CustomerAddressForm;
