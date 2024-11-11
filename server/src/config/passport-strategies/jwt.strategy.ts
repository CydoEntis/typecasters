import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import userRepository from "../../repositories/user.repository";

type JwtPayload = {
	userId: number;
};

passport.use(
	new JwtStrategy(
		{
			secretOrKey: process.env.JWT_SECRET || "secret",
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		},
		async (jwtPayload: JwtPayload, done: any) => {
			try {
				const user = await userRepository.findById(jwtPayload.userId);

				if (!user) {
					return done(null, false, { message: "User not found" });
				}
				return done(null, user);
			} catch (err) {
				return done(err, false);
			}
		},
	),
);

export default passport;
