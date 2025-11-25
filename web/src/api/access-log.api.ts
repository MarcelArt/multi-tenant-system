import type { AccessLogPage } from "@/types/access-log";
import type { Page, PaginationParams } from "@/types/paged";
import api from ".";

async function read(orgId: number, params: PaginationParams): Promise<Page<AccessLogPage>> {
    const res = await api.get(`${orgId}/access-log`, {
        params: {
            filters: JSON.stringify(params.filters),
            page: params.page,
            size: params.size,
            sort: params.sort,
        },
    });

    return res.data;
}

const accessLogApi = {
    read,
}
export default accessLogApi;