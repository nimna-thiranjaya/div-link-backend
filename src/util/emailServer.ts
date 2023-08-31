import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import InternalServerError from "../error/error.classes/InternalServerError";

// Mail server configurations
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SERVER_EMAIL,
    pass: process.env.SERVER_PASSWORD,
  },
});

const sendEmail = async (email: string, subject: string, text: string) => {
  let mailOptions = {
    from: process.env.SERVER_EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (err: any, data: any) => {
    if (err) {
      throw new InternalServerError("Error sending email!");
    } else {
      return data;
    }
  });
};

export default sendEmail;
