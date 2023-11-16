import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '~/components/ui/dialog';

import { poppins } from '~/components/layouts/app';
import { Button } from '~/components/ui/button';
import { useMutation } from '@apollo/client';
import { DeleteCustomerAddressQuery } from '~/server/lib/shopify/mutations/address';
import { RootState } from '~/store/store';
import { useSelector } from 'react-redux';
import { useToast } from '~/components/ui/use-toast';

interface addressDialogInterface {
  isModal: boolean;
  title: string;
  setIsModal: (e: boolean) => void;
  refetch: () => unknown;
  data: any;
  addressID: string | null;
}

export function AddressDialouge(props: addressDialogInterface) {
  const { toast } = useToast();
  const { user } = useSelector((state: RootState) => state.auth);
  const [deleteAddress, { loading: deleteAddressLoading }] = useMutation(
    DeleteCustomerAddressQuery,
  );
  const handleClose = () => {
    if (!deleteAddressLoading) props?.setIsModal(!props?.isModal);
  };
  const handleDelete = async () => {
    try {
      const customerDeleteAddressData = await deleteAddress({
        variables: {
          customerAccessToken: user?.token_id,
          id: props?.addressID,
        },
      });
      if (customerDeleteAddressData) {
        props?.refetch();
        toast({
          variant: 'success',
          title: 'Address Added Successfully',
        });
        handleClose();
      }
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: e?.message,
      });
    }
  };
  return (
    <>
      <Dialog open={props?.isModal} onOpenChange={() => handleClose()}>
        <DialogContent
          className={`${poppins.variable} ${poppins.className} lg:max-w-[420px] px-8`}
        >
          <DialogHeader>
            {/* <DialogTitle className="capitalize text-4xl font-semibold">
              {props?.title}
            </DialogTitle> */}
            <p className="text-sm font-normal text-text-light">
              Are you sure you want to delete this address?
            </p>
          </DialogHeader>
          <DialogDescription className="  pt-2space-y-8">
            <div className="flex  justify-end gap-2 items-center pt-4">
              <Button
                onClick={() => handleClose()}
                className=" h-8 w-max text-red-500"
                variant={'outline'}
                disabled={deleteAddressLoading}
              >
                No
              </Button>
              <Button
                className=" w-max h-8"
                disabled={deleteAddressLoading}
                onClick={() => handleDelete()}
              >
                {deleteAddressLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  'Yes'
                )}
              </Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}
