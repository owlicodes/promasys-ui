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
import { SubmitButton } from "@/features/common/components/submit-button";
import { useToast } from "@/hooks/use-toast";
import useDialogConfigStore from "@/stores/dialog-store";
import useSelectedOrganizationStore from "@/stores/selected-organization-store";

import { useCreateInvite } from "../apis/use-organization-invite";
import {
  TInviteUserFormSchema,
  inviteUserFormSchema,
} from "../organization-schemas";

export const InviteUserForm = () => {
  const form = useForm<TInviteUserFormSchema>({
    resolver: zodResolver(inviteUserFormSchema),
    defaultValues: {
      email: "",
    },
  });
  const session = useSession();
  const createInvite = useCreateInvite();
  const { selectedOrganization } = useSelectedOrganizationStore();
  const { setDialogConfig } = useDialogConfigStore();
  const { toast } = useToast();

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

  const onSubmit = (values: TInviteUserFormSchema) => {
    if (session.data?.user && selectedOrganization) {
      createInvite.mutate(
        {
          email: values.email,
          organizationId: selectedOrganization.id,
        },
        {
          onSuccess: () => {
            showSuccess("Invite created.");
          },
          onError: (error) => showError(error.message),
        }
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton isPending={createInvite.isPending}>
          Send Invite
        </SubmitButton>
      </form>
    </Form>
  );
};
