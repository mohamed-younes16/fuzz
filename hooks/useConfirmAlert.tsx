import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const useConfirmAlert = (): [
  () => JSX.Element,
  () => Promise<unknown>
] => {
  const [promise, setPromise] = useState<{
    resolve: (v: boolean) => void;
  } | null>(null);

  const init = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });
  const handleClose = () => {
    setPromise(null);
  };
  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };
  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const AlertDialogComp = () => {
    return (
      <AlertDialog open={promise !== null}>
        {/* <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleCancel()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleConfirm()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  return [AlertDialogComp, init];
};

export default useConfirmAlert;
