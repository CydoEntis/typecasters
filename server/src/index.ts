import express from "express";
import { User } from "shared/index";
import { env } from "./config";
import "dotenv/config";

const app = express();
const PORT = env.appPort || 3000;

app.get("/", (req, res) => {
	res.send("Server is running");
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
