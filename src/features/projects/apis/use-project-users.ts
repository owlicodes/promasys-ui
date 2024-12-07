import { useQuery } from "@tanstack/react-query";

import { TUser } from "@/features/users/user-schemas";
import { api } from "@/lib/api-client";

import { projectQueryKeys } from "./project-query-keys";

const findUsersByProjectId = (
  projectId: string | undefined
): Promise<TUser[]> =>
  api
    .get(`/projects/${projectId}/users`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useProjectUsers = (projectId: string | undefined) =>
  useQuery({
    queryKey: projectQueryKeys.projectUsers(projectId),
    queryFn: () => findUsersByProjectId(projectId),
    enabled: Boolean(projectId),
  });
