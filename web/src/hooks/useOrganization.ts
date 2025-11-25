import { create } from "zustand";

interface OrganizationState {
    organizationId: number;
    setOrganizationId: (organizationId: number) => void;
}

const useOrganization = create<OrganizationState>()((set) => ({
    organizationId: 0,
    setOrganizationId: (organizationId: number) => set({ organizationId }),
}));
export default useOrganization;