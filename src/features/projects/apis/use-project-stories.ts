import { useQuery } from "@tanstack/react-query";

import { TWorkItem } from "@/features/work-items/work-item-schemas";
import { api } from "@/lib/api-client";

import { projectQueryKeys } from "./project-query-keys";

const findStoryWorkItemsByProjectId = (
  projectId: string | undefined
): Promise<TWorkItem[]> =>
  api
    .get(`/projects/${projectId}/stories`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useProjectStories = (projectId: string | undefined) =>
  useQuery({
    queryKey: projectQueryKeys.projectStories(projectId),
    queryFn: () => findStoryWorkItemsByProjectId(projectId),
    enabled: Boolean(projectId),
  });
