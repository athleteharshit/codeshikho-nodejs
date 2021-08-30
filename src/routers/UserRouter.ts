import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserValidators } from "../validators/UserValidators";

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
    this.router.post("/signUp", UserValidators.signUp(), UserController.signUp);
  }
  postRoutes() {}
  patchRoutes() {}
  deleteRoute() {}
}

export default new UserRouter().router;
