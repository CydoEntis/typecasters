import { AppShell, Burger, Button, Flex, Group } from "@mantine/core";
import { NavLink } from "react-router-dom";

type NavbarProps = {
	opened: boolean;
	toggle: () => void;
};

function Navbar({ opened, toggle }: NavbarProps) {
	return (
		<AppShell.Header
			bg="secondary"
			styles={{
				header: {
					// borderColor: `${isLightMode ? "#DCDEE0" : "#3A3A3A"}`,
				},
			}}
		>
			<Flex
				align="center"
				justify="space-between"
				h="100%"
				px={16}
			>
				<Group
					h="100%"
					px="md"
				>
					<Burger
						opened={opened}
						onClick={toggle}
						hiddenFrom="sm"
						size="sm"
					/>
				</Group>

				<Group>
					<Button
						component={NavLink}
						to="/login"
						variant="filled"
						color="orange"
					>
						Login
					</Button>
					<Button
						component={NavLink}
						to="/register"
						variant="outline"
						color="orange"
					>
						Register
					</Button>
				</Group>
			</Flex>
		</AppShell.Header>
	);
}

export default Navbar;
