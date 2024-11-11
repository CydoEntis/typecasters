import db from "../db/index";
import { refreshTokens } from "../db/schemas/refresh-tokens.schema";
import { eq, and } from "drizzle-orm";

export type RefreshToken = {
	id: number;
	userId: number;
	accessToken: string;
	refreshToken: string;
	createdAt: Date;
	expiresAt: Date;
	isExpired: boolean;
};

class TokenRepository {
	public async getRefreshToken(
		userId: number,
		refreshToken: string,
	): Promise<RefreshToken | null> {
		const [existingToken] = await db
			.select({
				id: refreshTokens.id,
				userId: refreshTokens.userId,
				accessToken: refreshTokens.accessToken,
				refreshToken: refreshTokens.refreshToken,
				createdAt: refreshTokens.createdAt,
				expiresAt: refreshTokens.expiresAt,
				isExpired: refreshTokens.isExpired,
			})
			.from(refreshTokens)
			.where(
				and(
					eq(refreshTokens.userId, userId),
					eq(refreshTokens.refreshToken, refreshToken),
				),
			);

		return existingToken || null;
	}

	public async saveRefreshToken(token: RefreshToken): Promise<void> {
		await db.insert(refreshTokens).values({
			userId: token.userId,
			accessToken: token.accessToken,
			refreshToken: token.refreshToken,
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
					eq(refreshTokens.refreshToken, token.refreshToken),
				),
			);
	}
}

export default new TokenRepository();
