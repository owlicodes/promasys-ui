import { useQuery } from "@tanstack/react-query";

import { projectQueryKeys } from "@/features/projects/apis/project-query-keys";
import { TSprint } from "@/features/sprints/sprint-schema";
import { TWorkItemKeyMap } from "@/features/work-items/work-item-schemas";
import { api } from "@/lib/api-client";

const findSprintById = (
  projectId: string,
  sprintId: string,
  filterType: TWorkItemKeyMap | "ALL"
): Promise<TSprint> =>
  api
    .get(`/projects/${projectId}/sprints/${sprintId}?type=${filterType}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useSprintDetails = (
  projectId: string,
  sprintId: string,
  filterType: TWorkItemKeyMap | "ALL"
) =>
  useQuery({
    queryKey: projectQueryKeys.projectSprintById(
      projectId,
      sprintId,
      filterType
    ),
    queryFn: () => findSprintById(projectId, sprintId, filterType),
    enabled: Boolean(projectId) && Boolean(sprintId),
  });
