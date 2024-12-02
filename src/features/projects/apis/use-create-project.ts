import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { TCreateProject, TProject } from "../project-schemas";
import { projectQueryKeys } from "./project-query-keys";

const createProject = (data: TCreateProject): Promise<TProject> =>
  api
    .post("/projects", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useCreateProject = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.byUserId(userId),
      }),
    onError: (error: { message: string }) => error,
  });
};
