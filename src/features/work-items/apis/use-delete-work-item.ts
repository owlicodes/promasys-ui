import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectQueryKeys } from "@/features/projects/apis/project-query-keys";
import { api } from "@/lib/api-client";

import { TWorkItem } from "../work-item-schemas";

const deleteWorkItem = ({
  projectId,
  workItemId,
}: {
  projectId: string;
  workItemId: string;
}): Promise<TWorkItem> =>
  api
    .delete(`/projects/${projectId}/work-items/${workItemId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useDeleteWorkItem = (
  projectId: string | undefined,
  sprintId: string | null | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWorkItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.workItemsByProjectId(projectId),
      });
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.projectSprintById(projectId, sprintId),
      });
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.backlogsByProjectId(projectId),
      });
    },
    onError: (error: { message: string }) => error,
  });
};
