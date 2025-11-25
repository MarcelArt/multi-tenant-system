import userOrganizationApi from '@/api/user-organization.api';
import { CreateUserDialog } from '@/components/create-user-dialog';
import { DataTable } from '@/components/data-table';
import { InviteMemberDialog } from '@/components/invite-member-dialog';
import { Badge } from '@/components/ui/badge';
import { UnauthorizedComponent } from '@/components/unauthorized-component';
import { PermissionProvider, usePermission } from '@/context/permission-context';
import useOrganization from '@/hooks/useOrganization';
import { FiltersBuilder } from '@/types/paged.d';
import type { UserOrganizationPage } from '@/types/user-organization';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { BadgeCheckIcon } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/organization/members')({
	component: RouteComponent,
	loader: () => ({
		crumbs: [
			{ title: 'Organization', link: '#' },
			{ title: 'Members', link: '#' },
		],
	}),
});

function RouteComponent() {
	const { organizationId } = useOrganization();
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const { isAuthorized } = usePermission();

	const filtersBuilder = new FiltersBuilder({ behaviour: 'and' });
	const filters = filtersBuilder.eq('organization_id', organizationId).build();

	const param = { filters, page, size };
	const { data, status } = useQuery({
		queryKey: ['orgs-members', param],
		queryFn: () => userOrganizationApi.read(param),
	});

	if (!isAuthorized('user#view')) return <UnauthorizedComponent />;
	if (status !== 'success') return null;

	const columns: ColumnDef<UserOrganizationPage>[] = [
		{
			accessorKey: 'username',
			header: 'Username',
		},
		{
			accessorKey: 'email',
			header: 'Email',
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => {
				let status = row.getValue('status');
				return status === 'active' ? (
					<Badge variant="default">
						<BadgeCheckIcon />
						Active
					</Badge>
				) : (
					<Badge variant="destructive">Pending</Badge>
				);
			},
		},
	];

	return (
		<div className="container mx-auto py-10">
			<div className="flex flex-row justify-between">
				<h1 className="text-2xl pb-4">Members</h1>
				<div className="flex flex-row gap-2">
					<PermissionProvider permissionKey="userOrganization#invite">
						<InviteMemberDialog />
					</PermissionProvider>
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
