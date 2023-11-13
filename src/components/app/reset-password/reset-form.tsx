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
import { loginCustomerSchema, resetPasswordSchema } from '~/schema/customer';
import { useState } from 'react';
import {
  CartUpdateMutation,
  LoginMutation,
  SignUpMutation,
  resetAccountMutation,
  resetByUrlaccountMutation,
} from '~/server/lib/shopify/mutations/auth';
import { useMutation } from '@apollo/client';
import { loginToken } from '~/utils/helper';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAuth } from '~/store/reducers/auth';
import { RootState } from '~/store/store';

const ResetPasswordForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { cart } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();
  console.log(router?.query, 'query');
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [customerResetAccount, { loading: customerResetLoading }] = useMutation(
    resetByUrlaccountMutation,
  );
  console.log(cart, 'cart data');
  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    try {
      setLoading(true);

      const payload = {
        password: values?.password,
        resetUrl: router?.query?.url,
      };
      console.log({ values });
      const recoverAcc = await customerResetAccount({
        variables: {
          ...payload,
        },
      });
      toast({
        variant: 'success',
        title: 'Password Reset Successfully!',
      });
      if (window) window.location.href = '/login';

      // setLoading(true);
    } catch (error: any) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: error.message,
      });
    }
  }
  console.log(router?.query, 'form.formState.errors');

  return (
    <>
      <div className="relative flex flex-col gap-4  p-8  border border-border rounded-3xl shadow-xl w-fit max-w-[30rem] mx-auto font-poppins">
        {/* for bg color */}
        <h1 className=" text-3xl font-bold">Reset your password</h1>
        <p className=" text-base text-text-light">
          Small Batch Bars of Soap. Made with the freshest ingredients for a
          rich.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="justify-center items-center   "
          >
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
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem className=" w-full ">
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-text-light-secondary border-none focus:outline-none"
                      autoFocus={false}
                      placeholder="Confirm Password"
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
                'Reset Password'
              )}

              {/* {props?.id ? 'Update' : 'Add'} */}
            </Button>
            {/* <Link href={'/login'}>
              <p className="text-center mt-8 text-sm underline text-text-light cursor-pointer">
                Cancel
              </p>
            </Link> */}
          </form>
        </Form>
      </div>
    </>
  );
};

export default ResetPasswordForm;
