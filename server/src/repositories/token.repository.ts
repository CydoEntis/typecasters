import db from "../db/index";
import { refreshToken } from "../db/schemas/refreshTokens";
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
		refreshTokenId: number,
		token: string,
	): Promise<RefreshToken | null> {
		const [existingToken] = await db
			.select({
				id: refreshToken.id,
				userId: refreshToken.userId,
				token: refreshToken.token,
				createdAt: refreshToken.createdAt,
				expiresAt: refreshToken.expiresAt,
				isExpired: refreshToken.isExpired,
			})
			.from(refreshToken)
			.where(
				and(eq(refreshToken.id, refreshTokenId), eq(refreshToken.token, token)),
			);

		return existingToken || null;
	}

	public async saveRefreshToken(token: RefreshToken): Promise<void> {
		await db.insert(refreshToken).values({
			userId: token.userId,
			token: token.token,
			expiresAt: token.expiresAt,
		});
	}

	public async revokeRefreshToken(token: RefreshToken) {
		await db
			.update(refreshToken)
			.set({
				isExpired: true,
			})
			.where(and(eq(refreshToken.id, token.id), eq(refreshToken.token, token.token)));
	}
}

export default new TokenRepository();
