import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectQueryKeys } from "@/features/projects/apis/project-query-keys";
import { api } from "@/lib/api-client";

import { TCreateSprint, TSprint } from "../sprint-schema";

const createSprint = (data: TCreateSprint): Promise<TSprint> =>
  api
    .post(`/projects/${data.projectId}/sprint`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useCreateSprint = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSprint,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.sprintsByProjectId(projectId),
      }),
    onError: (error: { message: string }) => error,
  });
};
