"use client";

import { useParams } from "next/navigation";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/features/common/components/submit-button";
import { useProjectUsers } from "@/features/projects/apis/use-project-users";
import { useToast } from "@/hooks/use-toast";
import useDialogConfigStore from "@/stores/dialog-store";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

import { useCreateWorkItem } from "../apis/use-create-work-item";
import {
  TWorkItem,
  TWorkItemFormSchema,
  workItemFormSchema,
} from "../work-item-schemas";

export const WorkItemForm = ({ data }: { data?: TWorkItem }) => {
  const form = useForm<TWorkItemFormSchema>({
    resolver: zodResolver(workItemFormSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      type: data?.type || "NONE",
      storyPoint: data?.storyPoint ? data.storyPoint : 0,
      status: data?.status || "PENDING",
      assignedToUserId: data?.assignedToUserId || "",
    },
  });
  const session = useSession();
  const { setDialogConfig } = useDialogConfigStore();
  const { toast } = useToast();
  const { projectId, sprintId } = useParams<{
    projectId: string;
    sprintId: string;
  }>();
  const projectUsers = useProjectUsers(projectId);
  const createWorkItem = useCreateWorkItem(projectId);
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

  const onSubmit = (values: TWorkItemFormSchema) => {
    if (session.data?.user && selectedOrganization) {
      if (!data) {
        createWorkItem.mutate(
          {
            ...values,
            projectId,
            sprintId,
            createdByUserId: session.data.user.id,
          },
          {
            onSuccess: () => showSuccess("Wokr item created."),
            onError: (error) => showError(error.message),
          }
        );
      } else {
        // updateProject.mutate(
        //   {
        //     projectId: data.id,
        //     data: {
        //       ...values,
        //       organizationId: data.organizationId,
        //       ownerId: data.ownerId,
        //     },
        //   },
        //   {
        //     onSuccess: () => showSuccess("Project updated."),
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
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
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the work item type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="NONE">None</SelectItem>
                  <SelectItem value="STORY">Story</SelectItem>
                  <SelectItem value="TASK">Task</SelectItem>
                  <SelectItem value="BUG">Bug</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="storyPoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Story Point</FormLabel>
              <FormControl>
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the work item status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="DONE">Done</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assignedToUserId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned To</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the user to assign the task" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projectUsers.data?.map((projectUser) => (
                    <SelectItem key={projectUser.id} value={projectUser.id}>
                      {projectUser.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isPending={createWorkItem.isPending}>
          {data ? "Update" : "Create"}
        </SubmitButton>
      </form>
    </Form>
  );
};
