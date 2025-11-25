import { GalleryVerticalEnd } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { UserDtoSchema, type UserDto } from '@/types/user.d';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import userApi from '@/api/user.api';
import { toast } from 'sonner';
import { unwrapAxiosError } from '@/lib/api-error';

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate } = useMutation({
		mutationFn: (input: UserDto) => userApi.create(input),
		onSuccess: () => {
			toast.success('You have successfully created an account');
			queryClient.invalidateQueries({
				queryKey: ['orgs-members'],
			});
			navigate({ to: '/login' });
		},
		onError: (e) => toast.error(`Failed to register user: ${unwrapAxiosError(e)}`),
	});

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
		<div className={cn('flex flex-col gap-6', className)} {...props}>
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
								<GalleryVerticalEnd className="size-6" />
							</div>
							<span className="sr-only">Formigo.</span>
						</a>
						<h1 className="text-xl font-bold">Welcome to Formigo.</h1>
						<FieldDescription>
							Already have an account? <Link to="/login">Sign in</Link>
						</FieldDescription>
					</div>
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
										placeholder="m@example.com"
										required
										name={field.name}
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
					<form.Field
						name="username"
						children={(field) => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Username</FieldLabel>
									<Input
										id={field.name}
										type="text"
										placeholder="Username"
										required
										name={field.name}
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
					<form.Field
						name="password"
						children={(field) => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Password</FieldLabel>
									<Input
										id={field.name}
										type="password"
										placeholder="Password"
										required
										name={field.name}
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
					<form.Field
						name="confirmPassword"
						children={(field) => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
									<Input
										id={field.name}
										type="password"
										placeholder="Confirm password"
										required
										name={field.name}
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
					{/* <Field className="grid gap-4 sm:grid-cols-2">
						<FieldLabel htmlFor="password">Password</FieldLabel>
						<FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
						<Input id="password" type="password" placeholder="Password" required />
						<Input id="confirm-password" type="password" placeholder="Password" required />
					</Field> */}
					<Field>
						<Button type="submit">Create Account</Button>
					</Field>
				</FieldGroup>
			</form>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
			</FieldDescription>
		</div>
	);
}
