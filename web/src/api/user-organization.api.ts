import { httpError } from "@/lib/api-error";
import type { Page, PaginationParams } from "@/types/paged";
import type { InviteUser, UserOrganizationDto, UserOrganizationPage } from "@/types/user-organization";
import api from ".";
import type { Id, JsonResponse } from "@/types/json-response";

async function read({ filters, page = 0, size = 10, sort }: PaginationParams): Promise<Page<UserOrganizationPage>> {
    try {
        const res = await api.get("/user-organization", {
            params: {
                filters: JSON.stringify(filters),
                page,
                size,
                sort,
            },
        });
    
        return res.data;
    }
    catch (e) {
        throw httpError(e as Error);
    }
}

async function inviteUsers(invitation: InviteUser): Promise<JsonResponse<UserOrganizationDto>> {
    const res = await api.post('/user-organization/invite', invitation);
    return res.data;
}

async function create(input: UserOrganizationDto): Promise<JsonResponse<Id>> {
    const res = await api.post('/user-organization', input);
    return res.data;
}

const userOrganizationApi = {
    read,
    inviteUsers,
    create,
};
export default userOrganizationApi;