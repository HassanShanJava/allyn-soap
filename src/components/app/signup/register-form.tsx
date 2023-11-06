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

const RegisterForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signupCustomerSchema>>({
    resolver: zodResolver(signupCustomerSchema),
  });
  async function onSubmit(values: z.infer<typeof signupCustomerSchema>) {
    try {
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: error.message,
      });
    }
  }
  return (
    <>
      <div className="relative flex flex-col gap-4 pt-8  px-8 border border-border rounded-2xl shadow-md md:w-2/6 mx-auto font-poppins">
        {/* for bg color */}
        <h1 className=" text-3xl font-bold">Sign up</h1>
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

            <Button type="submit" className="w-full" disabled={false}>
              {false ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                'Sign Up'
              )}

              {/* {props?.id ? 'Update' : 'Add'} */}
            </Button>
            <p className="text-center mt-8 text-sm underline text-text-light cursor-pointer">
              Already have an Account
            </p>
          </form>
        </Form>
      </div>
    </>
  );
};

export default RegisterForm;
