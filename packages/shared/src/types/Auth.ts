export type AuthenticatedUser = {
	email: string;
	username: string;
	accessToken: string;
	refreshToken: string;
	isLoggedIn?: boolean;
};

export type Tokens = {
	accessToken: string;
	refreshToken: string;
};

export type LoginCredentials = {
	email: string;
	password: string;
};

export type RegisterCredentials = LoginCredentials & {
	username: string;
	confirmPassword: string;
};
