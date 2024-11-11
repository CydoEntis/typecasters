import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userRepository from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import { User } from "shared/types";

export const localStrategy = new LocalStrategy(
	{
		usernameField: "email",
	},
	async (email: string, password: string, done) => {
		try {
			const user = await userRepository.findByEmail(email);
			if (!user) {
				return done(null, false, { message: "Invalid credentials" });
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return done(null, false, { message: "Invalid credentials" });
			}

			return done(null, user);
		} catch (error) {
			return done(error);
		}
	},
);

export const jwtStrategy = new JwtStrategy(
	{
		secretOrKey: process.env.JWT_SECRET || "your-secret-key",
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	},
	async (jwtPayload, done) => {
		try {
			const user = await userRepository.findById(jwtPayload.id);
			if (!user) {
				return done(null, false, { message: "Unauthorized" });
			}
			return done(null, user);
		} catch (error) {
			return done(error, false);
		}
	},
);

export default function (passport: any) {
	passport.use("local", localStrategy);
	passport.use("jwt", jwtStrategy);
}
