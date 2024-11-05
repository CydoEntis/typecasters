import {
	AppShell,
	Button,
	Stack,
	NavLink as MantineNavLink,
} from "@mantine/core";
import { NavLink } from "react-router-dom";

type Props = {};

function SideNavbar({}: Props) {
	return (
		<AppShell.Navbar
			p="md"
			bg="secondary"
			style={{
				navbar: {},
			}}
		>
			<Stack style={{ flexGrow: 1 }}>
				<Stack gap={8}>
					<MantineNavLink
						color="orange"
						variant="light"
						label="Login"
						component={NavLink}
						to="/login"
						className="rounded"
					/>
					<MantineNavLink
						color="orange"
						variant="light"
						label="Register"
						component={NavLink}
						to="/register"
						className="rounded"
					/>
					<MantineNavLink
						color="orange"
						variant="light"
						label="Game Board"
						component={NavLink}
						to="/game"
						className="rounded"
					/>
				</Stack>
				<Stack mt="auto"></Stack>
			</Stack>
		</AppShell.Navbar>
	);
}

export default SideNavbar;
