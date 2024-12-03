import { useQuery } from "@tanstack/react-query";

import { projectQueryKeys } from "@/features/projects/apis/project-query-keys";
import { TSprint } from "@/features/sprints/sprint-schema";
import { api } from "@/lib/api-client";

const findSprintById = (
  projectId: string,
  sprintId: string
): Promise<TSprint> =>
  api
    .get(`/projects/${projectId}/sprints/${sprintId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useSprintDetails = (projectId: string, sprintId: string) =>
  useQuery({
    queryKey: projectQueryKeys.projectSprintById(projectId, sprintId),
    queryFn: () => findSprintById(projectId, sprintId),
    enabled: Boolean(projectId) && Boolean(sprintId),
  });
