import { Stack, NavLink as MantineNavLink } from "@mantine/core";
import { NavLink } from "react-router-dom";
import ThemeToggle from "../theme/ThemeToggle";
import styles from "./nav.module.css";

type Props = {};

function UnauthenticatedNavLinks({}: Props) {
	return (
		<Stack style={{ flexGrow: 1 }}>
			<Stack gap={8}>
				<MantineNavLink
					color="orange"
					variant="filled"
					label="Login"
					component={NavLink}
					to="/login"
					className="rounded"
					classNames={{
						root: styles.navLinkRoot,
					}}
				/>
				<MantineNavLink
					color="orange"
					variant="filled"
					label="Register"
					component={NavLink}
					to="/register"
					className="rounded"
					classNames={{
						root: styles.navLinkRoot,
					}}
				/>
			</Stack>
			<Stack mt="auto">
				<ThemeToggle />
			</Stack>
		</Stack>
	);
}

export default UnauthenticatedNavLinks;
