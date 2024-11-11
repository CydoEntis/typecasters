import { Button, Stack, NavLink as MantineNavLink } from "@mantine/core";
import useLogout from "../../hooks/useLogout";
import { NavLink } from "react-router-dom";
import { Gamepad2, LogOut } from "lucide-react";
import ThemeToggle from "../theme/ThemeToggle";
type Props = {};

function AuthenticatedNavLinks({}: Props) {
	const logoutHandler = useLogout();

	return (
		<Stack style={{ flexGrow: 1 }}>
			<Stack gap={8}>
				<MantineNavLink
					component={NavLink}
					to="/game"
					leftSection={<Gamepad2 size={20} />}
					label="Dashboard"
					className="rounded-md"
					color="violet"
				/>
			</Stack>
			<Stack mt="auto">
				<Button
					justify="start"
					leftSection={<LogOut size={20} />}
					variant="light"
					color="violet"
					h={40}
					onClick={logoutHandler}
				>
					Log out
				</Button>
				<ThemeToggle />
			</Stack>
		</Stack>
	);
}

export default AuthenticatedNavLinks;
