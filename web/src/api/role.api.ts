import type { Page, PaginationParams } from "@/types/paged";
import api from ".";
import type { AssignPermissions, Role, RoleDto, RolePage } from "@/types/role";
import type { Id, JsonResponse } from "@/types/json-response";

async function read(orgId: number | string, params: PaginationParams): Promise<Page<RolePage>> {
    const res = await api.get(`${orgId}/role`, {
        params: {
            filters: JSON.stringify(params.filters),
            page: params.page,
            size: params.size,
            sort: params.sort,
        },
    });

    return res.data;
}

async function update(id: number, input: RoleDto): Promise<JsonResponse<RoleDto>> {
    const res = await api.put(`/${input.organizationId}/role/${id}`, input);
    return res.data;
}

async  function getById(id: number, organizationId: number): Promise<JsonResponse<Role>> {
    const res = await api.get(`/${organizationId}/role/${id}`);
    return res.data;
}

async function assign(organizationId: number, input: AssignPermissions): Promise<JsonResponse<null>> {
    const res = await api.patch(`/${organizationId}/role/permission`, input);
    return res.data;
}

async function create(organizationId: number, input: RoleDto): Promise<JsonResponse<Id>> {
    const res = await api.post(`/${organizationId}/role`, input);
    return res.data;
}

const roleApi = {
    read,
    update,
    getById,
    assign,
    create,
};
export default roleApi;