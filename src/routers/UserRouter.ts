import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
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
    this.router.get(
      "/send/verification/email",
      UserValidators.resendVerificationEmail(),
      GlobalMiddleware.checkError,
      UserController.resendVerificationEmail
    );
  }
  postRoutes() {
    this.router.post(
      "/signUp",
      GlobalMiddleware.checkError,
      UserController.signUp
    );
  }
  patchRoutes() {
    this.router.patch(
      "/verify",
      UserValidators.verify(),
      GlobalMiddleware.checkError,
      UserController.verify
    );
  }
  deleteRoute() {}
}

export default new UserRouter().router;
