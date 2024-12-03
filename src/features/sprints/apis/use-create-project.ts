import { useMutation } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { TCreateSprint, TSprint } from "../sprint-schema";

const createSprint = (data: TCreateSprint): Promise<TSprint> =>
  api
    .post(`/sprints/project/${data.projectId}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useCreateSprint = () => {
  return useMutation({
    mutationFn: createSprint,
    onError: (error: { message: string }) => error,
  });
};
