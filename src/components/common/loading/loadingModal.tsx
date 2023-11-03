import { AlertDialog, AlertDialogContent } from '@/ui/alert-dialog';
import { E } from 'vitest/dist/types-0373403c';
import { poppins } from '~/components/layouts/app';

interface LoadingDialogInterface {
  open: boolean;
  setOpen?: (e: boolean) => void;
  text?: string;
}

export function LoadingDialog(props: LoadingDialogInterface) {
  setTimeout(() => {
    props.setOpen && props.setOpen(false);
  }, 5000);
  return (
    <AlertDialog open={props.open}>
      <AlertDialogContent
        className={`${poppins.variable} ${poppins.className}`}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4" />
          <h2 className="text-primary text-xl font-semibold">{props?.text}</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
