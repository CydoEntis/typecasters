
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



