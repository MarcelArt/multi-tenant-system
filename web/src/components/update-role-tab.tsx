import useOrganization from '@/hooks/useOrganization';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useForm } from '@tanstack/react-form';
import { RoleDtoSchema, type RoleDto } from '@/types/role.d';
import roleApi from '@/api/role.api';
import { toast } from 'sonner';
import { unwrapAxiosError } from '@/lib/api-error';
import { Field, FieldError, FieldLabel } from './ui/field';

interface UpdateRoleTabProps {
	roleId: number;
}

export function UpdateRoleTab({ roleId }: UpdateRoleTabProps) {
	const queryClient = useQueryClient();
	const { organizationId } = useOrganization();

	const { data } = useQuery({
		queryKey: ['role', roleId],
		queryFn: () => roleApi.getById(roleId, organizationId),
	});

	const { mutate } = useMutation({
		mutationFn: (input: RoleDto) => roleApi.update(roleId, input),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['role', roleId],
			});
			queryClient.invalidateQueries({
				queryKey: ['roles', organizationId],
			});
			toast.success(`Role ${data?.items.value ?? ''} has been updated`);
		},
		onError: (e) => {
			toast.error(`Role ${data?.items.value ?? ''} has not been updated: ${unwrapAxiosError(e)}`);
		},
	});

	const form = useForm({
		validators: {
			onSubmit: RoleDtoSchema,
		},
		defaultValues: {
			value: data?.items.value ?? '',
			organizationId: organizationId,
		},
		onSubmit: ({ value }) => mutate(value),
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Card>
				<CardHeader>
					<CardTitle>{data?.items.value} Role Details</CardTitle>
					<CardDescription>Make changes to your role here. Click save when you&apos;re done.</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-6">
					<div className="grid gap-3">
						<form.Field
							name="value"
							children={(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Role name</FieldLabel>
										<Input
											id={field.name}
											type="text"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="Role name"
											required
										/>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						/>
					</div>
				</CardContent>
				<CardFooter className="grid grid-cols-12">
					<div className="col-span-11"></div>
					<Field className="col-span-1">
						<Button type="submit">Update</Button>
					</Field>
				</CardFooter>
			</Card>
		</form>
	);
}
