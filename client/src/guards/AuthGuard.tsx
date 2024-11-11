import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
	const { user } = useUserStore();

	const location = useLocation();

	if (!user?.isLoggedIn) {
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
			/>
		);
	}

	return children;
};

export default AuthGuard;
