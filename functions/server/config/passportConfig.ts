import { Strategy, ExtractJwt } from 'passport-jwt';
import { User, IUser } from '../models/userModel.js';

const UserInstance = new User();

export const passportConfig = (passport: any) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  };

  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      UserInstance.getUserById(
        jwt_payload.data._id,
        (err: Error, user: IUser) => {
          if (err) {
            return done(err, false);
          } else if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
      );
    }),
  );

  passport.serializeUser(function (user: IUser, done: Function) {
    done(null, user);
  });

  passport.deserializeUser(function (user: IUser, done: Function) {
    done(null, user);
  });
};
