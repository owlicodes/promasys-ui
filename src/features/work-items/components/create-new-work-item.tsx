"use client";

import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import useDialogConfigStore from "@/stores/dialog-store";

export const CreateNewWorkItem = () => {
  const { setDialogConfig } = useDialogConfigStore();

  const showWorkItemForm = () =>
    setDialogConfig({
      open: true,
      title: "Create New Work Item",
      description: "",
      content: <h1>Work Item Form</h1>,
    });

  return (
    <Button className="mt-4" onClick={showWorkItemForm}>
      <PlusCircle />
      Create New Work Item
    </Button>
  );
};
