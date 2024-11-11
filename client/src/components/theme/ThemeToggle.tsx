import { useMantineColorScheme, ActionIcon } from "@mantine/core";
import { Moon, Sun } from "lucide-react";
import useGetColorTheme from "../../hooks/useGetColorTheme";

function ThemeToggle() {
	const { setColorScheme } = useMantineColorScheme();
	const { isLightMode } = useGetColorTheme();

	return (
		<ActionIcon
			onClick={() => setColorScheme(isLightMode ? "dark" : "light")}
			variant="default"
			size="xl"
			aria-label="Toggle color scheme"
			bg={"orange"}
			style={{
				border: "none"
			}}
		>
			{isLightMode ? <Moon size={20} /> : <Sun size={20} />}
		</ActionIcon>
	);
}

export default ThemeToggle;
