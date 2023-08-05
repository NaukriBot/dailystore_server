import { Injectable } from "@nestjs/common";
import { SES } from "aws-sdk";
import * as nodemailer from "nodemailer";
import * as SMTPTransport from "nodemailer-smtp-transport";

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(
      SMTPTransport({
        host: "email-smtp.us-east-2.amazonaws.com",
        port: 587,
        secure: false, // Use TLS encryption
        auth: {
          user: "aws_username",
          pass: "aws_password",
        },
      })
    );
  }

  async sendEmail(
    to: string,
    subject: string,
    htmlContent: string
  ): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: { name: "Daily Store", address: "admin@naukribotdotcom.com" },
      to,
      subject,
      html: htmlContent,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error occurred while sending email: %s", error.message);
    }
  }
}
