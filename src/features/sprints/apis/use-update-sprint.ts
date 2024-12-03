import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectQueryKeys } from "@/features/projects/apis/project-query-keys";
import { api } from "@/lib/api-client";

import { TSprint, TUpdateSprint } from "../sprint-schema";

const updateSprint = (data: TUpdateSprint): Promise<TSprint> =>
  api
    .patch(`/projects/${data.projectId}/sprints/${data.id}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useUpdateSprint = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSprint,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.sprintsByProjectId(projectId),
      }),
    onError: (error: { message: string }) => error,
  });
};
