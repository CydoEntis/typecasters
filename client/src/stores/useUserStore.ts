// import { create } from "zustand";

// import authService from "../services/authService";


// type AuthState = {
// 	user: User | null;
// 	loading: {
// 		session: boolean;
// 		refresh: boolean;
// 		register: boolean;
// 		login: boolean;
// 		logout: boolean;
// 		getUser: boolean;
// 	};
// 	error: string | null;
// 	restoreSession: () => void;
// 	refreshTokens: (tokens: Tokens) => Promise<Tokens>;
// 	register: (credentials: RegisterCredentials) => Promise<void>;
// 	login: (credentials: LoginCredentials) => Promise<void>;
// 	logout: () => Promise<void>;

// };

// export const useAuthStore = create<AuthState>((set, get) => ({
// 	user: null,
// 	loading: {
// 		session: false,
// 		refresh: false,
// 		register: false,
// 		login: false,
// 		logout: false,
// 		getUser: false,
// 	},
// 	error: null,

// 	restoreSession: () => {
// 		set((state) => ({
// 			loading: { ...state.loading, session: true },
// 			error: null,
// 		}));
// 		const storedData = localStorageService.getItem<User>("questLog");
// 		if (storedData) {
// 			try {
// 				const user: User = {
// 					...storedData,
// 					isLoggedIn: true,
// 				};
// 				set({ user });
// 			} catch (error) {
// 				console.error("Error parsing stored tokens:", error);
// 				set({ error: "Failed to initialize authentication" });
// 				throw error;
// 			} finally {
// 				set((state) => ({
// 					loading: { ...state.loading, session: false },
// 					error: null,
// 				}));
// 			}
// 		} else {
// 			set((state) => ({
// 				loading: { ...state.loading, session: false },
// 				error: null,
// 			}));
// 		}
// 	},

// 	refreshTokens: async (tokens: Tokens): Promise<Tokens> => {
// 		set((state) => ({
// 			loading: { ...state.loading, refresh: true },
// 			error: null,
// 		}));
// 		try {
// 			const newTokens = await authService.refreshTokens(tokens);
// 			set((state) => ({
// 				user: state.user
// 					? {
// 							...state.user,
// 							tokens: newTokens,
// 					  }
// 					: null,
// 			}));
// 			return newTokens;
// 		} catch (error) {
// 			set({ error: "Failed to refresh tokens" });
// 			throw error;
// 		} finally {
// 			set((state) => ({
// 				loading: { ...state.loading, refresh: false },
// 				error: null,
// 			}));
// 		}
// 	},

// 	register: async (credentials: RegisterCredentials) => {
// 		set((state) => ({
// 			loading: { ...state.loading, register: true },
// 			error: null,
// 		}));
// 		try {
// 			const user = await authService.registerUser(credentials);
// 			localStorageService.setItem("questLog", user);
// 			set({ user });
// 		} catch (error) {
// 			set({ error: "Failed to register user" });
// 			throw error;
// 		} finally {
// 			set((state) => ({
// 				loading: { ...state.loading, register: false },
// 				error: null,
// 			}));
// 		}
// 	},

// 	login: async (credentials: LoginCredentials) => {
// 		set((state) => ({
// 			loading: { ...state.loading, login: true },
// 			error: null,
// 		}));
// 		try {
// 			const fetchedUser = await authService.loginUser(credentials);

// 			const user: User = {
// 				...fetchedUser,
// 				isLoggedIn: true,
// 			};
// 			localStorageService.setItem("questLog", user);
// 			set({ user });
// 		} catch (error) {
// 			set({ error: "Failed to log in" });
// 			throw error;
// 		} finally {
// 			set((state) => ({
// 				loading: { ...state.loading, login: false },
// 				error: null,
// 			}));
// 		}
// 	},

