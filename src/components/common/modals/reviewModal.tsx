import { useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { useToast } from '~/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import ReactStars from 'react-stars';

interface reviewDialogInterface {
  isModal: boolean;
  title: string;
  setIsModal: (e: boolean) => void;
  data: any;
  type: string;
}
export const addCustomerAddress = z.object({
  review_score: z.number(),
  email: z.string().email().trim(),

  review_title: z.string().trim(),
  display_name: z.string().trim(),
  review_content: z.string().trim(),
});
export function ReviewDialog(props: reviewDialogInterface) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof addCustomerAddress>>({
    resolver: zodResolver(addCustomerAddress),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState(0);

  // Catch Rating value

  console.log({ rating });
  async function onSubmit(values: z.infer<typeof addCustomerAddress>) {
    try {
      setLoading(true);
      console.log(
        props?.data?.id?.split('/')[props?.data?.id?.split('/').length - 1],
        'product Add ID',
      );

      const Addoptions = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appkey: `${process.env.NEXT_PUBLIC_SHOPIFY_REVIEW}`,
          domain: `${process.env.NEXT_PUBLIC_BASE_URL}`,
          sku: `${
            props?.data?.id?.split('/')[props?.data?.id?.split('/').length - 1]
          }`,
          product_title: props?.data?.title,
          product_description: props?.data?.title,
          product_url: `${
            process.env.NEXT_PUBLIC_BASE_URL
          }product-detail/${'boll-weevil-soap'}}`,
          ...values,
          product_image_url: 'http://www.shop.com/phone.jpg',
          is_incentivized: false,
          time_stamp: new Date().getTime().toString(),
        }),
      };

      fetch('https://api.yotpo.com/reviews/dynamic_create', Addoptions)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));

      setTimeout(() => {
        toast({
          variant: 'success',
          title: `Review  Added successfully!`,
        });
        setLoading(false);
        props.setIsModal(!props?.isModal);
      }, 2000);
    } catch (error: any) {
      setLoading(false);
      props.setIsModal(false);
      toast({
        variant: 'destructive',
        title: error.message,
      });
    }
  }
  const ratingChanged = (newRating: any) => {
    console.log({ newRating });
    form.setValue('review_score', newRating);
    setRating(newRating);
  };
  return (
    <>
      <Dialog open={props?.isModal} onOpenChange={(e) => props.setIsModal(e)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="capitalize">{props?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-4 mt-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="justify-center items-center  py-4 "
                  >
                    <div className={' w-full flex h-14'}>
                      <ReactStars
                        className="h-14"
                        count={5}
                        size={36}
                        color2={'#ffd700'}
                        value={rating}
                        onChange={ratingChanged}
                      />

                      {/* <ReactStars
                        count={5}
                        size={38}
                        isHalf={true}
                        classNames={'h-max'}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                        {...form.register('review_score')}
                      /> */}
                    </div>
                    <FormField
                      control={form.control}
                      name="display_name"
                      render={() => (
                        <FormItem className=" w-full ">
                          <FormLabel className="text-sm text-cardGray ">
                            Name <sup className="text-red-500">*</sup>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter Name"
                              {...form.register('display_name')}
                            />
                          </FormControl>
                          <div className="relative pb-3 ">
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
                          <FormLabel className="text-sm text-cardGray ">
                            Email <sup className="text-red-500">*</sup>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter Email"
                              {...form.register('email')}
                            />
                          </FormControl>
                          <div className="relative pb-3 ">
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="review_title"
                      render={({ field }) => (
                        <FormItem className=" w-full ">
                          <FormLabel className="text-sm text-cardGray">
                            Review Title <sup className="text-red-500">*</sup>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter Review Title"
                              {...field}
                            />
                          </FormControl>
                          <div className="relative pb-3">
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="review_content"
                      render={({ field }) => (
                        <FormItem className=" w-full ">
                          <FormLabel className="text-sm text-cardGray">
                            Review Content <sup className="text-red-500">*</sup>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter Review Content"
                              {...field}
                            />
                          </FormControl>
                          <div className="relative pb-3">
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-end gap-4">
                      <Button
                        variant="secondary"
                        type="button"
                        disabled={loading}
                        onClick={() => {
                          props.setIsModal(!props?.isModal);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <i className="fa-solid fa-spinner fa-spin"></i>
                        ) : (
                          'Add'
                        )}

                        {/* {props?.id ? 'Update' : 'Add'} */}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </DialogDescription>
          </DialogHeader>
          {/* <DialogFooter>
            <Button
              variant={'secondary'}
              onClick={() => props.setIsModal(false)}
            >
              NO
            </Button>
            <Button type="submit" onClick={() => handleClick()}>
              YES
            </Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
      {/* <LoadingDialog open={loading} text={'Saving data...'} /> */}
    </>
  );
}
