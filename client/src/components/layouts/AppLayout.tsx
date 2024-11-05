import React from "react";
import AppWrapper from "../wrappers/AppWrapper";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Navbar from "../navbars/Navbar";

type Props = {};

function AppLayout({}: Props) {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppWrapper opened={opened}>
			<Navbar
				opened={opened}
				toggle={toggle}
			/>
			<AppShell.Main>
				<Outlet />
			</AppShell.Main>
		</AppWrapper>
	);
}

export default AppLayout;
