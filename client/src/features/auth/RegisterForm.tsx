import { useForm } from "@mantine/form";
import {
	TextInput,
	PasswordInput,
	Group,
	Button,
	Stack,
	Anchor,
} from "@mantine/core";
import { NavLink } from "react-router-dom";


function RegisterForm() {
	const form = useForm({
		initialValues: {
			email: "",
			name: "",
			password: "",
			confirmPassword: "",
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
			<Stack gap={16}>
				<TextInput
					label="Email"
					placeholder="you@example.com"
					{...form.getInputProps("email")}
					radius="sm"
				/>
				<TextInput
					label="Display Name"
					placeholder="TaskSlayer1337"
					{...form.getInputProps("displayName")}
					radius="sm"
				/>
			</Stack>
			{/* <ValidatedPasswordInput form={form} /> */}
			<PasswordInput
				label="Password"
				placeholder="Your Password"
				mt="md"
				{...form.getInputProps("password")}
				onChange={(event) => {
					form.setFieldValue("password", event.currentTarget.value);
				}}
				radius="sm"
			/>

			<PasswordInput
				label="Confirm Password"
				placeholder="Confirm your password"
				mt="md"
				{...form.getInputProps("confirmPassword")}
				onChange={(event) => {
					form.setFieldValue("confirmPassword", event.currentTarget.value);
				}}
				radius="sm"
			/>

			<Group
				justify="space-between"
				mt="xl"
			>
				<Anchor
					component={NavLink}
					type="button"
					c="dimmed"
					size="xs"
					to="/login"
				>
					Already have an account? Log in.
				</Anchor>
				<Button
					type="submit"
					radius="sm"
					color="orange"
				>
					Register
				</Button>
			</Group>
		</form>
	);
}

export default RegisterForm;
