import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectQueryKeys } from "@/features/projects/apis/project-query-keys";
import { api } from "@/lib/api-client";

import { TUpdateWorkItem, TWorkItem } from "../work-item-schemas";

const updateWorkItem = ({
  data,
  workItemId,
}: {
  data: TUpdateWorkItem;
  workItemId: string;
}): Promise<TWorkItem> =>
  api
    .patch(`/projects/${data.projectId}/work-items/${workItemId}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useUpdateWorkItem = (
  projectId: string | undefined,
  sprintId: string | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWorkItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.workItemsByProjectId(projectId),
      });
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.projectSprintById(projectId, sprintId),
      });
    },
    onError: (error: { message: string }) => error,
  });
};
