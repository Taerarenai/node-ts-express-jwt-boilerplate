/* eslint-disable no-console */
import config from "../config/config";
import { ExtractJwt, Strategy, JwtFromRequestFunction } from "passport-jwt";
import * as passport from "passport";

interface Opts {
  jwtFromRequest: JwtFromRequestFunction;
  secretOrKey: string;
  issuer: string;
  audience: string;
}

const options: Opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  issuer: config.issuer,
  audience: config.audience,
  secretOrKey: config.jwtSecret,
};

passport.use(
  "jwt",
  new Strategy(options, (token, done) => {
    const user: any = token;
    if (user) {
      return done(null, user, token);
    } else {
      return done(false, false);
    }
  }),
);
