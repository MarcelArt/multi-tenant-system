import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { useForm } from '@tanstack/react-form';
import { UserDtoSchema, type UserDto } from '@/types/user.d';
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field';
import userApi from '@/api/user.api';
import useOrganization from '@/hooks/useOrganization';
import type { UserOrganizationDto } from '@/types/user-organization';
import userOrganizationApi from '@/api/user-organization.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useState } from 'react';
import { unwrapAxiosError } from '@/lib/api-error';

export function CreateUserDialog() {
	const queryClient = useQueryClient();
	const { organizationId } = useOrganization();
	const [isOpen, setIsOpen] = useState(false);
	
	const createAndAddUserToOrg = async (input: UserDto) => {
		const user =  await userApi.create(input);
		const userOrganizationInput: UserOrganizationDto = {
			organizationId,
			status: 'active',
			userId: user.items.ID,
		};

		await userOrganizationApi.create(userOrganizationInput);
	}

	const { mutate } = useMutation({
		mutationFn: (input: UserDto) => createAndAddUserToOrg(input),
		onSuccess: () => {
			toast.success('User created and added to organization');
			queryClient.invalidateQueries({
				queryKey: ['orgs-members'],
			});
			queryClient.invalidateQueries({
				queryKey: ['users-with-roles', organizationId],
			});
			setIsOpen(false);
		},
		onError: (e) => toast.error(`Failed to create user: ${unwrapAxiosError(e)}`),
	})

	const form = useForm({
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validators: {
			onSubmit: UserDtoSchema,
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
					Create user
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
							<DialogTitle>Create user</DialogTitle>
							<DialogDescription>Create new user to organization</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4">
							<div className="grid gap-3">
								<form.Field
									name="email"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Email</FieldLabel>
												<Input
													type="email"
													id={field.name}
													name={field.name}
													placeholder="email@example.com"
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
							<div className="grid gap-3">
								<form.Field
									name="username"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Username</FieldLabel>
												<Input
													type="text"
													id={field.name}
													name={field.name}
													placeholder="Username"
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
							<div className="grid gap-3">
								<form.Field
									name="password"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Password</FieldLabel>
												<Input
													type="password"
													id={field.name}
													name={field.name}
													placeholder="Password"
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
							<div className="grid gap-3">
								<form.Field
									name="confirmPassword"
									children={(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field data-invalid={isInvalid}>
												<FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
												<Input
													type="password"
													id={field.name}
													name={field.name}
													placeholder="Confirm password"
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
