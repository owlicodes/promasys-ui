import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { TInvite } from "../invite-schemas";
import { inviteQueryKeys } from "./invite-query-keys";

const acceptInvite = (inviteId: string): Promise<TInvite> =>
  api
    .patch(`/invites/accept/${inviteId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useAcceptInvite = (email: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptInvite,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: inviteQueryKeys.byUser(email),
      }),
    onError: (error: { message: string }) => error,
  });
};
