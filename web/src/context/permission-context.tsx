import userApi from "@/api/user.api";
import useAuth from "@/hooks/useAuth";
import useOrganization from "@/hooks/useOrganization";
import { FULL_ACCESS, type PermissionKeys } from "@/types/permission.d";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, type FC, type JSX, type ReactNode } from "react";

export interface PermissionContextProps {
    permissions: PermissionKeys[];
    isAuthorized: (permissionKey: PermissionKeys) => boolean;
}

const PermissionContext = createContext<PermissionContextProps>({
    permissions: [],
    isAuthorized: () => false,
} as PermissionContextProps)

interface PermissionContextProviderProps {
    children: ReactNode;
    permissionKey?: PermissionKeys;
    deniedDisplay?: JSX.Element;
}

export const PermissionProvider: FC<PermissionContextProviderProps> = ({ children, permissionKey, deniedDisplay }) => {
    let value: PermissionContextProps = {
        permissions: [],
        isAuthorized: () => false,
    }
    
    const { userId } = useAuth();
    const { organizationId } = useOrganization();
    
    const { data, status } = useQuery({
        queryKey: ['permission-of-user-in-org', userId, organizationId],
        queryFn: () => userApi.getPermissionsByOrgId(organizationId),
    });
    
    
    if (status !== 'success') return <PermissionContext.Provider value={value}></PermissionContext.Provider>
    
    
    value.permissions = data.items;
    value.isAuthorized = (key) => data.items.includes(key) || data.items.includes(FULL_ACCESS);
    
    if (!permissionKey) {
        return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>
    }

    const isAuthorized = value.permissions.includes(permissionKey) || value.permissions.includes(FULL_ACCESS);

    return <PermissionContext.Provider value={value}>{isAuthorized ? children : deniedDisplay}</PermissionContext.Provider>
}

export const usePermission = () => {
    return useContext(PermissionContext);
}