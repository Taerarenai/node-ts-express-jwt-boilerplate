import config from "../config/config";
import { ExtractJwt, Strategy, JwtFromRequestFunction } from "passport-jwt";
import * as passport from "passport";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

interface opts {
    jwtFromRequest: JwtFromRequestFunction,
    secretOrKey: string,
    issuer: string,
    audience: string
}

const options: opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer: config.issuer,
    audience: config.audience,
    secretOrKey: config.jwtSecret,
}

passport.use("jwt", new Strategy(options, (token, done) => {
    const userRepository = getRepository(User);
    //get user
    userRepository.findOneOrFail(token.userId, {
        select: ["id", "email", "role", "firstName", "lastName", "provider"] //We dont want to send the passwords on response
    }).then((user) => {

        //return user and token
        return done(null, user, token);
    }).catch((error) => {

        //return error
        return done(error, false);
    });
}));


