import { useState } from 'react';
import { useToast } from '~/components/ui/use-toast';

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
import { poppins } from '~/components/layouts/app';

interface socialDialogInterface {
  isModal: boolean;
  title: string;
  setIsModal: (e: boolean) => void;
  data: any;
  type: string;
}

export function SocialDialouge(props: socialDialogInterface) {
  const [url, setUrl] = useState(props?.type);
  const { toast } = useToast();

  const SocialShareData = [
    {
      title: 'twitter',
      image: Social1,
      link: 'https://twitter.com/intent/tweet?text=',
    },
    {
      title: 'facebook',
      image: Social2,
      link: 'https://www.facebook.com/sharer/sharer.php?u=',
    },
    {
      title: 'instagram',
      image: Social3,
      link: '',
    },
    {
      title: 'whatsapp',
      image: Social4,
      link: '',
    },
  ];
  function shareOnTwitter(text: string) {
    const navUrl = text + props?.type;
    setUrl(navUrl);
    // window.open(navUrl, '_blank');
  }
  return (
    <>
      <Dialog open={props?.isModal} onOpenChange={(e) => props.setIsModal(e)}>
        <DialogContent
          className={`${poppins.variable} ${poppins.className} lg:max-w-[620px] px-8 text-text`}
        >
          <DialogHeader>
            <DialogTitle className="capitalize text-4xl font-semibold">
              {props?.title}
            </DialogTitle>
            <p className="text-sm font-normal text-text-light">
              If you like this product share it with your friends.
            </p>
          </DialogHeader>
          <DialogDescription className="  pt-10 space-y-8">
            <div className="grid grid-cols-4 gap-2 justify-between items-center ">
              {SocialShareData?.map((item, index: number) => {
                return (
                  <Image
                    key={index}
                    height={1000}
                    width={1000}
                    src={item?.image}
                    alt=""
                    onClick={() => shareOnTwitter(item?.link)}
                    className=" w-20 md:h-32 md:w-24  object-cover object-center rounded-3xl !bg-none cursor-pointer"
                  />
                );
              })}
            </div>
            <div className="border border-border h-14 rounded-md px-4 justify-between  flex items-center gap-2 ">
              <p className="line-clamp-1 flex-1">{url}</p>
              <Copy
                onClick={() => {
                  if (window) navigator?.clipboard?.writeText(url);
                  toast({
                    variant: 'success',
                    title: `Link copy to clipboard`,
                  });
                }}
                aria-label="Copy"
                aria-hidden="true"
                tabIndex={-1}
                className=" cursor-pointer text-text"
              />
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
