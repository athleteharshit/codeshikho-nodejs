import User from "../models/User";
import { NodeMailer } from "../Utils/NodeMailer";
import { Utils } from "../Utils/Utils";

export class UserController {
  static async signUp(req, res, next) {
    const { email, password, username } = req.body;
    const verificationToken = Utils.generateVerificationToken();

    const data = {
      email,
      password,
      username,
      verification_token: verificationToken,
      verification_token_time: Date.now() + new Utils().maxTokenTime,
    };

    try {
      const user = await new User(data).save();
      res.send(user);
      await NodeMailer.sendMail({
        to: ["guptaharshit545@gmail.com"],
        subject: "test email is send",
        html: `<h1>${verificationToken}</h1>`,
      });
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

  static async resendVerificationEmail(req, res, next) {
    const { email } = req.query;
    const verificationToken = Utils.generateVerificationToken();
    try {
      const user = await User.findOneAndUpdate(
        { email },
        {
          verification_token: verificationToken,
          verification_token_time: Date.now() + new Utils().maxTokenTime,
        }
      );
      if (user) {
        await NodeMailer.sendMail({
          to: ["guptaharshit545@gmail.com"],
          subject: "test email is send",
          html: `<h1>${verificationToken}</h1>`,
        });
        res.json({ success: true });
      } else {
        throw new Error("user does not exist");
      }
    } catch (err) {
      next(err);
    }
  }
}
