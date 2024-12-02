"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/features/common/components/submit-button";
import { useToast } from "@/hooks/use-toast";
import useDialogConfigStore from "@/stores/dialog-store";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

import { useCreateProject } from "../apis/use-create-project";
import { useUpdateProject } from "../apis/use-update-project";
import {
  TProject,
  TProjectSchema,
  projectFormSchema,
} from "../project-schemas";

export const ProjectForm = ({ data }: { data?: TProject }) => {
  const form = useForm<TProjectSchema>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
    },
  });
  const session = useSession();
  const { setDialogConfig } = useDialogConfigStore();
  const { toast } = useToast();
  const createProject = useCreateProject(session.data?.user.id);
  const updateProject = useUpdateProject(
    session.data?.user.id,
    data?.organizationId
  );
  const { selectedOrganization } = useSelectedOrganizationStore();

  const showError = (message: string) =>
    toast({
      title: message,
      variant: "destructive",
    });

  const showSuccess = (message: string) => {
    setDialogConfig(undefined);

    toast({
      title: message,
    });
  };

  const onSubmit = (values: TProjectSchema) => {
    if (session.data?.user && selectedOrganization) {
      if (!data) {
        createProject.mutate(
          {
            ...values,
            organizationId: selectedOrganization.id,
            ownerId: session.data.user.id,
          },
          {
            onSuccess: () => showSuccess("Project created."),
            onError: (error) => showError(error.message),
          }
        );
      } else {
        updateProject.mutate(
          {
            projectId: data.id,
            data: {
              ...values,
              organizationId: data.organizationId,
              ownerId: data.ownerId,
            },
          },
          {
            onSuccess: () => showSuccess("Project updated."),
            onError: (error) => showError(error.message),
          }
        );
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  autoComplete="off"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          isPending={createProject.isPending || updateProject.isPending}
        >
          {data ? "Update" : "Create"}
        </SubmitButton>
      </form>
    </Form>
  );
};
