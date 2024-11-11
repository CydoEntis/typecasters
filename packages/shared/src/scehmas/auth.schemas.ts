import { z } from "zod";

export const registerSchema = z
	.object({
		email: z.string().email(),
		username: z.string().min(3),
		password: z.string().min(6),
		confirmPassword: z.string().min(6),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type RegisterCredentials = z.infer<typeof registerSchema>;


export const loginSchema = z.object({
	email: z.string().email("Please provide a valid email"),
	password: z.string().min(1, "Please provide a password"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;