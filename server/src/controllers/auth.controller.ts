import { Request, Response } from "express";
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
			if (error instanceof Error) {
				res.status(400).json({ error: error.message });
			} else {
				res.status(400).json({ error: "Unknown error occurred" });
			}
		}
	}

	async login(req: Request, res: Response): Promise<void> {
		try {
			const credentials = req.body;
			const loggedInUser = await authService.login(credentials);

			res.status(201).json({
				message: "User logged in successfully",
				user: loggedInUser,
			});
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(400).json({ error: error.message });
			} else {
				res.status(400).json({ error: "Unknown error occurred" });
			}
		}
	}

	async refreshTokens(req: Request, res: Response): Promise<void> {
		try {
			const { refreshToken } = req.body;

			if (!refreshToken)
				res.status(401).json({ message: "Refresh token required" });

			const tokens = await authService.refreshTokens(refreshToken);
			res.status(201).json(tokens);
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(400).json({ error: error.message });
			} else {
				res.status(400).json({ error: "Unknown error occurred" });
			}
		}
	}

	async logout(req: Request, res: Response): Promise<void> {
		try {
			const { refreshToken } = req.body;

			if (!refreshToken)
				res.status(401).json({ message: "Refresh token required" });

			await authService.logout(refreshToken);
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
