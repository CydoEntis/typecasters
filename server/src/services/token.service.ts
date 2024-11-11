import jwt from "jsonwebtoken";

class TokenService {
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
