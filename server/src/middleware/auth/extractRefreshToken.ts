import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
	refreshToken?: string;
}

const extractRefreshToken = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	const authorizationHeader = req.headers["authorization"];

	if (!authorizationHeader) {
		res.status(401).json({ message: "Authorization header required" });
		return;
	}

	const refreshToken = authorizationHeader.split(" ")[1];

	if (!refreshToken) {
		res.status(401).json({ message: "Refresh token required" });
		return;
	}

	req.refreshToken = refreshToken;

	next();
};

export default extractRefreshToken;
