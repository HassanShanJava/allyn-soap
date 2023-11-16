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
import { resetPasswordSchema } from '~/schema/customer';
import { useEffect, useState } from 'react';
import { resetByUrlaccountMutation } from '~/server/lib/shopify/mutations/auth';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';

const ResetPasswordForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resetUrl, setResetUrl] = useState<string | null>(null);
  const { cart } = useSelector((state: RootState) => state.cart);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [customerResetAccount, { loading: customerResetLoading }] = useMutation(
    resetByUrlaccountMutation,
  );
  useEffect(() => {
    if (router?.query?.url) {
      setResetUrl(router?.query?.url as string);
      router.replace('/reset-password');
    }
  }, [router?.query?.url]);
  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    try {
      setLoading(true);

      const payload = {
        password: values?.password,
        resetUrl,
      };
      const recoverAcc = await customerResetAccount({
        variables: {
          ...payload,
        },
      });
      if (recoverAcc?.data?.customerResetByUrl?.customerAccessToken) {
        toast({
          variant: 'success',
          title: 'Password Reset Successfully!',
        });
        if (window) window.location.href = '/login';
      } else {
        throw new Error('Reset Token has been expired');
      }

      // setLoading(true);
    } catch (error: any) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: error.message,
      });
      if (window) window.location.href = '/login';
    }
  }

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
