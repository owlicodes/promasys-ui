"use client";

import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import useDialogConfigStore from "@/stores/dialog-store";

import { ProjectForm } from "./project-form";

export const CreateProjectButton = () => {
  const { setDialogConfig } = useDialogConfigStore();

  const showProjectForm = () =>
    setDialogConfig({
      open: true,
      title: "Create New Project",
      description: "",
      content: <ProjectForm />,
    });

  return (
    <Button onClick={showProjectForm} variant="outline">
      <PlusCircle />
      Create New Project
    </Button>
  );
};
