import { useQuery } from "@tanstack/react-query";

import { STALE_TIME } from "@/features/common/apis/constants";
import { api } from "@/lib/api-client";

import { TOrganization } from "../organization-schemas";
import { organizationQueryKeys } from "./organization-query-keys";

const findOrganizations = (): Promise<TOrganization[]> =>
  api
    .get("/organizations")
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });

export const useOrganizations = (userId: string | undefined) =>
  useQuery({
    queryKey: organizationQueryKeys.byUserId(userId),
    queryFn: findOrganizations,
    staleTime: STALE_TIME._30m,
  });
