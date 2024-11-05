import { useForm } from "@mantine/form";
import {
	TextInput,
	PasswordInput,
	Text,
	Paper,
	Group,
	PaperProps,
	Button,
	Divider,
	Anchor,
	Stack,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
// import { GoogleButton } from "./GoogleButton";
// import { TwitterButton } from "./TwitterButton";

function LoginForm(props: PaperProps) {
	const form = useForm({
		initialValues: {
			email: "",
			name: "",
			password: "",
			terms: true,
		},

		validate: {
			email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
			password: (val) =>
				val.length <= 6
					? "Password should include at least 6 characters"
					: null,
		},
	});

	return (
		<form onSubmit={form.onSubmit(() => {})}>
			<Stack>
				<TextInput
					label="Email"
					placeholder="hello@mantine.dev"
					value={form.values.email}
					onChange={(event) =>
						form.setFieldValue("email", event.currentTarget.value)
					}
					error={form.errors.email && "Invalid email"}
					radius="sm"
				/>
				<PasswordInput
					label="Password"
					placeholder="Your password"
					value={form.values.password}
					onChange={(event) =>
						form.setFieldValue("password", event.currentTarget.value)
					}
					error={
						form.errors.password &&
						"Password should include at least 6 characters"
					}
					radius="sm"
				/>
			</Stack>
			<Group
				justify="space-between"
				mt="xl"
			>
				<Anchor
					component={NavLink}
					type="button"
					c="dimmed"
					size="xs"
					to="/register"
				>
					Don't have an account? Register
				</Anchor>
				<Button
					type="submit"
					radius="sm"
					color="orange"
				>
					Login
				</Button>
			</Group>
		</form>
	);
}

export default LoginForm;
