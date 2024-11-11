import { AppShell, Stack, NavLink as MantineNavLink } from "@mantine/core";
import { NavLink } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";
import AuthenticatedNavLinks from "./AuthenticatedNavLinks";

type Props = {};

function SideNavbar({}: Props) {
	const { user } = useUserStore();

	return (
		<AppShell.Navbar
			p="md"
			bg="secondary"
			style={{
				navbar: {},
			}}
		>
			{
				user?.isLoggedIn ? <AuthenticatedNavLinks /> : null
				// <UnauthenticatedNav />
			}

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