// 	logout: async () => {
// 		set((state) => ({
// 			loading: { ...state.loading, logout: true },
// 			error: null,
// 		}));
// 		try {
// 			const user = get().user;
// 			if (user) {
// 				await authService.logoutUser(user.tokens);
// 				localStorageService.removeItem("questLog");
// 				set({ user: null });
// 			}
// 		} catch (error) {
// 			set({ error: "Failed to log out" });
// 			throw error;
// 		} finally {
// 			set((state) => ({
// 				loading: { ...state.loading, logout: false },
// 				error: null,
// 			}));
// 		}
// 	},

// 	getUser: async (userId: string) => {
// 		set((state) => ({
// 			loading: { ...state.loading, getUser: true },
// 			error: null,
// 		}));
// 		try {
// 			const userData = await userService.getUser(userId);
// 			set({
// 				user: {
// 					...(get().user || {}),
// 					...userData,
// 				},
// 			});
// 			localStorageService.setItem("questLog", {
// 				...(get().user || {}),
// 				...userData,
// 			});
// 		} catch (error) {
// 			set({ error: "Failed to fetch user data" });
// 			throw error;
// 		} finally {
// 			set((state) => ({
// 				loading: { ...state.loading, getUser: false },
// 				error: null,
// 			}));
// 		}
// 	},

// 	updateAvatar: async (avatarId: number) => {
// 		set((state) => ({
// 			loading: { ...state.loading, avatar: true },
// 			error: null,
// 		}));
// 		try {
// 			const updatedAvatar = await userService.updateAvatar(avatarId);
// 			console.log("Updated Avatar: ", updatedAvatar);
// 			const currentUser = get().user;

// 			if (currentUser) {
// 				const updatedUser = {
// 					...currentUser,
// 					avatar: updatedAvatar,
// 				};

// 				set({
// 					user: updatedUser,
// 				});

// 				const storedUser = localStorageService.getItem<User>("questLog");

// 				if (storedUser) {
// 					localStorageService.setItem("questLog", {
// 						...storedUser,
// 						avatar: updatedAvatar,
// 					});
// 				}
// 			}
// 		} catch (error) {
// 			set({ error: "Failed to update avatar" });
// 			throw error;
// 		} finally {
// 			set((state) => ({
// 				loading: { ...state.loading, avatar: false },
// 				error: null,
// 			}));
// 		}
// 	},

// 	updateUserDisplayName: async (displayName: string) => {
// 		set((state) => ({
// 			loading: { ...state.loading, avatar: true },
// 			error: null,
// 		}));
// 		try {
// 			await userService.updateDisplayName(displayName);

// 			const currentUser = get().user;

// 			if (currentUser) {
// 				const updatedUser = {
// 					...currentUser,
// 					displayName, // Only update display name
// 				};

// 				set({
// 					user: updatedUser,
// 				});

// 				const storedUser = localStorageService.getItem<User>("questLog");

// 				if (storedUser) {
// 					localStorageService.setItem("questLog", {
// 						...storedUser,
// 						displayName,
// 					});
// 				}
// 			}
// 		} catch (error) {
// 			set({ error: "Failed to update avatar" });
// 			throw error;
// 		} finally {
// 			set((state) => ({
// 				loading: { ...state.loading, avatar: false },
// 				error: null,
// 			}));
// 		}
// 	},

// 	updateUserAvatarAndCurrency: (avatar: Avatar) => {
// 		set((state) => {
// 			const currentUser = state.user;
// 			if (currentUser) {
// 				const newCurrency = currentUser.currency - avatar.cost;
// 				const updatedUser = {
// 					...currentUser,
// 					avatar: avatar,
// 					currency: Math.max(newCurrency, 0),
// 				};
// 				const storedUser = localStorageService.getItem<User>("questLog");
// 				if (storedUser) {
// 					localStorageService.setItem("questLog", {
// 						...storedUser,
// 						avatar: avatar,
// 						currency: Math.max(newCurrency, 0),
// 					});
// 				}
// 				return { user: updatedUser };
// 			}
// 			return {};
// 		});
// 	},
// }));

// export default useAuthStore;
