import { useMutation, useQueryClient } from "@tanstack/react-query";

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

export const useDeleteWorkItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWorkItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes("projects"),
      });
    },
    onError: (error: { message: string }) => error,
  });
};
