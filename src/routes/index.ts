import { Router } from "express";
import { UserRoutes } from "./user";
import { AdminRoutes } from "./admin";

const routes = Router();

// routes.use("/auth", auth);
routes.use("/user", new UserRoutes().router);
routes.use("/admin", new AdminRoutes().router);
export default routes;
