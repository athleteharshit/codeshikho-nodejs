import * as nodemailer from "nodemailer";
import * as SendGrid from "nodemailer-sendgrid-transport";

export class NodeMailer {
  private static initializeTransport() {
    return nodemailer.createTransport(
      SendGrid({
        auth: {
          api_key:
            "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",
        },
      })
    );
  }

  static sendMail(data: {
    to: string[];
    subject: string;
    html: string;
  }): Promise<any> {
    return NodeMailer.initializeTransport().sendMail({
      to: data.to,
      from: "hg94543@gmail.com",
      subject: data.subject,
      html: data.html,
    });
  }
}
