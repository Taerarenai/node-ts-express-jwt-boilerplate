import { Router } from "express";
import UserController from "../controllers/UserController";
//import { checkJwt } from "../middlewares/passport";
import AuthController from "../controllers/AuthController";

export class UserRoutes {
  public router: Router;
  public authController: AuthController = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }


  routes() {

    // Get own user
    this.router.get("/me", this.authController.authenticateJWT, UserController.getOwnUser);

    // Get one user
    this.router.get("/:id([0-9]+)", this.authController.authenticateJWT, UserController.getOneById);

    //Delete own user
    this.router.delete("/me", this.authController.authenticateJWT, UserController.deleteUser);

    //Change my password
    this.router.post("/change-password", this.authController.authenticateJWT, UserController.changePassword);


    //Login route
    this.router.post("/login", UserController.login);
    //Register
    this.router.post("/create", UserController.newUser);
  }
}






