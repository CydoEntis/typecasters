import jwt from "jsonwebtoken";
import tokenRepository, {
	RefreshToken,
} from "../repositories/token.repository";

class TokenService {
	public async getRefreshToken(token: string): Promise<RefreshToken | null> {
		try {
			const decodedToken = this.decodeRefreshToken(token) as { id: number };
			return await tokenRepository.getRefreshToken(decodedToken.id, token);
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error("Error while getting refresh token: " + error.message);
			} else {
				throw new Error("Unknown error while getting refresh token");
			}
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
				expiresAt,
			} as RefreshToken;

			await tokenRepository.saveRefreshToken(newRefreshToken);
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error("Error while saving refresh token: " + error.message);
			} else {
				throw new Error("Unknown error while saving refresh token");
			}
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
			const newRefreshToken = this.generateRefreshToken(decodedToken.userId);

			await this.saveRefreshToken(decodedToken.userId, newRefreshToken);

			return {
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
			};
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error("Error while refreshing tokens: " + error.message);
			} else {
				throw new Error("Unknown error while refreshing tokens");
			}
		}
	}

	public async revokeRefreshToken(token: RefreshToken) {
		try {
			await tokenRepository.revokeRefreshToken(token);
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error("Error while revoking refresh token: " + error.message);
			} else {
				throw new Error("Unknown error while revoking refresh token");
			}
		}
	}

	public generateAccessToken(userId: number): string {
		try {
			return jwt.sign({ userId }, "secret", { expiresIn: "15min" });
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(
					"Error while generating access token: " + error.message,
				);
			} else {
				throw new Error("Unknown error while generating access token");
			}
		}
	}

	public generateRefreshToken(userId: number): string {
		try {
			return jwt.sign({ id: userId }, "refresh_secret", { expiresIn: "90min" });
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(
					"Error while generating refresh token: " + error.message,
				);
			} else {
				throw new Error("Unknown error while generating refresh token");
			}
		}
	}

	public decodeRefreshToken(token: string): string | jwt.JwtPayload {
		try {
			return jwt.verify(
				token,
				process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
			);
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error("Error while decoding refresh token: " + error.message);
			} else {
				throw new Error("Unknown error while decoding refresh token");
			}
		}
	}
}

export default new TokenService();
