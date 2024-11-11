import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import authService from "../services/auth.service";



passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async (email, password, done: any) => {
			try {
				const user = await authService.login({email, password})
				return done(null, user);
			} catch (err) {
				return done(err, false);
			}
		},
	),
);

export default passport;
