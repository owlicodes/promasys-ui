import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { TInvite } from "../invite-schemas";
import { inviteQueryKeys } from "./invite-query-keys";

const declineInvite = (inviteId: string): Promise<TInvite> =>
  api
    .patch(`/invites/decline/${inviteId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useDeclineInvite = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: declineInvite,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: inviteQueryKeys.byUser(email),
      }),
    onError: (error: { message: string }) => error,
  });
};
