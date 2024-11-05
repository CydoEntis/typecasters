import { Box, Center, Group, Paper, Text } from "@mantine/core";
import RegisterForm from "../../features/auth/RegisterForm";

type Props = {};

function RegisterPage({}: Props) {
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
					<RegisterForm />
				</Paper>
			</Center>
		</Box>
	);
}

export default RegisterPage;
