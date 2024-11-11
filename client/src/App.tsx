import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import router from "./router/AppRouter";
import { useEffect } from "react";
import useUserStore from "./stores/useUserStore";
function App() {
	const { restoreSession } = useUserStore();

	useEffect(() => {
		restoreSession();
	}, [restoreSession]);

	return (
		<MantineProvider>
			<RouterProvider router={router} />
		</MantineProvider>
	);
}

export default App;
