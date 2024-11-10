import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import GameBoard from "../pages/GameBoard";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "game",
				element: <GameBoard />,
			},
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
		],
	},
]);

export default router;
