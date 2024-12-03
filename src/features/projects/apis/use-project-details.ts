import { useQuery } from "@tanstack/react-query";

import { STALE_TIME } from "@/features/common/apis/constants";
import { api } from "@/lib/api-client";

import { TProject } from "../project-schemas";
import { projectQueryKeys } from "./project-query-keys";

const findProjectById = (projectId: string): Promise<TProject> =>
  api
    .get(`/projects/${projectId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useProjectDetails = (projectId: string) =>
  useQuery({
    queryKey: projectQueryKeys.byProjectId(projectId),
    queryFn: () => findProjectById(projectId),
    enabled: Boolean(projectId),
    staleTime: STALE_TIME._30m,
  });
