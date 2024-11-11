import db from "../db/index";
import { refreshTokens } from "../db/schemas/refreshTokens.schema";
import { eq, and } from "drizzle-orm";

export type RefreshToken = {
	id: number;
	userId: number;
	token: string;
	createdAt: Date;
	expiresAt: Date;
	isExpired: boolean;
};

class TokenRepository {
	public async getRefreshToken(
		userId: number,
		token: string,
	): Promise<RefreshToken | null> {
		const [existingToken] = await db
			.select({
				id: refreshTokens.id,
				userId: refreshTokens.userId,
				token: refreshTokens.token,
				createdAt: refreshTokens.createdAt,
				expiresAt: refreshTokens.expiresAt,
				isExpired: refreshTokens.isExpired,
			})
			.from(refreshTokens)
			.where(
				and(eq(refreshTokens.userId, userId), eq(refreshTokens.token, token)),
			);

		return existingToken || null;
	}

	public async saveRefreshToken(token: RefreshToken): Promise<void> {
		await db.insert(refreshTokens).values({
			userId: token.userId,
			token: token.token,
			expiresAt: token.expiresAt,
		});
	}

	public async revokeRefreshToken(token: RefreshToken) {
		await db
			.update(refreshTokens)
			.set({
				isExpired: true,
			})
			.where(
				and(
					eq(refreshTokens.id, token.id),
					eq(refreshTokens.token, token.token),
				),
			);
	}
}

export default new TokenRepository();
