import passport from "../../config/passport-strategies/jwt.strategy";

const isAuthenticated = passport.authenticate("jwt", { session: false });

export default isAuthenticated;
