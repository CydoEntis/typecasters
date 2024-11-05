import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

type AppWrapperProps = {
	opened: boolean;
	children: ReactNode;
};

function AppWrapper({ opened, children }: AppWrapperProps) {
	return (
		<AppShell
			// header={{ height: { base: 60, md: 70 } }}
			navbar={{
				width: { base: 200, md: 300 },
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			bg={"primary"}
		>
			{children}
		</AppShell>
	);
}

export default AppWrapper;
