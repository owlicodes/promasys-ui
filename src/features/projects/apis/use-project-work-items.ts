import { useQuery } from "@tanstack/react-query";

import { STALE_TIME } from "@/features/common/apis/constants";
import { TWorkItem } from "@/features/work-items/work-item-schemas";
import { api } from "@/lib/api-client";

import { projectQueryKeys } from "./project-query-keys";

const findWorkItemsByProjectId = (projectId: string): Promise<TWorkItem[]> =>
  api
    .get(`/projects/${projectId}/work-items`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useProjectWorkItems = (projectId: string) =>
  useQuery({
    queryKey: projectQueryKeys.workItemsByProjectId(projectId),
    queryFn: () => findWorkItemsByProjectId(projectId),
    enabled: Boolean(projectId),
    staleTime: STALE_TIME._30m,
  });
