import bcrypt from "bcryptjs";
import tokenService from "./token.service";
import { z } from "zod";
import userRepository from "../repositories/user.repository";

export type AuthenticatedUser = {
	email: string;
	username: string;
	accessToken: string;
	refreshToken: string;
};

const registerSchema = z
	.object({
		email: z.string().email(),
		username: z.string().min(3),
		password: z.string().min(6),
		confirmPassword: z.string().min(6),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type RegisterCredentials = z.infer<typeof registerSchema>;

const loginSchema = z.object({
	email: z.string().email("Please provide a valid email"),
	password: z.string().min(1, "Please provide a password"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export type Tokens = {
	accessToken: string;
	refreshToken: string;
};

class AuthService {
	private jwtSecret: string = "secret";

	public async register(credentials: RegisterCredentials) {
		try {
			const validationResult = registerSchema.safeParse(credentials);
			if (!validationResult.success) {
				throw new Error(
					validationResult.error.errors.map((e) => e.message).join(", "),
				);
			}

			const existingUser = await userRepository.findByEmail(credentials.email);
			if (existingUser) {
				throw new Error("User already exists");
			}

			const { username, email, password } = credentials;

			const hashedPassword = await this.hashPassword(password);

			const newUser = {
				email,
				username,
				password: hashedPassword,
			};

			const createdUser = await userRepository.createUser(newUser);
			return createdUser;
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error("Registration failed: " + error.message);
			} else {
				throw new Error("Unknown error during registration");
			}
		}
	}

	public async login(
		credentials: LoginCredentials,
	): Promise<AuthenticatedUser> {
		try {
			const validationResult = loginSchema.safeParse(credentials);
			if (!validationResult.success) {
				throw new Error(
					validationResult.error.errors.map((e) => e.message).join(", "),
				);
			}

			const existingUser = await userRepository.findByEmail(credentials.email);

			if (!existingUser) {
				throw new Error("Email or password is incorrect.");
			}

			const isPasswordValid = await this.verifyPassword(
				credentials.password,
				existingUser.password,
			);

			if (!isPasswordValid) {
				throw new Error("Email or password is incorrect.");
			}

			const accessToken = tokenService.generateAccessToken(existingUser.id);
			const refreshToken = tokenService.generateRefreshToken(existingUser.id);

			await tokenService.saveRefreshToken(existingUser.id, refreshToken);

			const loggedInUser = {
				email: existingUser.email,
				username: existingUser.username,
				accessToken,
				refreshToken,
			};

			return loggedInUser;
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error("Login failed: " + error.message);
			} else {
				throw new Error("Unknown error during login");
			}
		}
	}

	public async refreshTokens(refreshToken: string): Promise<Tokens> {
		try {
			if (!refreshToken) throw new Error("Refresh token required.");

			return await tokenService.refreshTokens(refreshToken);
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error("Unable to refresh tokens: " + error.message);
			} else {
				throw new Error("Unable to refresh access and refresh token");
			}
		}
	}

	public async logout(refreshToken: string) {
		try {
			console.log(refreshToken);
			if (!refreshToken) throw new Error("Refresh token required.");


			const existingToken = await tokenService.getRefreshToken(refreshToken);

			if (!existingToken) throw new Error("Refresh token does not exist.");

			await tokenService.revokeRefreshToken(existingToken);
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error("Error during logout: " + error.message);
			} else {
				throw new Error("Unknown error during logout");
			}
		}
	}

	private async hashPassword(password: string): Promise<string> {
		try {
			const saltRounds = 10;
			return await bcrypt.hash(password, saltRounds);
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error("Error while hashing password: " + error.message);
			} else {
				throw new Error("Unknown error during password hashing");
			}
		}
	}

	private async verifyPassword(
		password: string,
		hash: string,
	): Promise<boolean> {
		try {
			return await bcrypt.compare(password, hash);
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error("Error while verifying password: " + error.message);
			} else {
				throw new Error("Unknown error during password verification");
			}
		}
	}
}

export default new AuthService();
