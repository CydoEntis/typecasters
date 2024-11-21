import jwt, { VerifyErrors } from "jsonwebtoken";
import { env } from "../config/config";
import { Socket } from "socket.io";

const users = [
  { id: 1, username: "TestGuy1" },
  { id: 2, username: "TestGuy2" }
];

export const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth.token;

  if (token) {
    jwt.verify(token, env.jwtSecret, (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        return next(new Error('Authentication error'));
      }
      const user = users.find(u => u.id === decoded?.id);

      if (user) {
        socket.data.user = user;
        next();
      } else {
        next(new Error('User not found'));
      }
    });
  } else {
    next(new Error('Authentication error'));
  }
};
