import { UserRoundPlus } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Combobox } from './combobox';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FiltersBuilder } from '@/types/paged.d';
import { useState } from 'react';
import userApi from '@/api/user.api';
import useOrganization from '@/hooks/useOrganization';
import userOrganizationApi from '@/api/user-organization.api';
import { toast } from 'sonner';
import { unwrapAxiosError } from '@/lib/api-error';

export function InviteMemberDialog() {
	const [search, setSearch] = useState('');
	const [userIds, setUserIds] = useState<string[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	const { organizationId } = useOrganization();

	const queryClient = useQueryClient();

	const filters = search ? new FiltersBuilder({ behaviour: 'and' }).like('username', search).or().like('email', search).build() : [];

	const { data, status } = useQuery({
		queryKey: ['users-combobox', search],
		queryFn: () => userApi.read({ filters }),
	});

	const { mutate } = useMutation({
		mutationFn: () => userOrganizationApi.inviteUsers({ userIds: userIds.map(userId => +userId), organizationId }),
		onSuccess: () => {
			toast.success(`Invitation sent to ${userIds.length} users`);
			queryClient.invalidateQueries({
				queryKey: ['orgs-members'],
			});
			setIsOpen(false);
			setUserIds([]);
		},
		onError: (e) => toast.error(`Failed to invite: ${unwrapAxiosError(e)}`),
	});

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">
					<UserRoundPlus />
					Invite member
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite new member</DialogTitle>
					<DialogDescription>Invite existing accounts to this organization</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4">
					<div className="grid gap-3">
						<Label htmlFor="name-1">Username or Email</Label>
						<Combobox
              className='w-md'
							empty="No users found"
							searchPlaceholder="Search..."
							onSearch={setSearch}
							placeholder="Username or Email"
							items={status === 'success' ? data.items.map((item) => ({ value: item.ID.toString(), label: `${item.username} - ${item.email}` })) : []}
							onValueChange={setUserIds}
						/>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button onClick={() => mutate()} type="submit">Invite</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
