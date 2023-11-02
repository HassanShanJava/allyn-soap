import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import Social1 from '~/public/assets/Social1.svg';
import Social2 from '~/public/assets/Social2.svg';
import Social3 from '~/public/assets/Social3.svg';
import Social4 from '~/public/assets/Social4.svg';
import Image from 'next/image';
import { Copy } from 'lucide-react';

interface socialDialogInterface {
  isModal: boolean;
  title: string;
  setIsModal: (e: boolean) => void;
  data: any;
  type: string;
}

export function SocialDialouge(props: socialDialogInterface) {
  const SocialShareData = [
    {
      title: 'twitter',
      image: Social1,
    },
    {
      title: 'facebook',
      image: Social2,
    },
    {
      title: 'instagram',
      image: Social3,
    },
    {
      title: 'whatsapp',
      image: Social4,
    },
  ];
  return (
    <>
      <Dialog open={props?.isModal} onOpenChange={(e) => props.setIsModal(e)}>
        <DialogContent className="lg:max-w-[620px]">
          <DialogHeader>
            <DialogTitle className="capitalize text-4xl font-semibold">
              {props?.title}
            </DialogTitle>
            <p className="text-sm font-normal text-text-light">
              If you like this product share it with your friends.
            </p>
          </DialogHeader>
          <DialogDescription className=" mt-6 space-y-4">
            <div className="flex justify-between items-center ">
              {SocialShareData?.map((item, index: number) => {
                return (
                  <Image
                    key={index}
                    height={1000}
                    width={1000}
                    src={item?.image}
                    alt=""
                    className=" h-32 w-24  object-cover object-center rounded-3xl !bg-none cursor-pointer"
                  />
                );
              })}
            </div>
            <div className="border border-border h-14 rounded-md px-4 justify-between  flex items-center  ">
              <p>https://example.com/article/social-share-modal</p>
              <Copy className=" cursor-pointer text-text" />
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
