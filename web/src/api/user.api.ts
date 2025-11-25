import type { AssignRoles, LoginInput, LoginResponse, User, UserDto, UserPage, UserPassword, UserWithRoles } from "@/types/user";
import api from ".";
import type { Id, JsonResponse } from "@/types/json-response";
import { httpError } from "@/lib/api-error";
import type { PermissionKeys } from "@/types/permission";
import type { Page, PaginationParams } from "@/types/paged";

async function login(input: LoginInput): Promise<JsonResponse<LoginResponse>> {
    try {
        const res = await api.post("/user/login", input);
    
        return res.data;
    }
    catch (e) {
        throw httpError(e as Error);
    }
}

async function getPermissionsByOrgId(orgId: number): Promise<JsonResponse<PermissionKeys[]>> {
    try {
        const res = await api.get(`/user/permission/${orgId}`);
    
        return res.data;
    }
    catch (e) {
        throw httpError(e as Error);
    }
}

async function read({ filters, page = 0, size = 10, sort }: PaginationParams): Promise<Page<UserPage>> {
    const res = await api.get('/user', {
        params: {
            filters: JSON.stringify(filters),
            page,
            size,
            sort,
        }
    });

    return res.data;
}

async function create(input: UserDto): Promise<JsonResponse<Id>> {
    const res = await api.post('/user', input);

    return res.data;
}

async function getByOrgIdWithRoles(orgId: number, params: PaginationParams): Promise<Page<UserWithRoles>> {
    const res = await api.get(`/user/role/${orgId}`, {
        params: {
            filters: JSON.stringify(params.filters),
            page: params.page,
            size: params.size,
            sort: params.sort,
        }
    });

    return res.data;
}

async function update(id: number, input: UserDto | UserPassword): Promise<JsonResponse<null>> {
    const res = await api.put(`/user/${id}`, input);
    
    return res.data;
}

async function getById(id: number): Promise<JsonResponse<User>> {
    const res = await api.get(`/user/${id}`);
    
    return res.data;
}

async function assign(organizationId: number, input: AssignRoles): Promise<JsonResponse<null>> {
    const res = await api.patch(`/user/role/${organizationId}`, input);
    return res.data;
}

const userApi = {
    login,
    getPermissionsByOrgId,
    read,
    create,
    getByOrgIdWithRoles,
    update,
    getById,
    assign,
}
export default userApi;