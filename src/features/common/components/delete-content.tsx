"use client";

import { useState } from "react";

import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import useDialogConfigStore from "@/stores/dialog-store";

type DeleteContentProps = {
  deleteCallback: () => void;
};

export const DeleteContent = ({ deleteCallback }: DeleteContentProps) => {
  const { setDialogConfig } = useDialogConfigStore();
  const [isPending, setIsPending] = useState(false);

  const cancel = () => setDialogConfig(undefined);

  const onDelete = () => {
    setIsPending(true);
    deleteCallback();
  };

  return (
    <div>
      <p>
        Are you sure you want to delete this record? This will permanently
        delete the record from our server.
      </p>

      <div className="mt-4 flex justify-end space-x-4">
        <Button variant="secondary" onClick={cancel}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              <span>Please wait...</span>
            </span>
          ) : (
            "Continue"
          )}
        </Button>
      </div>
    </div>
  );
};
