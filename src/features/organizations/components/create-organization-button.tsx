"use client";

import { Button } from "@/components/ui/button";
import useDialogConfigStore from "@/stores/dialog-store";

import { OrganizationForm } from "./organization-form";

export const CreateOrganizationButton = () => {
  const { setDialogConfig } = useDialogConfigStore();

  const showOrganizationForm = () =>
    setDialogConfig({
      open: true,
      title: "Create New Organization",
      description: "",
      content: <OrganizationForm />,
    });

  return (
    <Button onClick={showOrganizationForm}>Create New Organization</Button>
  );
};
