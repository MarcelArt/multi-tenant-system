import { GalleryVerticalEnd } from 'lucide-react';
import { useForm } from '@tanstack/react-form';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from '@tanstack/react-router';
import { LoginInputSchema, type LoginInput } from '@/types/user.d';
import { Checkbox } from './ui/checkbox';
import { useMutation } from '@tanstack/react-query';
import userApi from '@/api/user.api';
import useAuth from '@/hooks/useAuth';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
	const navigate = useNavigate({ from: '/login' });

	const { mutate } = useMutation({
		mutationFn: (value: LoginInput) => userApi.login(value),
		onSuccess: (data) => {
			localStorage.setItem('refreshToken', data.items.refreshToken);
			setUser(data.items.accessToken, data.items.username, data.items.email, data.items.userId);
			navigate({ to: '/' });
		},
		onError: (e) => console.log('e.stack :>> ', e.stack),
	});

	const { setUser, accessToken } = useAuth();

	const form = useForm({
		defaultValues: {
			username: '',
			password: '',
			isRemember: false,
		},
		validators: {
			onSubmit: LoginInputSchema,
		},
		onSubmit: async ({ value }) => {
			mutate(value);
		},
	});
	
	if (accessToken) {
		navigate({ to: '/' });
		return null;
	}

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
							Don&apos;t have an account? <Link to="/signup">Sign up</Link>
						</FieldDescription>
					</div>
					<form.Field
						name="username"
						children={(field) => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Username or Email</FieldLabel>
									<Input
										id={field.name}
										type="text"
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
										placeholder="Username or Email"
										required
									/>
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
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
										placeholder="Password"
										required
									/>
								</Field>
							);
						}}
					/>
					<form.Field
						name="isRemember"
						children={(field) => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<div className="flex items-center gap-3">
										<FieldLabel htmlFor={field.name}>Keep me logged in</FieldLabel>
										<Checkbox
											id={field.name}
											name={field.name}
											checked={field.state.value}
											onCheckedChange={(isChecked) => field.handleChange(isChecked === 'indeterminate' ? false : isChecked)}
										/>
									</div>
								</Field>
							);
						}}
					/>
					<Field>
						<Button type="submit">Login</Button>
					</Field>
				</FieldGroup>
			</form>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
			</FieldDescription>
		</div>
	);
}
