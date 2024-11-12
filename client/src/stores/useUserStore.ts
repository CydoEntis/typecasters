import { create } from "zustand";
import {
	AuthenticatedUser,
	LoginCredentials,
	RegisterCredentials,
	Tokens,
} from "shared/types";

import localStorageService from "../services/local-storage.service";
import authService from "../services/auth.service";

type UserState = {
	user: AuthenticatedUser | null;
	loading: {
		session: boolean;
		refresh: boolean;
		register: boolean;
		login: boolean;
		logout: boolean;
	};
	error: string | null;
	restoreSession: () => void;
	refreshTokens: (tokens: Tokens) => Promise<Tokens>;
	register: (credentials: RegisterCredentials) => Promise<void>;
	login: (credentials: LoginCredentials) => Promise<void>;
	logout: () => Promise<void>;
};

export const useUserStore = create<UserState>((set, get) => ({
	user: null,
	loading: {
		session: false,
		refresh: false,
		register: false,
		login: false,
		logout: false,
	},
	error: null,

	restoreSession: () => {
		set((state) => ({
			loading: { ...state.loading, session: true },
			error: null,
		}));
		const storedData =
			localStorageService.getItem<AuthenticatedUser>("typecasters");
		if (storedData) {
			try {
				const user: AuthenticatedUser = {
					...storedData,
					isLoggedIn: true,
				};
				set({ user });
			} catch (error) {
				console.error("Error parsing stored tokens:", error);
				set({ error: "Failed to initialize authentication" });
				throw error;
			} finally {
				set((state) => ({
					loading: { ...state.loading, session: false },
					error: null,
				}));
			}
		} else {
			set((state) => ({
				loading: { ...state.loading, session: false },
				error: null,
			}));
		}
	},

	refreshTokens: async (tokens: Tokens): Promise<Tokens> => {
		set((state) => ({
			loading: { ...state.loading, refresh: true },
			error: null,
		}));
		try {
			const newTokens = await authService.refreshTokens(tokens);
			set((state) => ({
				user: state.user
					? {
							...state.user,
							tokens: newTokens,
					  }
					: null,
			}));
			return newTokens;
		} catch (error) {
			set({ error: "Failed to refresh tokens" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, refresh: false },
				error: null,
			}));
		}
	},

	register: async (credentials: RegisterCredentials) => {
		set((state) => ({
			loading: { ...state.loading, register: true },
			error: null,
		}));
		try {
			const fetchedUser = await authService.registerUser(credentials);
			const user: AuthenticatedUser = {
				...fetchedUser,
				isLoggedIn: true,
			};
			localStorageService.setItem("typecasters", user);
			set({ user });
		} catch (error) {
			set({ error: "Failed to register user" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, register: false },
				error: null,
			}));
		}
	},

	login: async (credentials: LoginCredentials) => {
		set((state) => ({
			loading: { ...state.loading, login: true },
			error: null,
		}));
		try {
			const fetchedUser = await authService.loginUser(credentials);
			const user: AuthenticatedUser = {
				...fetchedUser,
				isLoggedIn: true,
			};
			localStorageService.setItem("typecasters", user);
			set({ user });
		} catch (error) {
			set({ error: "Failed to log in" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, login: false },
				error: null,
			}));
		}
	},

	logout: async () => {
		set((state) => ({
			loading: { ...state.loading, logout: true },
			error: null,
		}));
		try {
			const user = get().user;
			if (user) {
				const tokens = {
					accessToken: user.accessToken,
					refreshToken: user.refreshToken,
				};

				await authService.logoutUser(tokens);
				localStorageService.removeItem("typecasters");
				set({ user: null });
			}
		} catch (error) {
			set({ error: "Failed to log out" });
			throw error;
		} finally {
			set((state) => ({
				loading: { ...state.loading, logout: false },
				error: null,
			}));
		}
	},
}));

export default useUserStore;
