import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { TCreateOrganization, TOrganization } from "../organization-schemas";
import { organizationQueryKeys } from "./organization-query-keys";

const createOrganization = (
  data: TCreateOrganization
): Promise<TOrganization> =>
  api
    .post("/organizations", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useCreateOrganization = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrganization,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: organizationQueryKeys.byUserId(userId),
      }),
    onError: (error: { message: string }) => error,
  });
};
