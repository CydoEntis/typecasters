import db from "../db/index";
import { refreshToken } from "../db/schemas/refreshTokens";

export type RefreshTokenData = {
	userId: number;
	token: string;
	expiresAt: Date;
};

class TokenRepository {
	async saveRefreshToken(tokenData: RefreshTokenData): Promise<void> {
		await db.insert(refreshToken).values({
			userId: tokenData.userId,
			token: tokenData.token,
			expiresAt: tokenData.expiresAt,
		});
	}
}

export default new TokenRepository();
