"use client";

import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import useDialogConfigStore from "@/stores/dialog-store";

import { SprintForm } from "./sprint-form";

export const CreateNewSprintButton = () => {
  const { setDialogConfig } = useDialogConfigStore();

  const showSprintForm = () =>
    setDialogConfig({
      open: true,
      title: "Create New Sprint",
      description: "",
      content: <SprintForm />,
    });

  return (
    <Button className="mt-4" onClick={showSprintForm}>
      <PlusCircle />
      Create New Sprint
    </Button>
  );
};
