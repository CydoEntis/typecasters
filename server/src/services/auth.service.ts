import bcrypt from "bcryptjs";
import userRepository from "../repositories/user.repository";
import { z } from "zod";
import { User } from "shared/index";
import tokenService from "./token.service";

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

export type AuthenticatedUser = {
	email: string;
	username: string;
	accessToken: string;
	refreshToken: string;
}

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
