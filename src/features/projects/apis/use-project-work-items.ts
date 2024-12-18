import { useQuery } from "@tanstack/react-query";

import { STALE_TIME } from "@/features/common/apis/constants";
import { TWorkItem } from "@/features/work-items/work-item-schemas";
import { api } from "@/lib/api-client";

import { projectQueryKeys } from "./project-query-keys";

const findWorkItemsByProjectId = (
  projectId: string | undefined,
  backlogs: boolean
): Promise<TWorkItem[]> => {
  const url = !backlogs
    ? `/projects/${projectId}/work-items`
    : `/projects/${projectId}/work-items/backlogs`;

  return api
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useProjectWorkItems = (
  projectId: string | undefined,
  backlogs: boolean = false
) =>
  useQuery({
    queryKey: projectQueryKeys.workItemsByProjectId(projectId),
    queryFn: () => findWorkItemsByProjectId(projectId, backlogs),
    enabled: Boolean(projectId),
    staleTime: STALE_TIME._30m,
  });
