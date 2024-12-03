import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectQueryKeys } from "@/features/projects/apis/project-query-keys";
import { api } from "@/lib/api-client";

import { TSprint } from "../sprint-schema";

const deleteSprint = ({
  sprintId,
  projectId,
}: {
  sprintId: string;
  projectId: string;
}): Promise<TSprint> =>
  api
    .delete(`/projects/${projectId}/sprints/${sprintId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useDeleteSprint = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSprint,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.sprintsByProjectId(projectId),
      }),
    onError: (error: { message: string }) => error,
  });
};
