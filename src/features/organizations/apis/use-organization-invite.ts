import { useMutation, useQueryClient } from "@tanstack/react-query";

import { inviteQueryKeys } from "@/features/invites/apis/invite-query-keys";
import { api } from "@/lib/api-client";

import { TCreateInvite, TInvite } from "../organization-schemas";

const createInvite = (data: TCreateInvite): Promise<TInvite> =>
  api
    .post(`/organizations/${data.organizationId}/invites`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useCreateInvite = (email: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInvite,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: inviteQueryKeys.byUser(email),
      }),
    onError: (error: { message: string }) => error,
  });
};
