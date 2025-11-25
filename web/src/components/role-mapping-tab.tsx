import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Combobox } from './combobox';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Field } from './ui/field';
import { Label } from './ui/label';
import roleApi from '@/api/role.api';
import { useState } from 'react';
import { FiltersBuilder, type PaginationParams } from '@/types/paged.d';
import useOrganization from '@/hooks/useOrganization';
import userApi from '@/api/user.api';
import { toast } from 'sonner';
import { unwrapAxiosError } from '@/lib/api-error';

export interface RoleMappingTabProps {
  userId: number;
  currentRoleIds: number[];
}

export function RoleMappingTab({ userId, currentRoleIds }: RoleMappingTabProps) {
  const [search, setSearch] = useState('');
  const [roleIds, setRoleIds] = useState<number[]>(currentRoleIds);
  const { organizationId } = useOrganization();
  const queryClient = useQueryClient();

  const filters = new FiltersBuilder({ behaviour: 'and' }).like('value', search).build();
  const params: PaginationParams = {
    filters,
    page: 0,
    size: 300,
  };

  const { data, status } = useQuery({
    queryKey: ['roles-combobox', organizationId, params],
    queryFn: () => roleApi.read(organizationId, params),
  });

  const { mutate } = useMutation({
    mutationFn: () => userApi.assign(organizationId, { userId, roleIds }),
    onSuccess: () => {
      toast.success('Roles assigned successfully');
      queryClient.invalidateQueries({ queryKey: ['users-with-roles', organizationId] });
    },
    onError: (e) => toast.error(`Failed to assign roles: ${unwrapAxiosError(e)}`),
  });

	return (
		<Card>
			<CardHeader>
				<CardTitle>Role Mapping</CardTitle>
				<CardDescription>Assign roles to this user</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-6">
				<div className="grid gap-3">
					<Label htmlFor="roles">Roles</Label>
					<Combobox
            initialValues={currentRoleIds.map(roleId => roleId.toString())}
						className="w-md"
						empty="No roles found"
						searchPlaceholder="Search..."
						onSearch={setSearch}
						placeholder="Roles"
						items={status === 'success' ? data.items.map((item) => ({ value: item.ID.toString(), label: item.value })) : []}
						onValueChange={(ids) => setRoleIds(ids.map(id => +id))}
            maxDisplay={5}
					/>
				</div>
			</CardContent>
			<CardFooter className="grid grid-cols-11">
				<div className="col-span-9"></div>
				<Field className="col-span-2">
					<Button onClick={() => mutate()}>Save</Button>
				</Field>
			</CardFooter>
		</Card>
	);
}
