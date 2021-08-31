import User from "../models/User";
import { Utils } from "../Utils/Utils";

export class UserController {
  static async signUp(req, res, next) {
    const { email, password, username } = req.body;

    const data = {
      email,
      password,
      username,
      verification_token: Utils.generateVerificationToken(),
      verification_token_time: Date.now() + new Utils().maxTokenTime,
    };

    try {
      const user = await new User(data).save();
      // // send email
      res.send(user);
    } catch (err) {
      next(err);
    }
  }

  static async verify(req, res, next) {
    const { verification_token, email } = req.body;
    try {
      const user = await User.findOneAndUpdate(
        {
          email,
          verification_token,
          verification_token_time: { $gt: Date.now() },
        },
        { verified: true },
        { new: true }
      );
      if (user) {
        res.send(user);
      } else {
        throw new Error(
          "verfication token is expired. please request for a new one"
        );
      }
    } catch (err) {
      next(err);
    }
  }
}
