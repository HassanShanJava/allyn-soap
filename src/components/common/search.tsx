import React from 'react';
import { Input } from '../ui/input';
import { Search as SearchIcon } from 'lucide-react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

type searchProps = {
  open: boolean;
  setOpen: Function;
};

const formSchema = z.object({
  search: z.string().min(2, {
    message: 'Enter product name',
  }),
});

const Search: React.FC<searchProps> = ({ open, setOpen }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    localStorage.setItem('search', values.search);
    router.push('/products/search');
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <div
        className={`hidden xl:block relative transition-all mx-6 duration-300 ease-in-out ${
          open ? 'opacity-100 ' : 'opacity-0 '
        } `}
      >
        {/* <SearchIcon className="absolute top-7 bottom-4 z-10 w-6 h-6 my-auto text-gray-500 right-8" /> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* <Input placeholder="shadcn" {...field} /> */}
                    {/* <SearchIcon className="absolute top-7 bottom-4 z-10 w-6 h-6 my-auto text-gray-500 -left-14" /> */}
                    <Input
                      className="absolute  m-2 h-8 w-48 right-4"
                      type="text"
                      placeholder="Search"
                      autoFocus={true}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <div
        className={`block xl:hidden relative transition-all  duration-300 ease-in-out `}
      >
        {/* <SearchIcon className="absolute top-7 bottom-4 z-10 w-6 h-6 my-auto text-gray-500 right-8" /> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* <Input placeholder="shadcn" {...field} /> */}
                    {/* <SearchIcon className="absolute top-7 bottom-4 z-10 w-6 h-6 my-auto text-gray-500 -left-14" /> */}
                    <Input
                      className=" h-8 w-full"
                      type="text"
                      placeholder="Search"
                      autoFocus={true}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  );
};

export default Search;
