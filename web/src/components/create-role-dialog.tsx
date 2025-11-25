import useOrganization from '@/hooks/useOrganization';
import { unwrapAxiosError } from '@/lib/api-error';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import { RoleDtoSchema, type RoleDto } from '@/types/role.d';
import roleApi from '@/api/role.api';

export function CreateRoleDialog() {
	const queryClient = useQueryClient();
	const { organizationId } = useOrganization();
	const [isOpen, setIsOpen] = useState(false);

	const { mutate } = useMutation({
		mutationFn: (input: RoleDto) => roleApi.create(organizationId, input),
		onSuccess: () => {
			toast.success('Role created for the organization');
			queryClient.invalidateQueries({
				queryKey: ['roles'],
			});
			setIsOpen(false);
		},
		onError: (e) => toast.error(`Failed to create role: ${unwrapAxiosError(e)}`),
	});

	const form = useForm({
		defaultValues: {
      value: '',
      organizationId,
		},
		validators: {
			onSubmit: RoleDtoSchema,
		},
		onSubmit: async ({ value }) => {
			mutate(value);
		},
	});

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="default">
					<Plus />
					Create role
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<DialogHeader>
							<DialogTitle>Create role</DialogTitle>
							<DialogDescription>Create new role for the organization</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4">
							<div className="grid gap-3">
								<form.Field
									name="value"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Role name</FieldLabel>
												<Input
													type="text"
													id={field.name}
													name={field.name}
													placeholder="Role name"
													required
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													aria-invalid={isInvalid}
												/>
												{isInvalid && <FieldError errors={field.state.meta.errors} />}
											</Field>
										);
									}}
								/>
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<Button type="submit">Create</Button>
						</DialogFooter>
					</FieldGroup>
				</form>
			</DialogContent>
		</Dialog>
	);
}
