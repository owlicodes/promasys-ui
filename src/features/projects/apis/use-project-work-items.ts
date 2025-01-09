import { useQuery } from "@tanstack/react-query";

import { STALE_TIME } from "@/features/common/apis/constants";
import {
  TWorkItem,
  TWorkItemKeyMap,
} from "@/features/work-items/work-item-schemas";
import { api } from "@/lib/api-client";

import { projectQueryKeys } from "./project-query-keys";

const findWorkItemsByProjectId = (
  projectId: string | undefined,
  filterType: TWorkItemKeyMap | "ALL"
): Promise<TWorkItem[]> => {
  return api
    .get(`/projects/${projectId}/work-items?type=${filterType}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useProjectWorkItems = (
  projectId: string | undefined,
  filterType: TWorkItemKeyMap | "ALL"
) =>
  useQuery({
    queryKey: projectQueryKeys.workItemsByProjectId(projectId, filterType),
    queryFn: () => findWorkItemsByProjectId(projectId, filterType),
    enabled: Boolean(projectId),
    staleTime: STALE_TIME._30m,
  });
