import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { TUpdateOrganization } from "../organization-schemas";
import { organizationQueryKeys } from "./organization-query-keys";

const updateOrganization = ({
  organizationId,
  data,
}: {
  organizationId: string;
  data: TUpdateOrganization;
}) =>
  api
    .patch(`/organizations/${organizationId}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useUpdateOrganization = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrganization,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: organizationQueryKeys.byUserId(userId),
      }),
    onError: (error: { message: string }) => error,
  });
};
