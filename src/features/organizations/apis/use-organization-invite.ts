import { useMutation } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { TCreateInvite, TInvite } from "../organization-schemas";

const createInvite = (data: TCreateInvite): Promise<TInvite> =>
  api
    .post(`/organizations/${data.organizationId}/invites`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useCreateInvite = () =>
  useMutation({
    mutationFn: createInvite,
    onError: (error: { message: string }) => error,
  });
