import { useQuery } from "@tanstack/react-query";

import { STALE_TIME } from "@/features/common/apis/constants";
import { api } from "@/lib/api-client";

import { TProject } from "../project-schemas";
import { projectQueryKeys } from "./project-query-keys";

export const findProjectsByUserAndOrg = (
  organizationId: string | undefined
): Promise<TProject[]> => {
  return api
    .get(`/projects/${organizationId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useProjectsByUserAndOrg = (
  userId: string | undefined,
  organizationId: string | undefined
) =>
  useQuery({
    queryKey: projectQueryKeys.byUserAndOrg(userId, organizationId),
    queryFn: () => findProjectsByUserAndOrg(organizationId),
    enabled: Boolean(organizationId),
    staleTime: STALE_TIME._30m,
  });
