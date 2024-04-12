import nodemailer from "nodemailer";
import { config } from "../utils/startup";

export default class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.createConnection();
  }

  async createConnection() {
    this.transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: false,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
      },
    });

    this.transporter.verify((error, success) => {
      if (error) {
        console.error("Error connecting to SMTP server: %s", error);
      } else {
        console.log("Connected to SMTP server: %s", success);
      }
    });
  }

  async sendMail(options: nodemailer.SendMailOptions) {
    return await this.transporter
      .sendMail(options)
      .then((info) => {
        console.log("Message sent: %s", info.messageId);
        return info;
      })
      .catch((error) => {
        console.error("Error sending email: %s", error);
        throw error;
      });
  }
}
