import { Router } from "express";
import authController from "../controllers/auth.controller";
import isAuthenticated from "../middleware/auth/isAuthenticated";
import extractRefreshToken from "../middleware/auth/extractAccessToken";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post(
	"/refresh-token",
	isAuthenticated,
	extractRefreshToken,
	authController.refreshTokens,
);
router.post(
	"/logout",
	isAuthenticated,
	extractRefreshToken,
	authController.logout,
);

export default router;
