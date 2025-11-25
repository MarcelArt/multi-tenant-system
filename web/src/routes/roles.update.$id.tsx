import rolePermissionApi from '@/api/role-permission.api';
import roleApi from '@/api/role.api';
import { PermissionMappingTab } from '@/components/permission-mapping-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UnauthorizedComponent } from '@/components/unauthorized-component';
import { UpdateRoleTab } from '@/components/update-role-tab';
import { usePermission } from '@/context/permission-context';
import useOrganization from '@/hooks/useOrganization';
import { FiltersBuilder } from '@/types/paged.d';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/roles/update/$id')({
	component: RouteComponent,
	loader: async ({ params }) => {
		const { id } = params;
		const { organizationId } = useOrganization.getState();

		const role = await roleApi.getById(+id, organizationId);
		return {
			crumbs: [
				{ title: 'User Management', link: '#' },
				{ title: 'Roles', link: '/roles' },
				{ title: role.items.value, link: '#' },
			],
		};
	},
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { isAuthorized } = usePermission();

	const filters = new FiltersBuilder({ behaviour: 'and' }).eq('role_id', id).build();

	const params = {
		filters,
		page: 0,
		size: 300,
	};

	const { data, status } = useQuery({
		queryKey: ['role-permissions', params],
		queryFn: () => rolePermissionApi.read(params),
	});

	if (!isAuthorized('role#manage')) return <UnauthorizedComponent/>

	return (
		// <div className="flex w-full max-w-sm flex-col gap-6 p-6">
		<div className="flex min-h-svh flex-col items-center gap-6 p-6 md:p-10">
			<Tabs className="w-full" defaultValue="details">
				<TabsList>
					<TabsTrigger value="details">Details</TabsTrigger>
					<TabsTrigger value="permission">Permission Mapping</TabsTrigger>
				</TabsList>
				<TabsContent value="details">
					<UpdateRoleTab roleId={+id} />
				</TabsContent>
				<TabsContent value="permission">
					<PermissionMappingTab roleId={+id} currentPermissions={status === 'success' ? data.items.map((item) => item.permission) : []} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
