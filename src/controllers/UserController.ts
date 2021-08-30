import User from "../models/User";
import { validationResult } from "express-validator";

export class UserController {
  static signUp(req, res, next) {
    const result = validationResult(req);
    const { email, password, username } = req.body;

    const hasError = !result.isEmpty();
    if (hasError) {
      const newError = result.array()[0].msg;
      next(new Error(newError));
      return;
    }

    const data = { email, password, username };
    const user = new User(data);
    user
      .save()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        next(err);
      });
  }
}
