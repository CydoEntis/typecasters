import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";


import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";
import classes from "./input.module.css";

const registerFormSchema = z
	.object({
		email: z.string().email("Please enter a valid email"),
		username: z
			.string()
			.min(3, "Display name must be atleast 3 characters long."),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.regex(/[A-Z]/, "Password must have at least one uppercase letter")
			.regex(/[a-z]/, "Password must have at least one lowercase letter")
			.regex(/\d/, "Password must have at least one number")
			.regex(/[\W_]/, "Password must have at least one special character"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

type RegisterFormData = z.infer<typeof registerFormSchema>;

type Props = {};

function RegisterForm({}: Props) {
	const { register: registerUser } = useUserStore();
	const navigate = useNavigate();

	const form = useForm<RegisterFormData>({
		validate: zodResolver(registerFormSchema),
		initialValues: {
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(data: RegisterFormData) {
		try {
			await registerUser(data);

			form.reset();
			navigate("/game");
		} catch (error) {
			console.error(error);
			if (error instanceof AxiosError && error.response?.data?.errors) {
				const errors = error.response.data.errors as Record<string, string[]>;
				const fieldErrors: Record<string, string> = {};

				for (const [key, messages] of Object.entries(errors)) {
					if (Array.isArray(messages) && messages.length > 0) {
						fieldErrors[key] = messages[0];
					}
				}

				form.setErrors(fieldErrors);
			}
		}
	}

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack gap={16}>
				<TextInput
					label="Email"
					placeholder="you@example.com"
					{...form.getInputProps("email")}
					classNames={{
						input: classes.input,
					}}
				/>
				<TextInput
					label="Username"
					placeholder="PussySlayer6969"
					classNames={{
						input: classes.input,
					}}
					{...form.getInputProps("username")}
				/>
			</Stack>
			<PasswordInput
				label="Password"
				placeholder="Your password"
				mt="md"
				{...form.getInputProps("password")}
				onChange={(event) => {
					form.setFieldValue("password", event.currentTarget.value);
				}}
				classNames={{
					input: classes.input,
				}}
			/>
			<PasswordInput
				label="Confirm Password"
				placeholder="Confirm your password"
				mt="md"
				classNames={{
					input: classes.input,
				}}
				{...form.getInputProps("confirmPassword")}
				onChange={(event) => {
					form.setFieldValue("confirmPassword", event.currentTarget.value);
				}}
			/>

			<Button
				fullWidth
				mt="xl"
				color="orange"
				variant="filled"
				type="submit"
			>
				Sign in
			</Button>
		</form>
	);
}

export default RegisterForm;
