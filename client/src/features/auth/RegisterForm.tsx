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
	Stack,
	Anchor,
} from "@mantine/core";
import { NavLink } from "react-router-dom";
// import { GoogleButton } from "./GoogleButton";
// import { TwitterButton } from "./TwitterButton";

function RegisterForm(props: PaperProps) {
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
				Join TypeCasters
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
				<Stack gap={16}>
					<TextInput
						label="Email"
						placeholder="you@example.com"
						{...form.getInputProps("email")}
					/>
					<TextInput
						label="Display Name"
						placeholder="TaskSlayer1337"
						{...form.getInputProps("displayName")}
					/>
				</Stack>
				{/* <ValidatedPasswordInput form={form} /> */}
				<PasswordInput
					label="Confirm Password"
					placeholder="Confirm your password"
					mt="md"
					{...form.getInputProps("confirmPassword")}
					onChange={(event) => {
						form.setFieldValue("confirmPassword", event.currentTarget.value);
					}}
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
		</Paper>
	);
}

export default RegisterForm;
