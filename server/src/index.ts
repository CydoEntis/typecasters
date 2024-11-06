import express from "express";
import { env } from "./config/config";
import { ExpressAuth } from "@auth/express";
import Credentials from "@auth/express/providers/credentials";
import { hashPassword } from "./auth/encryption.service";
import { LoginCredentials } from "shared/index";

const app = express();

app.set("trust proxy", true);
app.use(
	"/auth/*",
	ExpressAuth({
		providers: [
			Credentials({
				credentials: {
					email: {},
					password: {},
				},
				authorize: async (credentials: LoginCredentials) => {
					let user = null;

					const passwordHash = hashPassword(credentials.password);

					// Todo: Get user from database.

					if (!user) {
						throw new Error("Invalid credentials.");
					}

					return user;
				},
			}),
		],
	}),
);

const PORT = env.appPort || 3000;

app.get("/", (req, res) => {
	res.send("Server is running");
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
