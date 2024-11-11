import jwt from "jsonwebtoken";
import tokenRepository, {
	RefreshToken,
} from "../repositories/token.repository";

class TokenService {
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

	public async refreshAccessToken(token: string) {
		try {
			const decoded = this.decodeRefreshToken(token) as { id: number };
			const existingToken = await tokenRepository.getRefreshToken(
				decoded.id,
				token,
			);

			if (!existingToken || existingToken.userId !== decoded.id) {
				throw new Error("Invalid refresh token");
			}

			return this.generateAccessToken(decoded.id);
		} catch (error: any) {
			throw new Error("Error while refreshing access token: " + error.message);
		}
	}

	public async revokeAccessToken(token: RefreshToken) {
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
