import { NextFunction, Request, Response } from "express";
import * as passport from "passport";
import "../middlewares/passport";
import roles from "../utils/roles";

export default class AuthController {
  public authenticateJWT(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate("jwt", (err, user) => {
      if (err) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      }
      if (!user) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      } else {
        return next();
      }
    })(req, res, next);
  }

  public authorizeJWTAdmin(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate("jwt", (err, user) => {
      if (err) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      }
      if (!user) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      }
      if (user.role !== roles.Admin) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      } else {
        return next();
      }
    })(req, res, next);
  }

  public authorizeJWT(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate("jwt", (err, user, jwtToken) => {
      if (err) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      }
      if (!user) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      } else {
        const scope = req.baseUrl.split("/").slice(-1)[0];
        const authScope = jwtToken.scope;
        if (authScope && authScope.indexOf(scope) > -1) {
          return next();
        } else {
          return res.status(401).json({ status: "error", code: "unauthorized" });
        }
      }
    })(req, res, next);
  }
}
