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

import { useCreateOrganization } from "../apis/use-create-organization";
import { TFormSchema, formSchema } from "../organization-schemas";

export const OrganizationForm = () => {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const session = useSession();
  const createOrganization = useCreateOrganization(session.data?.user.id);
  const { setDialogConfig } = useDialogConfigStore();
  const { toast } = useToast();

  const onSubmit = (values: TFormSchema) => {
    if (session.data?.user) {
      createOrganization.mutate(
        {
          ...values,
          ownerId: session.data?.user.id,
        },
        {
          onSuccess: () => {
            setDialogConfig(undefined);
            toast({
              title: "Organization Created",
            });
          },
          onError: (error) =>
            toast({
              title: error.message,
              variant: "destructive",
            }),
        }
      );
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
        <SubmitButton isPending={createOrganization.isPending}>
          Create
        </SubmitButton>
      </form>
    </Form>
  );
};
