import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { TOrganization } from "../organization-schemas";
import { organizationQueryKeys } from "./organization-query-keys";

const deleteOrganization = (organizationId: string): Promise<TOrganization> =>
  api
    .delete(`/organizations/${organizationId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useDeleteOrganization = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrganization,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: organizationQueryKeys.byUserId(userId),
      }),
    onError: (error: { message: string }) => error,
  });
};
