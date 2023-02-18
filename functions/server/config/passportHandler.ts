import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User, IUser } from "../models/userModel.js";

const newUser = new User();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

passport.use(
  new Strategy(opts, (jwt_payload, done) => {
    newUser.getUserById(jwt_payload.data._id)
      .then((user: null | IUser) => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      });
  }),
);

passport.serializeUser((user, done: Function) => done(null, user));

passport.deserializeUser((user, done: Function) => done(null, user));
