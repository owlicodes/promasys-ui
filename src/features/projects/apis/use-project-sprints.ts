import { useQuery } from "@tanstack/react-query";

import { TSprint } from "@/features/sprints/sprint-schema";
import { api } from "@/lib/api-client";

import { projectQueryKeys } from "./project-query-keys";

const findProjectSprints = (projectId: string): Promise<TSprint[]> =>
  api
    .get(`/projects/${projectId}/sprints`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useProjectSprints = (projectId: string) =>
  useQuery({
    queryKey: projectQueryKeys.sprintsByProjectId(projectId),
    queryFn: () => findProjectSprints(projectId),
    enabled: Boolean(projectId),
  });
