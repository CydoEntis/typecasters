import bcrypt from "bcryptjs";
import userRepository from "../repositories/user.repository";
import tokenService from "./token.service";
import {
	LoginCredentials,
	RegisterCredentials,
	registerSchema,
} from "shared/scehmas";
import { AuthenticatedUser } from "shared/types";
import jwt from "jsonwebtoken";

export type Tokens = {
	accessToken: string;
	refreshToken: string;
};

class AuthService {
	// TODO: Update this so the user gets logged in automatically after registering.
	async register(credentials: RegisterCredentials) {
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
	}

	async login(credentials: LoginCredentials): Promise<AuthenticatedUser> {
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
	}

	async refreshTokens(refreshToken: string): Promise<Tokens> {
		if (!refreshToken) throw new Error("Refresh token required.");

		try {
			return await tokenService.refreshTokens(refreshToken);
		} catch (error: any) {
			throw new Error(
				"Unable to refresh access and refresh token",
				error.message,
			);
		}
	}

	private async hashPassword(password: string): Promise<string> {
		const saltRounds = 10;
		return await bcrypt.hash(password, saltRounds);
	}

	private async verifyPassword(
		password: string,
		hash: string,
	): Promise<boolean> {
		return await bcrypt.compare(password, hash);
	}
}

export default new AuthService();
