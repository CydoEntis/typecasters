import jwt from "jsonwebtoken";
import tokenRepository, {
	RefreshToken,
} from "../repositories/token.repository";
import { decode } from "punycode";

class TokenService {
	public async getRefreshToken(
		accessToken: string,
	): Promise<RefreshToken | null> {
		try {
			const decodedToken = this.decodeRefreshToken(accessToken);

			console.log("Decoded Token: ", decodedToken);
			console.log("Token: ", accessToken);

			return await tokenRepository.getRefreshToken(
				decodedToken.userId,
				decodedToken.sessionId,
			);
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error("Error while getting refresh token: " + error.message);
			} else {
				throw new Error("Unknown error while getting refresh token");
			}
		}
	}

	public async saveTokens(userId: number, refreshToken: string, sessionId: string): Promise<void> {
		try {
			const expiresAt = new Date();
			expiresAt.setMinutes(expiresAt.getMinutes() + 15);

			const newRefreshToken = {
				userId,
				sessionId,
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
			const decodedToken = this.decodeRefreshToken(token);
			const existingToken = await tokenRepository.getRefreshToken(
				decodedToken.userId,
				token,
			);

			if (!existingToken || existingToken.userId !== decodedToken.userId) {
				throw new Error("Invalid refresh token");
			}

			await this.revokeRefreshToken(existingToken);

			const newAccessToken = this.generateAccessToken(decodedToken.userId, decodedToken.sessionId);
			const newRefreshToken = this.generateRefreshToken(decodedToken.userId, decodedToken.sessionId);

			await this.saveTokens(decodedToken.userId, newRefreshToken, decodedToken.sessionId);

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

	public generateAccessToken(userId: number, sessionId: string): string {
		try {
			return jwt.sign(
				{ userId, sessionId }, // Include session ID in claims
				process.env.ACCESS_TOKEN_SECRET || "secret",
				{ expiresIn: "15min" },
			);
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

	public generateRefreshToken(userId: number, sessionId: string): string {
		try {
			return jwt.sign(
				{ userId, sessionId }, // Include session ID in claims
				process.env.REFRESH_TOKEN_SECRET || "secret",
				{ expiresIn: "90min" },
			);
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

	public decodeRefreshToken(token: string): {
		userId: number;
		sessionId: string;
	} {
		try {
			const decoded = jwt.verify(
				token,
				process.env.REFRESH_TOKEN_SECRET || "secret",
			) as { userId: number; sessionId: string };
			return decoded;
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
