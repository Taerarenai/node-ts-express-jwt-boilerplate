import { Router } from "express";
import UserController from "../controllers/UserController";
//import { checkJwt } from "../middlewares/passport";
import { checkRole } from "../middlewares/checkRole";
import AuthController from "../controllers/AuthController";

export class UserRoutes {
  public router: Router;
  public authController: AuthController = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }


  routes() {

    // Get own suer

    this.router.get("/me", this.authController.authenticateJWT, UserController.getOwnUser);

    // Get one user
    this.router.get("/:id([0-9]+)", this.authController.authenticateJWT, UserController.getOneById);

    //Register
    this.router.post("/create", UserController.newUser);

    //Delete one user
    this.router.delete("/:id([0-9]+)", [checkRole(["ADMIN"])], UserController.deleteUser
    );

    //auth
    //Login route
    this.router.post("/login", UserController.login);

    //Change my password
    this.router.post("/change-password", this.authController.authenticateJWT, UserController.changePassword);
  }
}






