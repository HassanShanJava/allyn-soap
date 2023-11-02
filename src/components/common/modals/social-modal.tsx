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
export function SocialDialouge(props: reviewDialogInterface) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof addCustomerAddress>>({
    resolver: zodResolver(addCustomerAddress),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState(0);

  return (
    <>
      <Dialog open={props?.isModal} onOpenChange={(e) => props.setIsModal(e)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="capitalize">{props?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-4 mt-4">Share this product</div>
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
