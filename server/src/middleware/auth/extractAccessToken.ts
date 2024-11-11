import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
	accessToken?: string;
}

const extractAccessToken = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	const authorizationHeader = req.headers["authorization"];

	if (!authorizationHeader) {
		res.status(401).json({ message: "Authorization header required" });
		return;
	}

	const accessToken = authorizationHeader.split(" ")[1];

	if (!accessToken) {
		res.status(401).json({ message: "Refresh token required" });
		return;
	}

	req.accessToken = accessToken;

	next();
};

export default extractAccessToken;
