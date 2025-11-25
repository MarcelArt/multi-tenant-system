import z, { boolean, email } from 'zod';

export interface User {
    ID: number;
    username: string;
    email: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt?: string;
}

export interface UserPage {
	ID: number;
	username: string;
	email: string;
}

export interface UserWithRoles {
	ID: number;
	username: string;
	email: string;
	organizationId: number;
	roles: string;
	roleIds: string;
}

export interface LoginResponse {
	accessToken: string;
	refreshToken: string;
	userId: number;
	email: string;
	username: string;
}

export interface AssignRoles {
	userId: number;
	roleIds: number[];
}

export const LoginInputSchema = z.object({
	username: z.string().min(1, 'Username cannot be empty'),
	password: z.string().min(1, 'Password cannot be empty'),
	isRemember: z.boolean(),
});
// .refine(data => data.password === data.confirmPassword, 'Please ensure both password fields match');
export type LoginInput = z.infer<typeof LoginInputSchema>;

export const UserDtoSchema = z
	.object({
		username: z.string().min(1, 'Username cannot be empty'),
		email: z.email('Use a valid email format'),
		password: z.string().min(8, 'Password must be at least 8 characters long'),
		confirmPassword: z.string().min(8, 'Password must be at least 8 characters long'),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match',
				path: ['password'],
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match',
				path: ['confirmPassword'],
			});
		}
	});
export type UserDto = z.infer<typeof UserDtoSchema>;

export const UserPasswordSchema = z
	.object({
		password: z.string().min(8, 'Password must be at least 8 characters long'),
		confirmPassword: z.string().min(8, 'Password must be at least 8 characters long'),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match',
				path: ['password'],
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match',
				path: ['confirmPassword'],
			});
		}
	});
export type UserPassword = z.infer<typeof UserPasswordSchema>;