import type { Page, PaginationParams } from "@/types/paged";
import type { RolePermissionPage } from "@/types/role-permission";
import api from ".";

async function read(params: PaginationParams): Promise<Page<RolePermissionPage>> {
    const res = await api.get("/role-permission", {
        params: {
            filters: JSON.stringify(params.filters),
            page: params.page,
            size: params.size,
            sort: params.sort,
        },
    });

    return res.data;
}

const rolePermissionApi = {
    read,
}
export default rolePermissionApi;