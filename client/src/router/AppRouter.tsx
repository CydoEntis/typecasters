import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import GameBoard from "../pages/GameBoard";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "game",
				element: <GameBoard />,
			},
		],
	},
]);

export default router;
