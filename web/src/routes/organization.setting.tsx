import organizationApi from '@/api/organization.api';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { UnauthorizedComponent } from '@/components/unauthorized-component';
import { PermissionProvider, usePermission } from '@/context/permission-context';
import useOrganization from '@/hooks/useOrganization';
import { unwrapAxiosError } from '@/lib/api-error';
import { OrganizationInputSchema, type OrganizationInput } from '@/types/organization.d';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Building2 } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/organization/setting')({
	component: RouteComponent,
	loader: () => ({
		crumbs: [
			{ title: 'Organization', link: '#' },
			{ title: 'Setting', link: '#' },
		],
	}),
});

function RouteComponent() {
	const queryClient = useQueryClient();
	const { organizationId } = useOrganization();
	const { isAuthorized } = usePermission();

	const { status, data } = useQuery({
		queryKey: ['organization', organizationId],
		queryFn: () => organizationApi.getById(organizationId),
	});

	const { mutate } = useMutation({
		mutationFn: (input: OrganizationInput) => organizationApi.update(organizationId, input),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['orgs-of-user'],
			});
			queryClient.invalidateQueries({
				queryKey: ['organization', organizationId],
			});
			toast.success(`Organization ${data?.items.shortName ?? ''} has been updated`);
		},
		onError: (e) => {
			toast.error(`Organization ${data?.items.shortName ?? ''} has not been updated: ${unwrapAxiosError(e)}`);
		},
	});

	const form = useForm({
		validators: {
			onSubmit: OrganizationInputSchema,
		},
		defaultValues: {
			shortName: data?.items.shortName ?? '',
			longName: data?.items.longName ?? '',
			code: data?.items.code ?? '',
		},
		onSubmit: ({ value }) => mutate(value),
	});

	if (!isAuthorized('organization#view')) return <UnauthorizedComponent />;
	if (status !== 'success') return null;

	return (
		<div className="flex min-h-svh flex-col items-center gap-6 p-6 md:p-10">
			<div className="flex flex-col gap-6 w-full max-w-7xl">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						<div className="flex flex-col items-center gap-2 text-center">
							<a href="#" className="flex flex-col items-center gap-2 font-medium">
								<div className="flex size-8 items-center justify-center rounded-md">
									<Building2 className="size-6" />
								</div>
							</a>
							<h1 className="text-xl font-bold">Update organization {data.items.longName}</h1>
						</div>
						<form.Field
							name="shortName"
							children={(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Short name</FieldLabel>
										<Input
											id={field.name}
											type="text"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="Short name"
											required
										/>
									</Field>
								);
							}}
						/>
						<form.Field
							name="longName"
							children={(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Long name</FieldLabel>
										<Input
											id={field.name}
											type="text"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="Long name"
											required
										/>
									</Field>
								);
							}}
						/>
						<form.Field
							name="code"
							children={(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Organization code</FieldLabel>
										<Input
											id={field.name}
											type="text"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="Organization code"
											required
										/>
									</Field>
								);
							}}
						/>
						<div className="grid grid-cols-12">
							<div className="col-span-11"></div>
							<Field className="col-span-1">
								<PermissionProvider permissionKey='organization#manage'>
									<Button type="submit">Update</Button>
								</PermissionProvider>
							</Field>
						</div>
					</FieldGroup>
				</form>
			</div>
		</div>
	);
}
