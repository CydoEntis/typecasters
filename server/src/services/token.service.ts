import jwt from "jsonwebtoken";
import tokenRepository from "../repositories/token.repository";

class TokenService {
	async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
		const expiresAt = new Date();
		expiresAt.setDate(expiresAt.getDate() + 7);

		const tokenData = {
			userId,
			token: refreshToken,
			expiresAt: expiresAt
		}

		tokenRepository.saveRefreshToken(tokenData)
	}

	generateAccessToken(userId: number): string {
		return jwt.sign({ userId }, "secret", { expiresIn: "15min" });
	}

	generateRefreshToken(userId: number): string {
		return jwt.sign({ id: userId }, "refresh-secret", { expiresIn: "90min" });
	}

	verifyRefreshToken(token: string): string | jwt.JwtPayload {
		return jwt.verify(
			token,
			process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
		);
	}
}

export default new TokenService();
