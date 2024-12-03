import { create } from "zustand";

import { TOrganization } from "@/features/organizations/organization-schemas";

export type SelectedOrganization = TOrganization;

interface SelectedOrganizationState {
  selectedOrganization: SelectedOrganization | undefined;
  setSelectedOrganization: (
    selectedOrganization: SelectedOrganization | undefined
  ) => void;
}

const useSelectedOrganizationStore = create<SelectedOrganizationState>()(
  (set) => ({
    selectedOrganization: undefined,
    setSelectedOrganization: (selectedOrganization) =>
      set(() => ({ selectedOrganization })),
  })
);

export default useSelectedOrganizationStore;
