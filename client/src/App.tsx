import { User } from "shared/index";

function App() {
	let user: User = {
		id: "id-1",
		name: "Poo",
		email: "poo@poo.com",
	};

	console.log(user);

	return <p className="bg-red-500 text-2xl">Are you working you dumb pos..</p>;
}

export default App;
