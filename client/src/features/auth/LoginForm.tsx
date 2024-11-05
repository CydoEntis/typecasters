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
		<Paper
			radius="md"
			p="xl"
			withBorder
			{...props}
			w={500}
		>
			<Text
				size="lg"
				fw={500}
			>
				Welcome Back to TypeCasters
			</Text>

			<Group
				grow
				mb="md"
				mt="md"
			>
				{/* <GoogleButton radius="xl">Google</GoogleButton>
				<TwitterButton radius="xl">Twitter</TwitterButton> */}
			</Group>

			<Divider
				label="Or continue with email"
				labelPosition="center"
				my="lg"
			/>

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
						radius="md"
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
						radius="md"
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
		</Paper>
	);
}

export default LoginForm;
