import jwt from "jsonwebtoken";
import tokenRepository, {
	RefreshToken,
} from "../repositories/token.repository";

class TokenService {
	public async getRefreshToken(token: string): Promise<RefreshToken | null> {
		try {
			const decodedToken = this.decodeRefreshToken(token) as { id: number };
			return await tokenRepository.getRefreshToken(decodedToken.id, token);
		} catch (error: any) {
			throw new Error("Error while saving refresh token: " + error.message);
		}
	}

	public async saveRefreshToken(
		userId: number,
		refreshToken: string,
	): Promise<void> {
		try {
			const expiresAt = new Date();
			expiresAt.setDate(expiresAt.getDate() + 7);

			const newRefreshToken = {
				userId,
				token: refreshToken,
				expiresAt: expiresAt,
			} as RefreshToken;

			await tokenRepository.saveRefreshToken(newRefreshToken);
		} catch (error: any) {
			throw new Error("Error while saving refresh token: " + error.message);
		}
	}

	public async refreshTokens(token: string) {
		try {
			const decodedToken = this.decodeRefreshToken(token) as { userId: number };
			const existingToken = await tokenRepository.getRefreshToken(
				decodedToken.userId,
				token,
			);

			if (!existingToken || existingToken.userId !== decodedToken.userId) {
				throw new Error("Invalid refresh token");
			}

			await this.revokeRefreshToken(existingToken);

			const newAccessToken = this.generateAccessToken(decodedToken.userId);
			const newRefreshToken = this.generateRefreshToken(decodedToken.userId)

			await this.saveRefreshToken(decodedToken.userId, newRefreshToken)

			return {
				accessToken: newAccessToken,
				refreshToken: newRefreshToken
			}

		} catch (error: any) {
			throw new Error("Error while refreshing access token: " + error.message);
		}
	}

	public async revokeRefreshToken(token: RefreshToken) {
		try {
			await tokenRepository.revokeRefreshToken(token);
		} catch (error: any) {
			throw new Error("Error while revoking refresh token: " + error.message);
		}
	}

	generateAccessToken(userId: number): string {
		try {
			return jwt.sign({ userId }, "secret", { expiresIn: "15min" });
		} catch (error: any) {
			throw new Error("Error while generating access token: " + error.message);
		}
	}

	generateRefreshToken(userId: number): string {
		try {
			return jwt.sign({ id: userId }, "refresh_secret", { expiresIn: "90min" });
		} catch (error: any) {
			throw new Error("Error while generating refresh token: " + error.message);
		}
	}

	decodeRefreshToken(token: string): string | jwt.JwtPayload {
		try {
			return jwt.verify(
				token,
				process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
			);
		} catch (error: any) {
			throw new Error("Error while decoding refresh token: " + error.message);
		}
	}
}

export default new TokenService();
