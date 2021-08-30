import { body } from "express-validator";
import User from "../models/User";

export class UserValidators {
  static signUp() {
    return [
      body("email", "email is required!")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email }).then((user) => {
            if (user) {
              req.errorStatus = 409;
              throw new Error("user is already exits");
            } else {
              return true;
            }
          });
        }),
      body("password", "password is required!")
        .isAlphanumeric()
        .isLength({ min: 8, max: 20 })
        .withMessage("password can be from 8-20 characters"),
      body("username", "username is required!").isString(),
    ];
  }
}