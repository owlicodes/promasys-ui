import { useQuery } from "@tanstack/react-query";

import { STALE_TIME } from "@/features/common/apis/constants";
import { TWorkItem } from "@/features/work-items/work-item-schemas";
import { api } from "@/lib/api-client";

import { projectQueryKeys } from "./project-query-keys";

const findBacklogsByProjectId = (
  projectId: string | undefined
): Promise<TWorkItem[]> => {
  return api
    .get(`/projects/${projectId}/work-items/backlogs`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useProjectBacklogs = (projectId: string | undefined) =>
  useQuery({
    queryKey: projectQueryKeys.backlogsByProjectId(projectId),
    queryFn: () => findBacklogsByProjectId(projectId),
    enabled: Boolean(projectId),
    staleTime: STALE_TIME._30m,
  });
