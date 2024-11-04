import { User } from "shared/index";
import { Group, Paper, Text } from "@mantine/core";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
function App() {
	let user: User = {
		id: "id-1",
		name: "Poo",
		email: "poo@poo.com",
	};

	console.log(user);

	return (
		<MantineProvider>
			<p className="text-red-500">WORKING</p>
		</MantineProvider>
	);
}

export default App;
