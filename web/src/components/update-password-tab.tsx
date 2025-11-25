import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { UserPasswordSchema, type UserPassword } from "@/types/user.d";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import userApi from "@/api/user.api";
import { toast } from "sonner";

interface UpdatePasswordTabProps {
  userId: number;
}

export function UpdatePasswordTab({ userId }: UpdatePasswordTabProps) {
  const { mutate } = useMutation({
    mutationFn: (input: UserPassword) => userApi.update(userId, input),
    onSuccess: () => {
      toast.success('Password updated successfully');
    },
    onError: (error) => {
      toast.error(`Error updating password: ${error.message}`);
    }
  });

  const form = useForm({
      validators: {
        onSubmit: UserPasswordSchema,
      },
      defaultValues: {
        password: '',
        confirmPassword: '',
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
					<CardTitle>Change password</CardTitle>
					<CardDescription>Change password for this user</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-6">
					<div className="grid gap-3">
						<form.Field
							name="password"
							children={(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>New password</FieldLabel>
										<Input
											id={field.name}
											type="password"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="New password"
											required
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
										<FieldLabel htmlFor={field.name}>Confirm new password</FieldLabel>
										<Input
											id={field.name}
											type="password"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="Confirm new password"
											required
										/>
										{isInvalid && <FieldError errors={field.state.meta.errors} />}
									</Field>
								);
							}}
						/>
					</div>
				</CardContent>
				<CardFooter className="grid grid-cols-11">
					<div className="col-span-7"></div>
					<Field className="col-span-4">
						<Button type="submit">Change password</Button>
					</Field>
				</CardFooter>
			</Card>
		</form>
	);
}
