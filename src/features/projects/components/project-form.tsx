"use client";

import { Route } from "next";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const createProject = useCreateProject(session.data?.user.id);
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
            onSuccess: () => {
              showSuccess("Project created.");
              router.push(values.name as Route);
            },
            onError: (error) => showError(error.message),
          }
        );
      } else {
        // updateOrganization.mutate(
        //   {
        //     organizationId: data.id,
        //     data: {
        //       ...values,
        //       ownerId: data.ownerId,
        //     },
        //   },
        //   {
        //     onSuccess: () => {
        //       showSuccess("Organization updated.");
        //       router.push(values.name as Route);
        //     },
        //     onError: (error) => showError(error.message),
        //   }
        // );
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
        <SubmitButton isPending={createProject.isPending}>
          {data ? "Update" : "Create"}
        </SubmitButton>
      </form>
    </Form>
  );
};
