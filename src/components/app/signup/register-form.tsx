import { Button } from '~/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '~/components/ui/use-toast';
import { signupCustomerSchema } from '~/schema/customer';
import { useState } from 'react';
import {
  CartUpdateMutation,
  LoginMutation,
  SignUpMutation,
} from '~/server/lib/shopify/mutations/auth';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { loginToken } from '~/utils/helper';
import { toggleAuth } from '~/store/reducers/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';

const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { cart } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof signupCustomerSchema>>({
    resolver: zodResolver(signupCustomerSchema),
  });
  const [customerAdd, { loading: customerAddLoading }] =
    useMutation(SignUpMutation);
  const [customerLogin, { loading: customerLoginLoading }] =
    useMutation(LoginMutation);

  const [customerCartUpdate, { loading: customerCustomerUpdateLoading }] =
    useMutation(CartUpdateMutation);
  async function onSubmit(values: z.infer<typeof signupCustomerSchema>) {
    try {
      setLoading(true);
      const customerAddData = await customerAdd({
        variables: {
          ...values,
        },
      });
      if (!customerAddData?.data?.customerCreate?.customer)
        throw new Error(`Customer Already Registered with following email.`);
      const customerLoginData = await customerLogin({
        variables: {
          ...values,
        },
      });

      if (
        !customerLoginData?.data?.customerAccessTokenCreate?.customerAccessToken
      )
        throw new Error(`User not found.`);
      const storeToken = await loginToken(
        customerLoginData?.data?.customerAccessTokenCreate?.customerAccessToken,
      );

      if (storeToken) {
        dispatch(
          toggleAuth({
            token_id:
              customerLoginData?.data?.customerAccessTokenCreate
                ?.customerAccessToken?.accessToken,
            is_login: true,
            user: null,
          }),
        );
        if (cart?.cart_id && !cart?.cart?.buyerIdentity?.customer) {
          const customerCartData = await customerCartUpdate({
            variables: {
              cartId: cart?.cart_id,
              customerAccessToken:
                customerLoginData?.data?.customerAccessTokenCreate
                  ?.customerAccessToken?.accessToken,
            },
          });
        }
        toast({
          variant: 'success',
          title: 'Registered Successfully!',
        });

        setLoading(false);
        router.push('/');
      }
    } catch (error: any) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: error.message,
      });
    }
  }
  return (
    <div className="px-4">
      <div className="relative flex flex-col gap-4  p-8  border border-border rounded-3xl shadow-xl w-fit max-w-[30rem] mx-auto font-poppins text-text">
        {/* for bg color */}
        <h1 className=" text-2xl md:text-3xl font-bold text-text">Sign up</h1>
        <p className=" text-sm md:text-base text-text-light">
          Small Batch Bars of Soap. Made with the freshest ingredients for a
          rich.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="justify-center items-center  py-4 "
          >
            <FormField
              control={form.control}
              name="firstName"
              render={() => (
                <FormItem className=" w-full ">
                  <FormControl>
                    <Input
                      type="text"
                      className="bg-text-light-secondary border-none focus:outline-none"
                      autoFocus={false}
                      placeholder="First Name"
                      {...form.register('firstName')}
                    />
                  </FormControl>
                  <div className="relative pb-4 ">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={() => (
                <FormItem className=" w-full ">
                  <FormControl>
                    <Input
                      type="text"
                      className="bg-text-light-secondary border-none focus:outline-none"
                      autoFocus={false}
                      placeholder="Last Name"
                      {...form.register('lastName')}
                    />
                  </FormControl>
                  <div className="relative pb-4 ">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={() => (
                <FormItem className=" w-full ">
                  <FormControl>
                    <Input
                      type="email"
                      className="bg-text-light-secondary border-none focus:outline-none"
                      autoFocus={false}
                      placeholder="Email"
                      {...form.register('email')}
                    />
                  </FormControl>
                  <div className="relative pb-4 ">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className=" w-full ">
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-text-light-secondary border-none focus:outline-none"
                      autoFocus={false}
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <div className="relative pb-4">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                'Sign Up'
              )}

              {/* {props?.id ? 'Update' : 'Add'} */}
            </Button>

            <Link href={'/login'}>
              <p className="text-center mt-8 text-sm underline text-text-light cursor-pointer">
                Already have an Account
              </p>
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
