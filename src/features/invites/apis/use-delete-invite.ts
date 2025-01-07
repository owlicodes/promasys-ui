import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { TInvite } from "../invite-schemas";
import { inviteQueryKeys } from "./invite-query-keys";

const deleteInvite = (inviteId: string): Promise<TInvite> =>
  api
    .delete(`/invites/${inviteId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useDeleteInvite = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInvite,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: inviteQueryKeys.byUser(email),
      }),
    onError: (error: { message: string }) => error,
  });
};
