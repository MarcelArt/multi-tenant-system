import accessLogApi from '@/api/access-log.api';
import { DataTable } from '@/components/data-table';
import { TableHeaderFilterDropdown } from '@/components/table-header-filter-dropdown';
import { TableHeaderSearch } from '@/components/table-header-search';
import { Badge } from '@/components/ui/badge';
import { UnauthorizedComponent } from '@/components/unauthorized-component';
import { usePermission } from '@/context/permission-context';
import useOrganization from '@/hooks/useOrganization';
import type { AccessLogPage } from '@/types/access-log';
import { FiltersBuilder, type PaginationParams } from '@/types/paged.d';
import { PERMISSION_MAP, type PermissionKeys } from '@/types/permission.d';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import type { ColumnDef } from '@tanstack/react-table';
import { BadgeCheckIcon, BadgeMinus } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/access-logs/')({
	component: RouteComponent,
	loader: () => ({
		crumbs: [
			{ title: 'Organization', link: '#' },
			{ title: 'Access Logs', link: '#' },
		],
	}),
});

function RouteComponent() {
	const { organizationId } = useOrganization();
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [usernameFilter, setUsernameFilter] = useState('');
	const [permissionFilter, setPermissionFilter] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const { isAuthorized } = usePermission();

	const filterBuilder = new FiltersBuilder({ behaviour: 'and' });
	if (usernameFilter) filterBuilder.like('username', usernameFilter);
	if (permissionFilter) filterBuilder.like('permission', permissionFilter);
	if (statusFilter) filterBuilder.like('is_authorized', statusFilter);

	const params: PaginationParams = {
		filters: filterBuilder.build(),
		page,
		size,
		sort: '-created_at',
	};

	const { data, status } = useQuery({
		queryKey: ['access-logs', organizationId, params],
		queryFn: () => accessLogApi.read(organizationId, params),
	});

	const columns: ColumnDef<AccessLogPage>[] = [
		{
			accessorKey: 'ID',
			header: 'ID',
		},
		{
			accessorKey: 'username',
			header: () => <TableHeaderSearch button="Username" label="Search username" value={usernameFilter} onChange={setUsernameFilter} />,
		},
		{
			accessorKey: 'roles',
			header: 'Roles',
			cell: ({ row }) => {
				const { roles } = row.original;

				return roles?.length ? (
					roles.map((role, i) =>
						i < 3 ? (
							<Badge className="mr-1" key={i}>
								{role}
							</Badge>
						) : i === 3 ? (
							<Badge key={i}>+{roles.length - 3}</Badge>
						) : null,
					)
				) : (
					<Badge>None</Badge>
				);
			},
		},
		{
			accessorKey: 'permission',
			header: () => {
				const options = Object.entries(PERMISSION_MAP).map(([value, label]) => ({
					value,
					label,
				}));
				return (
					<TableHeaderFilterDropdown
						display={(value) => PERMISSION_MAP[value as PermissionKeys]}
						options={options}
						button="Action"
						label="Filter action"
						value={permissionFilter}
						onChange={setPermissionFilter}
					/>
				);
			},
			cell: ({ row }) => {
				const { permission } = row.original;
				return <Badge variant="secondary">{PERMISSION_MAP[permission as PermissionKeys]}</Badge>;
			},
		},
		{
			accessorKey: 'isAuthorized',
			header: () => {
				const options = [
					{ label: 'Authorized', value: 'true' },
					{ label: 'Denied', value: 'false' },
				];
				return (
					<TableHeaderFilterDropdown
						display={(value) => (value === 'true' ? 'Authorized' : 'Denied')}
						options={options}
						button="Status"
						label="Filter status"
						value={statusFilter}
						onChange={setStatusFilter}
					/>
				);
			},
			cell: ({ row }) => {
				const { isAuthorized } = row.original;

				return isAuthorized ? (
					<Badge>
						<BadgeCheckIcon />
						Authorized
					</Badge>
				) : (
					<Badge variant="destructive">
						<BadgeMinus />
						Denied
					</Badge>
				);
			},
		},
		{
			accessorKey: 'message',
			header: 'Message',
		},
		{
			accessorKey: 'createdAt',
			header: 'Date',
			cell: ({ row }) => {
				const { createdAt } = row.original;
				return new Date(createdAt).toLocaleString('en-GB');
			},
		},
	];

	if (!isAuthorized('accessLog#view')) return <UnauthorizedComponent />;
	if (status !== 'success') return null;

	return (
		<div className="container mx-auto py-10">
			<div className="flex flex-row justify-between">
				<h1 className="text-2xl pb-4">Users</h1>
				<div className="flex flex-row gap-2">
					{/* <PermissionProvider permissionKey="accessLog#view">
              <CreateUserDialog />
            </PermissionProvider> */}
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
