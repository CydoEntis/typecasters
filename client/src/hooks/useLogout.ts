import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

function useLogout() {
	const { logout } = useUserStore();
	const navigate = useNavigate();

	const logoutHandler = () => {
		logout();
		navigate("/login");
	};

	return logoutHandler;
}

export default useLogout;
