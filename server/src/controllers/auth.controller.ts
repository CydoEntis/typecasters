import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";
import { AuthenticatedRequest } from "../middleware/auth/extractAccessToken";
import passport from "../config/passport-strategies/local.strategy";

class AuthController {
	async register(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const credentials = req.body;
			const newUser = await authService.register(credentials);

			req.body = { ...credentials };
			passport.authenticate("local", (err: any, user: any, info: any) => {
				if (err) return next(err);
				if (!user)
					return res
						.status(401)
						.json({ message: info?.message || "Unauthorized" });

				res.status(201).json(user);
			})(req, res, next);
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(400).json({ error: error.message });
			} else {
				res.status(400).json({ error: "Unknown error occurred" });
			}
		}
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		passport.authenticate("local", (err: any, user: any, info: any) => {
			if (err) return next(err);
			if (!user)
				return res
					.status(401)
					.json({ message: info?.message || "Unauthorized" });
			res.json(user);
		})(req, res, next);
	}

	// This is def scuffed and needs to be rewritten
	async refreshTokens(req: AuthenticatedRequest, res: Response): Promise<void> {
		try {
			const { accessToken } = req;

			if (!accessToken) {
				res.status(401).json({ message: "Refresh token required" });
				return;
			}
			const tokens = await authService.refreshTokens(accessToken);
			res.status(201).json(tokens);
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(400).json({ error: error.message });
			} else {
				res.status(400).json({ error: "Unknown error occurred" });
			}
		}
	}

	async logout(req: AuthenticatedRequest, res: Response): Promise<void> {
		try {
			const { accessToken } = req;

			if (!accessToken) {
				res.status(401).json({ message: "Refresh token required" });
				return;
			}

			await authService.logout(accessToken);
			res.status(201).json({ message: "Logout successful" });
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(400).json({ error: error.message });
			} else {
				res.status(400).json({ error: "Unknown error occurred" });
			}
		}
	}
}

export default new AuthController();
