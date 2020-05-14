/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/unbound-method */
import { Router } from "express";
import UserController from "../controllers/UserController";
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
    // Delete own user
    this.router.delete("/me", this.authController.authenticateJWT, UserController.deleteUser);
    // Edit own user
    this.router.patch("/me", this.authController.authenticateJWT, UserController.editOwnUser);

    // Get one user
    this.router.get("/:id([0-9]+)", this.authController.authenticateJWT, UserController.getOneById);

    // Change my password
    this.router.post("/change-password", this.authController.authenticateJWT, UserController.changePassword);

    // Login route
    this.router.post("/login", UserController.login);
    // Register
    this.router.post("/create", UserController.newUser);
  }
}
