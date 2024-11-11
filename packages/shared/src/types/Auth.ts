export type LoginCredentials = {
	email: string;
	password: string;
};

export type AuthenticatedUser = {
	email: string;
	username: string;
	accessToken: string;
	refreshToken: string;
};
