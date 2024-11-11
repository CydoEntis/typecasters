import db from "../db/index";
import { refreshTokens } from "../db/schemas/refresh-tokens.schema";
import { eq, and } from "drizzle-orm";

export type RefreshToken = {
	id: number;
	userId: number;
	sessionId: string; // Include sessionId here
	token: string;
	createdAt: Date;
	expiresAt: Date;
	isExpired: boolean;
};

class TokenRepository {
	public async getRefreshToken(
		userId: number,
		sessionId: string,
	): Promise<RefreshToken | null> {
		const [existingToken] = await db
			.select({
				id: refreshTokens.id,
				userId: refreshTokens.userId,
				sessionId: refreshTokens.sessionId, 
				token: refreshTokens.token,
				createdAt: refreshTokens.createdAt,
				expiresAt: refreshTokens.expiresAt,
				isExpired: refreshTokens.isExpired,
			})
			.from(refreshTokens)
			.where(
				and(
					eq(refreshTokens.userId, userId),
					eq(refreshTokens.sessionId, sessionId), 
				),
			);

		return existingToken || null;
	}

	public async saveRefreshToken(token: RefreshToken): Promise<void> {
		await db.insert(refreshTokens).values({
			userId: token.userId,
			sessionId: token.sessionId,
			token: token.token,
			expiresAt: token.expiresAt,
			isExpired: false, 
		});
	}

	public async revokeRefreshToken(token: RefreshToken) {
		await db
			.update(refreshTokens)
			.set({
				isExpired: true, // Mark token as expired
			})
			.where(
				and(
					eq(refreshTokens.userId, token.userId),
					eq(refreshTokens.sessionId, token.sessionId), 
					eq(refreshTokens.token, token.token),
				),
			);
	}
}

export default new TokenRepository();
