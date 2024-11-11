import { Stack, NavLink as MantineNavLink } from "@mantine/core";
import { NavLink } from "react-router-dom";
import ThemeToggle from "../theme/ThemeToggle";
type Props = {};

function UnauthenticatedNavLinks({}: Props) {
	return (
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
			</Stack>
			<Stack mt="auto">
				<ThemeToggle />
			</Stack>
		</Stack>
	);
}

export default UnauthenticatedNavLinks;
