import { validationResult } from "express-validator";

export class GlobalMiddleware {
  static checkError(req, res, next) {
    const result = validationResult(req);

    const hasError = !result.isEmpty();
    if (hasError) {
      const newError = result.array()[0].msg;
      next(new Error(newError));
    } else {
      next();
    }
  }
}
