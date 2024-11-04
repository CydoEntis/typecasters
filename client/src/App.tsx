import { User } from "shared/index";

function App() {
	let user: User = {
		id: "id-1",
		name: "Poo",
		email: "poo@poo.com",
	};

	console.log(user);

	return <p>Are you working you dumb pos..</p>;
}

export default App;
