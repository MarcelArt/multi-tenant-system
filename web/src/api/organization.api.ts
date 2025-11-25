import type { Id, JsonResponse } from '@/types/json-response';
import type { Organization, OrganizationInput } from '@/types/organization';
import api from '.';

async function create(input: OrganizationInput): Promise<JsonResponse<Id>> {
	const res = await api.post('/organization', input);

	return res.data;
}

async function getById(id: number): Promise<JsonResponse<Organization>> {
	const res = await api.get(`/organization/${id}`);
	return res.data;
}

async function update(id: number, input: OrganizationInput): Promise<JsonResponse<OrganizationInput>> {
	const res = await api.put(`/organization/${id}`, input);
	return res.data;
}

const organizationApi = {
	create,
	getById,
	update,
};
export default organizationApi;
