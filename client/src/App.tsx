import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import router from "./router/AppRouter";
function App() {
	return (
		<MantineProvider>
			<RouterProvider router={router} />
		</MantineProvider>
	);
}

export default App;
