import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectQueryKeys } from "@/features/projects/apis/project-query-keys";
import { api } from "@/lib/api-client";

import { TCreateWorkItem, TWorkItem } from "../work-item-schemas";

const createWorkItem = (data: TCreateWorkItem): Promise<TWorkItem> =>
  api
    .post(`/projects/${data.projectId}/work-items`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useCreateWorkItem = (projectId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkItem,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.workItemsByProjectId(projectId),
      }),
    onError: (error: { message: string }) => error,
  });
};
