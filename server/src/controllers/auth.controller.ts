import { Request, Response } from "express";
import passport from "passport";
import authService from "../services/auth.service";

class AuthController {
	async register(req: Request, res: Response): Promise<void> {
		try {
			const credentials = req.body;
			const newUser = await authService.register(credentials);

			res.status(201).json({
				message: "User registered successfully",
				user: newUser,
			});
		} catch (error: unknown) {
			this.handleError(error, res);
		}
	}

	// Login user using passport-local strategy
	async login(req: Request, res: Response): Promise<void> {
		passport.authenticate(
			"local",
			{ session: false },
			async (err: any, user: any, info: any) => {
				if (err || !user) {
					return res
						.status(401)
						.json({ message: info?.message || "Login failed" });
				}

				try {
					const tokens = await authService.login(user);
					res.status(200).json(tokens);
				} catch (error: unknown) {
					this.handleError(error, res);
				}
			},
		)(req, res);
	}

	async refreshTokens(req: Request, res: Response): Promise<void> {
		passport.authenticate(
			"jwt",
			{ session: false },
			async (err: any, user: any, info: any) => {
				if (err || !user) {
					return res
						.status(401)
						.json({ message: "Invalid or expired refresh token" });
				}

				try {
					const tokens = await authService.refreshTokens(user);
					res.status(200).json(tokens);
				} catch (error: unknown) {
					this.handleError(error, res);
				}
			},
		)(req, res);
	}

	async logout(req: Request, res: Response): Promise<void> {
		passport.authenticate(
			"jwt",
			{ session: false },
			async (err: any, user: any, info: any) => {
				if (err || !user) {
					return res
						.status(401)
						.json({ message: "Invalid or expired refresh token" });
				}

				try {
					await authService.logout(user);
					res.status(200).json({ message: "Logout successful" });
				} catch (error: unknown) {
					this.handleError(error, res);
				}
			},
		)(req, res);
	}

	private handleError(error: unknown, res: Response) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(400).json({ error: "Unknown error occurred" });
		}
	}
}

export default new AuthController();
