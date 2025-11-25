import userApi from '@/api/user.api';
import { CreateUserDialog } from '@/components/create-user-dialog';
import { DataTable } from '@/components/data-table';
import { TableHeaderSearch } from '@/components/table-header-search';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { UnauthorizedComponent } from '@/components/unauthorized-component';
import { PermissionProvider, usePermission } from '@/context/permission-context';
import useOrganization from '@/hooks/useOrganization';
import { FiltersBuilder } from '@/types/paged.d';
import type { UserWithRoles } from '@/types/user.d';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, ShieldBan } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/users/')({
	component: RouteComponent,
	loader: () => ({
		crumbs: [
			{ title: 'User Management', link: '#' },
			{ title: 'Users', link: '#' },
		],
	}),
});

function RouteComponent() {
	const { organizationId } = useOrganization();
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [usernameFilter, setUsernameFilter] = useState('');
	const [emailFilter, setEmailFilter] = useState('');
	const { isAuthorized } = usePermission();

	const columns: ColumnDef<UserWithRoles>[] = [
		{
			accessorKey: 'username',
			header: () => <TableHeaderSearch button="Username" label="Search username" value={usernameFilter} onChange={setUsernameFilter} />,
		},
		{
			accessorKey: 'email',
			header: () => <TableHeaderSearch button="Email" label="Search email" value={emailFilter} onChange={setEmailFilter} />,
		},
		{
			accessorKey: 'roles',
			header: 'Roles',
			cell: ({ row }) => {
				const roles = row.getValue('roles') as string;
				let rolesSplitted = roles.split(';');
				rolesSplitted = rolesSplitted?.filter((p) => p.length > 0) ?? [];

				return rolesSplitted?.length ? (
					rolesSplitted.map((role, i) =>
						i < 9 ? (
							<Badge className="mr-1" key={i}>
								{role}
							</Badge>
						) : i === 9 ? (
							<Badge key={i}>+{rolesSplitted.length - 9}</Badge>
						) : null,
					)
				) : (
					<Badge>None</Badge>
				);
			},
		},
		{
			header: 'Actions',
			id: 'actions',
			cell: ({ row }) => {
				return (
					<PermissionProvider permissionKey="user#manage" deniedDisplay={<ShieldBan/>}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link to="/users/update/$id" params={{ id: row.original.ID.toString() }}>
									<Button variant="ghost" size="icon">
										<Pencil />
									</Button>
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Edit</p>
							</TooltipContent>
						</Tooltip>
					</PermissionProvider>
				);
			},
		},
	];

	const filtersBuilder = new FiltersBuilder({ behaviour: 'and'});
	if (usernameFilter) filtersBuilder.like('username', usernameFilter);
	if (emailFilter) filtersBuilder.like('email', emailFilter);
	const filters = filtersBuilder.build();

	const params = { filters, page, size };

	const { data, status } = useQuery({
		queryKey: ['users-with-roles', organizationId, params],
		queryFn: () => userApi.getByOrgIdWithRoles(organizationId, params),
	});

	if (!isAuthorized('user#view')) return <UnauthorizedComponent />;
	if (status !== 'success') return null;

	return (
		<div className="container mx-auto py-10">
			<div className="flex flex-row justify-between">
				<h1 className="text-2xl pb-4">Users</h1>
				<div className="flex flex-row gap-2">
					<PermissionProvider permissionKey="user#manage">
						<CreateUserDialog />
					</PermissionProvider>
				</div>
			</div>
			<DataTable
				columns={columns}
				data={data.items}
				first={data.first}
				last={data.last}
				max_page={data.max_page}
				page={page}
				setPage={setPage}
				setSize={setSize}
				size={data.size}
				total={data.total}
				total_pages={data.total_pages}
				visible={data.visible}
			/>
		</div>
	);
}
