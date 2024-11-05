import { Box, Center, Group, Paper, Text } from "@mantine/core";
import LoginForm from "../../features/auth/LoginForm";

type Props = {};

function LoginPage({}: Props) {
	return (
		<Box w="100%">
			<Center mt={32}>
				<Paper
					radius="md"
					p="xl"
					withBorder
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
					></Group>
					<LoginForm />
				</Paper>
			</Center>
		</Box>
	);
}

export default LoginPage;
