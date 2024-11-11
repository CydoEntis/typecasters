import {
	Anchor,
	Button,
	Checkbox,
	Group,
	PasswordInput,
	TextInput,
} from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";


import { z } from "zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { AxiosError } from "axios";
import useUserStore from "../../stores/useUserStore";

const loginFormSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email"),
	password: z.string().min(1, "Password is required"),
});
type LoginFormData = z.infer<typeof loginFormSchema>;

type Props = {};

function LoginForm({}: Props) {
	const { login: loginUser } = useUserStore();
	const navigate = useNavigate();

	const form = useForm<LoginFormData>({
		validate: zodResolver(loginFormSchema),
		initialValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: LoginFormData) {
		try {
			await loginUser(data);

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
			<TextInput
				label="Email"
				placeholder="you@example.com"
				{...form.getInputProps("email")} // Register email input
			/>
			<PasswordInput
				label="Password"
				placeholder="Your password"
				withAsterisk
				required
				mt="md"
				{...form.getInputProps("password")}
				onChange={(event) => {
					form.setFieldValue("password", event.currentTarget.value);
				}}
			/>
			<Group
				justify="space-between"
				mt="lg"
			>
				<Checkbox label="Remember me" />
				<Anchor
					component={NavLink}
					size="sm"
					c="orange"
					to={"/forgot-password"}
				>
					Forgot password?
				</Anchor>
			</Group>
			<Button
				fullWidth
				mt="xl"
				color="orange"
				variant="light"
				type="submit"
			>
				Sign in
			</Button>
		</form>
	);
}

export default LoginForm;
