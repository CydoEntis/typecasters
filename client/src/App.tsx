import "@mantine/core/styles.css";

import {
	colorsTuple,
	createTheme,
	MantineProvider,
	virtualColor,
} from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import router from "./router/AppRouter";
import { useEffect } from "react";
import useUserStore from "./stores/useUserStore";
function App() {
	const { restoreSession } = useUserStore();

	const theme = createTheme({
		cursorType: "pointer",
		colors: {
			darkPrimary: colorsTuple("#0F001E"),
			darkSecondary: colorsTuple("#260145"),
			darkCard: colorsTuple("#260145"), //#3B0F62
			// darkPrimary: colorsTuple("#190130"),
			// darkSecondary: colorsTuple("#260145"),
			// darkCard: colorsTuple("#260145"), //#3B0F62
			lightPrimary: colorsTuple("#F5F4F4"),
			lightSecondary: colorsTuple("#FFFFFF"),
			lightCard: colorsTuple("#FFFFFF"),
			primary: virtualColor({
				name: "primary",
				dark: "darkPrimary",
				light: "lightPrimary",
			}),
			secondary: virtualColor({
				name: "secondary",
				dark: "darkSecondary",
				light: "lightSecondary",
			}),
			card: virtualColor({
				name: "card",
				dark: "darkCard",
				light: "lightCard",
			}),
		},
		fontFamily: "Happy Monkey, sans-serif",
	});

	useEffect(() => {
		restoreSession();
	}, [restoreSession]);

	return (
		<MantineProvider theme={theme}>
			<RouterProvider router={router} />
		</MantineProvider>
	);
}

export default App;
