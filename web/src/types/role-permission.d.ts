import type { PermissionKeys } from "./permission";

export interface RolePermissionPage {
    ID: number;
    permission: PermissionKeys;
    roleId: number;
};