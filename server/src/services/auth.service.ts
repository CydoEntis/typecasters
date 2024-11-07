import bcrypt from "bcryptjs";
import userRepository from "../repositories/user.repository";
import { z } from "zod";

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

class AuthService {
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
