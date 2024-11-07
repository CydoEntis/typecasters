import { User } from "shared/index";
import db from "../db/index";
import { user } from "../db/schemas/user";
import { eq } from "drizzle-orm";

class UserRepository {
	async findByEmail(email: string): Promise<User | null> {
		const [foundUser] = await db
			.select()
			.from(user)
			.where(eq(user.email, email));

		return foundUser || null;
	}

	async createUser(newUser: Omit<User, "id">): Promise<User> {
		const { username, email, password } = newUser;

		const [createdUser] = await db
			.insert(user)
			.values({
				username,
				email,
				password,
			})
			.returning();

		return createdUser;
	}
}

export default new UserRepository();
