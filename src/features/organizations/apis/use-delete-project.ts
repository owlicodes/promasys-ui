import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectQueryKeys } from "@/features/projects/apis/project-query-keys";
import { TProject } from "@/features/projects/project-schemas";
import { api } from "@/lib/api-client";

const deleteProject = (projectId: string): Promise<TProject> => {
  return api
    .delete(`/projects/${projectId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useDeleteProject = (
  userId: string | undefined,
  organizationId: string | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.byUserAndOrg(userId, organizationId),
      }),
    onError: (error: { message: string }) => error,
  });
};
