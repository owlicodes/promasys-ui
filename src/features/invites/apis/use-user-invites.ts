import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { TInvite } from "../invite-schemas";
import { inviteQueryKeys } from "./invite-query-keys";

const findUserInvites = (email: string | undefined): Promise<TInvite[]> =>
  api
    .get(`/invites?email=${email}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useUserInvites = (email: string | undefined) =>
  useQuery({
    queryKey: inviteQueryKeys.byUser(email),
    queryFn: () => findUserInvites(email),
    enabled: Boolean(email),
  });
