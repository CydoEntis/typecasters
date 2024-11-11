import { Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController {
	async register(req: Request, res: Response) {
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

	async login(req: Request, res: Response) {
				try {
					const credentials = req.body;
					const loggedInUser = await authService.login(credentials);

					res.status(201).json({
						message: "User logged in successfully",
						user: loggedInUser
					});
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
