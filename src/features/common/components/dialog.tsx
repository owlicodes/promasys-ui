"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog as ShadDialog,
} from "@/components/ui/dialog";
import useDialogConfigStore from "@/stores/dialog-store";

export const Dialog = () => {
  const { dialogConfig, setDialogConfig } = useDialogConfigStore();

  const closeDialog = () => setDialogConfig(undefined);

  if (!dialogConfig) return null;

  return (
    <ShadDialog open={dialogConfig.open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogConfig.title}</DialogTitle>
          <DialogDescription>{dialogConfig.description}</DialogDescription>
        </DialogHeader>

        <div>{dialogConfig.content}</div>
      </DialogContent>
    </ShadDialog>
  );
};
