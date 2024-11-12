import { AppShell, Stack, NavLink as MantineNavLink } from "@mantine/core";
import { NavLink } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";
import AuthenticatedNavLinks from "./AuthenticatedNavLinks";
import UnauthenticatedNavLinks from "./UnAuthenticatedNavLinks";

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
			withBorder={false}
			className="shadow-xl"
		>
			{user?.isLoggedIn ? (
				<AuthenticatedNavLinks />
			) : (
				<UnauthenticatedNavLinks />
			)}
		</AppShell.Navbar>
	);
}

export default SideNavbar;
