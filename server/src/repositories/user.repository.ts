import { User } from "shared/types/index";
import db from "../db/index";
import { users } from "../db/schemas/user.schema";
import { eq } from "drizzle-orm";

class UserRepository {
	async findByEmail(email: string): Promise<User | null> {
		const [foundUser] = await db
			.select()
			.from(users)
			.where(eq(users.email, email));

		return foundUser || null;
	}

	async findById(id: number): Promise<User | null> {
		const [foundUser] = await db
			.select()
			.from(users)
			.where(eq(users.id, id))
			.limit(1)
			.execute();

		return foundUser || null;
	}

	async createUser(newUser: Omit<User, "id">): Promise<User> {
		const { username, email, password } = newUser;

		const [createdUser] = await db
			.insert(users)
			.values({
				username,
				email,
				password,
				updatedAt: new Date(),
			})
			.returning();

		return createdUser;
	}
}

export default new UserRepository();
