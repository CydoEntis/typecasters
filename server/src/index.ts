import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { env } from "./config/config";
import authRoutes from "./routes/auth.routes";
import passport from "passport";
import cors from "cors";
import { socketAuthMiddleware } from "./middleware/socketAuthMiddleware";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.use(socketAuthMiddleware);

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(passport.initialize());
app.use("/api/auth", authRoutes);

const PORT = env.appPort || 3000;

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("message", (data) => {
    console.log(`Received message from ${socket.id}: ${data}`);
    socket.emit("message", `Server received: ${data}`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
