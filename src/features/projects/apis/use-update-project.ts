import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { TProject, TUpdateProject } from "../project-schemas";
import { projectQueryKeys } from "./project-query-keys";

const updateProject = ({
  projectId,
  data,
}: {
  projectId: string;
  data: TUpdateProject;
}): Promise<TProject> =>
  api
    .patch(`/projects/${projectId}/organization/${data.organizationId}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useUpdateProject = (
  userId: string | undefined,
  organizationId: string | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.byUserAndOrg(userId, organizationId),
      }),
    onError: (error: { message: string }) => error,
  });
};
