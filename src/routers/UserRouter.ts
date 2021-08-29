import { Router } from "express";
import { UserController } from "../controllers/UserController";

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.deleteRoute();
  }

  getRoutes() {
    this.router.post("/login", UserController.login);
  }
  postRoutes() {}
  patchRoutes() {}
  deleteRoute() {}
}

export default new UserRouter().router;
