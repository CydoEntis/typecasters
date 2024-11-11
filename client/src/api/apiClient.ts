// import axios from "axios";
// import useAuthStore from "../stores/useAuthStore";
// import { baseUrl } from "./endpoints";

// const apiClient = axios.create({
// 	baseURL: baseUrl,
// });

// apiClient.interceptors.request.use(
// 	(request) => {
// 		const { user } = useAuthStore.getState();
// 		if (user && user.tokens) {
// 			request.headers["Authorization"] = `Bearer ${user.tokens.accessToken}`;
// 		}
// 		return request;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	},
// );

// apiClient.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config;

// 		// Handle token refresh when 401 error occurs
// 		if (error.response?.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true;
// 			const { user, refreshTokens, logout } = useAuthStore.getState();
// 			try {
// 				if (user && user.tokens) {
// 					const { tokens } = user;
// 					const newTokens = await refreshTokens(tokens);
// 					// Set the new token in headers
// 					originalRequest.headers[
// 						"Authorization"
// 					] = `Bearer ${newTokens.accessToken}`;

// 					// Retry the original request with the new token
// 					return apiClient(originalRequest);
// 				}
// 			} catch (refreshError) {
// 				console.log("Token refresh failed, logging out.");
// 				logout();
// 				window.location.href = "/login";
// 			}
// 		}
// 		return Promise.reject(error);
// 	},
// );

// export default apiClient;
