import userApi from '@/api/user.api';
import { RoleMappingTab } from '@/components/role-mapping-tab';
import { UnauthorizedComponent } from '@/components/unauthorized-component';
import { UpdatePasswordTab } from '@/components/update-password-tab';
import { usePermission } from '@/context/permission-context';
import useOrganization from '@/hooks/useOrganization';
import { FiltersBuilder } from '@/types/paged.d';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/users/update/$id')({
	component: RouteComponent,
	loader: async ({ params }) => {
		const { id } = params;

		const user = await userApi.getById(+id);
		return {
			crumbs: [
				{ title: 'User Management', link: '#' },
				{ title: 'Users', link: '/users' },
				{ title: user.items.username, link: '#' },
			],
		};
	},
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { organizationId } = useOrganization();
	const { isAuthorized } = usePermission();

	const filtersBuilder = new FiltersBuilder({ behaviour: 'and' }).eq('id', id);
	const filters = filtersBuilder.build();

	const params = { filters, page: 0, size: 1 };

	const { data, status } = useQuery({
		queryKey: ['users-with-roles', organizationId, params],
		queryFn: () => userApi.getByOrgIdWithRoles(organizationId, params),
	});

	if (!isAuthorized('user#manage')) return <UnauthorizedComponent />;

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-2xl pb-4">Members</h1>
			<div className="grid grid-cols-3 gap-10">
				<UpdatePasswordTab userId={+id} />
				<RoleMappingTab userId={+id} currentRoleIds={status === 'success' && data.items.length ? data.items[0].roleIds.split(';').map((roleId) => +roleId) : []} />
			</div>
		</div>
	);

	// return (
	// 	<div className="flex min-h-svh flex-col items-start gap-6 p-6 md:p-10">
	// 		<Tabs className="w-lg" defaultValue="password">
	// 			<TabsList>
	// 				<TabsTrigger value="password">Password</TabsTrigger>
	// 				<TabsTrigger value="role">Role Mapping</TabsTrigger>
	// 			</TabsList>
	// 			<TabsContent value="password">
	// 				<UpdatePasswordTab userId={+id} />
	// 			</TabsContent>
	// 			<TabsContent value="role">
	// 				<RoleMappingTab />
	// 				{/* <PermissionMappingTab roleId={+id} currentPermissions={status === 'success' ? data.items.map((item) => item.permission) : []} /> */}
	// 			</TabsContent>
	// 		</Tabs>
	// 	</div>
	// );
}
