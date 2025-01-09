import { useQuery } from "@tanstack/react-query";

import {
  TWorkItem,
  TWorkItemKeyMap,
} from "@/features/work-items/work-item-schemas";
import { api } from "@/lib/api-client";

import { projectQueryKeys } from "./project-query-keys";

const findProjectWorkItemDetails = ({
  projectId,
  workItemId,
  filterType,
}: {
  projectId: string | undefined;
  workItemId: string | undefined;
  filterType: TWorkItemKeyMap | "ALL";
}): Promise<TWorkItem> =>
  api
    .get(`/projects/${projectId}/work-items/${workItemId}?type=${filterType}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useProjectWorkItemDetails = ({
  projectId,
  workItemId,
  filterType,
}: {
  projectId: string | undefined;
  workItemId: string | undefined;
  filterType: TWorkItemKeyMap | "ALL";
}) =>
  useQuery({
    queryKey: projectQueryKeys.workItemDetailsByProjectIdAndWorkItemId({
      projectId,
      workItemId,
      filterType,
    }),
    queryFn: () =>
      findProjectWorkItemDetails({ projectId, workItemId, filterType }),
    enabled: Boolean(projectId) && Boolean(workItemId),
  });
