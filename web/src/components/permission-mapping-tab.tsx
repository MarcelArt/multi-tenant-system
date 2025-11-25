import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { type PermissionKeys } from '@/types/permission.d';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import roleApi from '@/api/role.api';
import useOrganization from '@/hooks/useOrganization';
import { toast } from 'sonner';
import { unwrapAxiosError } from '@/lib/api-error';

interface PermissionMappingTabProps {
	roleId: number;
  currentPermissions: PermissionKeys[];
}

export function PermissionMappingTab({ roleId, currentPermissions }: PermissionMappingTabProps) {
	const [permissions, setPermissions] = useState<PermissionKeys[]>(currentPermissions);
  const { organizationId } = useOrganization();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => roleApi.assign(organizationId, { permissions, roleId }),
    onSuccess: () => {
			toast.success('Permissions successfully assigned to role');
			queryClient.invalidateQueries({
				queryKey: ['role-permissions'],
			});
			queryClient.invalidateQueries({
				queryKey: ['roles'],
			});
		},
		onError: (e) => toast.error(`Failed to assgin permissions: ${unwrapAxiosError(e)}`),
  });

	const togglePermission = (permission: PermissionKeys, isChecked: boolean) => {
		const permissionSet = new Set(permissions);
		if (isChecked) {
			permissionSet.add(permission);
		} else {
			permissionSet.delete(permission);
		}
		setPermissions(Array.from(permissionSet));
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Permission Mapping</CardTitle>
				<CardDescription>Assign permissions to this role</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-6">
				<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-blue-900 has-aria-checked:bg-blue-950">
					<Checkbox
						checked={permissions.includes('fullAccess')}
						onCheckedChange={(c) => togglePermission('fullAccess', c.valueOf() === true)}
						id="full-access"
						className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
					/>
					<div className="grid gap-1.5 font-normal">
						<p className="text-sm leading-none font-medium">Full access</p>
						<p className="text-muted-foreground text-sm">Enabling this will allow users with this role to have read and write access to any resources.</p>
					</div>
				</Label>
				<Accordion type="multiple">
					{/* role */}
					<AccordionItem value="role">
						<AccordionTrigger className="text-xl">Role</AccordionTrigger>
						<AccordionContent className="grid grid-cols-3">
							<div className="flex items-center gap-3">
								<Checkbox id="role-view" onCheckedChange={(c) => togglePermission('role#view', c.valueOf() === true)} checked={permissions.includes('role#view')} />
								<Label htmlFor="role-view">View</Label>
							</div>
							<div className="flex items-center gap-3">
								<Checkbox id="role-manage" onCheckedChange={(c) => togglePermission('role#manage', c.valueOf() === true)} checked={permissions.includes('role#manage')} />
								<Label htmlFor="role-manage">Manage</Label>
							</div>
						</AccordionContent>
					</AccordionItem>

					{/* user */}
					<AccordionItem value="user">
						<AccordionTrigger className="text-xl">User</AccordionTrigger>
						<AccordionContent className="grid grid-cols-3">
							<div className="flex items-center gap-3">
								<Checkbox id="user-view" onCheckedChange={(c) => togglePermission('user#view', c.valueOf() === true)} checked={permissions.includes('user#view')} />
								<Label htmlFor="user-view">View</Label>
							</div>
							<div className="flex items-center gap-3">
								<Checkbox id="user-manage" onCheckedChange={(c) => togglePermission('user#manage', c.valueOf() === true)} checked={permissions.includes('user#manage')} />
								<Label htmlFor="user-manage">Manage</Label>
							</div>
							<div className="flex items-center gap-3">
								<Checkbox id="user-invite" onCheckedChange={(c) => togglePermission('userOrganization#invite', c.valueOf() === true)} checked={permissions.includes('userOrganization#invite')} />
								<Label htmlFor="user-invite">Invite</Label>
							</div>
						</AccordionContent>
					</AccordionItem>

					{/* organization */}
					<AccordionItem value="organization">
						<AccordionTrigger className="text-xl">Organization</AccordionTrigger>
						<AccordionContent className="grid grid-cols-3">
							<div className="flex items-center gap-3">
								<Checkbox
									id="organization-view"
									onCheckedChange={(c) => togglePermission('organization#view', c.valueOf() === true)}
									checked={permissions.includes('organization#view')}
								/>
								<Label htmlFor="organization-view">View</Label>
							</div>
							<div className="flex items-center gap-3">
								<Checkbox
									id="organization-manage"
									onCheckedChange={(c) => togglePermission('organization#manage', c.valueOf() === true)}
									checked={permissions.includes('organization#manage')}
								/>
								<Label htmlFor="organization-manage">Manage</Label>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</CardContent>
			<CardFooter>
				<div className="w-full"></div>
				<Button onClick={() => mutate()}>Save</Button>
			</CardFooter>
		</Card>
	);
}
