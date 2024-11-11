import {
	ExtractJwt,
	Strategy as JwtStrategy,
	StrategyOptionsWithoutRequest,
} from "passport-jwt";
import userRepository from "../repositories/user.repository";

const options: StrategyOptionsWithoutRequest = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: "secret",
};

export default function (passport: any) {
	passport.use(
		new JwtStrategy(options, async (jwtPayload: { id: number }, done: any) => {
			try {
				const foundUser = await userRepository.findById(jwtPayload.id);

				if (!foundUser) {
					return done(null, false, { message: "User not found" });
				}

				return done(null, foundUser);
			} catch (err) {
				return done(err, false);
			}
		}),
	);
}
