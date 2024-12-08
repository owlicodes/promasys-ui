import { useQuery } from "@tanstack/react-query";

import { TWorkItem } from "@/features/work-items/work-item-schemas";
import { api } from "@/lib/api-client";

import { projectQueryKeys } from "./project-query-keys";

const findProjectWorkItemDetails = ({
  projectId,
  workItemId,
}: {
  projectId: string | undefined;
  workItemId: string | undefined;
}): Promise<TWorkItem> =>
  api
    .get(`/projects/${projectId}/work-items/${workItemId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useProjectWorkItemDetails = ({
  projectId,
  workItemId,
}: {
  projectId: string | undefined;
  workItemId: string | undefined;
}) =>
  useQuery({
    queryKey: projectQueryKeys.workItemDetailsByProjectIdAndWorkItemId({
      projectId,
      workItemId,
    }),
    queryFn: () => findProjectWorkItemDetails({ projectId, workItemId }),
    enabled: Boolean(projectId) && Boolean(workItemId),
  });
