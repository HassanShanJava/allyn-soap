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
import { loginCustomerSchema, resetEmailSchema } from '~/schema/customer';
import { useState } from 'react';
import { recoverAccountMutation } from '~/server/lib/shopify/mutations/auth';
import { useMutation } from '@apollo/client';
import { loginToken } from '~/utils/helper';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAuth } from '~/store/reducers/auth';
import { RootState } from '~/store/store';
import { ArrowLeft } from 'lucide-react';

const ResetEmailForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState<boolean>(false);
  const { cart } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof resetEmailSchema>>({
    resolver: zodResolver(resetEmailSchema),
  });

  const [recoverAccount, { loading: recoverAccountLoading, error }] =
    useMutation(recoverAccountMutation);

  async function onSubmit(values: z.infer<typeof resetEmailSchema>) {
    try {
      setIsFormSubmit(true);
      setLoading(true);
      console.log({ values }, 'send email');
      const recoverAcc = await recoverAccount({
        variables: {
          ...values,
        },
      });
      toast({
        variant: 'success',
        title: 'Email Sent!',
      });
      console.log({ recoverAcc }, 'recoverAcc');
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: error.message,
      });
      setIsFormSubmit(false);
    }
  }
  return (
    <div className="px-4">
      <div className="relative flex flex-col gap-4  p-8  border border-border rounded-3xl shadow-xl w-fit max-w-[30rem] mx-auto font-poppins">
        {/* for bg color */}
        {!isFormSubmit ? (
          <>
            {' '}
            <h1 className=" text-2xl md:text-3xl font-bold">
              Reset your password
            </h1>
            <p className=" taxt-sm md:text-base text-text-light">
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

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    'Submit'
                  )}

                  {/* {props?.id ? 'Update' : 'Add'} */}
                </Button>
                <Link href={'/login'}>
                  <p className="text-center mt-8 text-sm underline text-text-light cursor-pointer">
                    Cancel
                  </p>
                </Link>
              </form>
            </Form>
          </>
        ) : (
          <div className="w-full flex flex-col gap-4">
            {/* <h1 className=" text-2xl md:text-3xl font-bold">{`We've sent you an Email for resetting your password`}</h1> */}
            <p className=" taxt-sm md:text-base text-text-light">
              An email for resetting your password has been sent.
            </p>
            <div className=" w-full flex gap-4 items-center ">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="h-9 flex  gap-2  w-max p-2 text-base rounded-lg"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className=" ">Go Back</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetEmailForm;
