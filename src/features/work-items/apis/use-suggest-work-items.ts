import { useMutation } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

const suggestWorkItems = (message: string): Promise<string> => {
  return api
    .post("/openai/prompt", {
      message,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useSuggestWorkItems = () =>
  useMutation({
    mutationFn: suggestWorkItems,
    onError: (error: { message: string }) => error,
  });
