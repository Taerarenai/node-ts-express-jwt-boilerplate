import { Router } from "express";
import AdminUserController from "../controllers/Admin/AdminUserController";
import AuthController from "../controllers/AuthController";

export class AdminRoutes {
    public router: Router;
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        this.routes();
    }


    routes() {
        //USERS EndPoints
        //
        //Edit One user
        this.router.patch("/users/:id([0-9]+)", this.authController.authorizeJWTAdmin, AdminUserController.editUser);
        //Get all users
        this.router.get("/users/", this.authController.authorizeJWTAdmin, AdminUserController.getAllUsers);
        //Delete One user
        this.router.delete("/:id([0-9]+)", this.authController.authorizeJWTAdmin, AdminUserController.deleteUser);
    }
}






