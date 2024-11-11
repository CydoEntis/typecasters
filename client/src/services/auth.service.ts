import {
	AuthenticatedUser,
	LoginCredentials,
	RegisterCredentials,
	Tokens,
} from "shared/types";
import apiClient from "../api/apiClient";
import endpoints from "../api/endpoints";

const registerUser = async (
	credentials: RegisterCredentials,
): Promise<AuthenticatedUser> => {
	const response = (
		await apiClient.post(`${endpoints.auth}/register`, credentials)
	).data;

	return response;
};

const loginUser = async (
	credentials: LoginCredentials,
): Promise<AuthenticatedUser> => {
	const response = (
		await apiClient.post(`${endpoints.auth}/login`, credentials)
	).data;
	return response;
};

const logoutUser = async (tokens: Tokens): Promise<boolean> => {
	const response = (await apiClient.post(`${endpoints.auth}/logout`, tokens))
		.data;

	return response;
};

const refreshTokens = async (tokens: Tokens): Promise<Tokens> => {
	const response = (await apiClient.post(`${endpoints.auth}/refresh`, tokens))
		.data;

	return response;
};

export default { registerUser, loginUser, logoutUser, refreshTokens };
