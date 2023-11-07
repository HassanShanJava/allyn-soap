import { Button } from '~/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '~/components/ui/use-toast';
import { loginCustomerSchema } from '~/schema/customer';
import { useState } from 'react';
import {
  LoginMutation,
  SignUpMutation,
} from '~/server/lib/shopify/mutations/auth';
import { useMutation } from '@apollo/client';
import { loginToken } from '~/utils/helper';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof loginCustomerSchema>>({
    resolver: zodResolver(loginCustomerSchema),
  });
  const [customerLogin, { loading: customerLoginLoading }] =
    useMutation(LoginMutation);

  async function onSubmit(values: z.infer<typeof loginCustomerSchema>) {
    try {
      setLoading(true);
      const customerLoginData = await customerLogin({
        variables: {
          ...values,
        },
      });
      console.log({ customerLoginData });
      if (
        !customerLoginData?.data?.customerAccessTokenCreate?.customerAccessToken
      )
        throw new Error(`Something Went Wrong.`);
      const storeToken = await loginToken(
        customerLoginData?.data?.customerAccessTokenCreate?.customerAccessToken,
      );
      if (storeToken) {
        toast({
          variant: 'success',
          title: 'Customer Login Successfully!',
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
    <>
      <div className="relative flex flex-col gap-4 py-8  px-8 border border-border rounded-3xl shadow-xl md:w-2/6 mx-auto font-poppins">
        {/* for bg color */}
        <h1 className=" text-3xl font-bold">Login</h1>
        <p className=" text-base text-text-light">
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
            <p className=" mb-8 text-sm underline text-text-light cursor-pointer">
              Forgot your password?
            </p>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                'Sign In'
              )}

              {/* {props?.id ? 'Update' : 'Add'} */}
            </Button>
            <Link href={'/signup'}>
              <p className="text-center mt-8 text-sm underline text-text-light cursor-pointer">
                New customer? Sign up for an account
              </p>
            </Link>
          </form>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
