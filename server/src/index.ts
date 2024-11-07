import express from "express";
import { env } from "./config/config";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

const PORT = env.appPort || 3000;

app.get("/", (req, res) => {
	res.send("Server is running");
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
