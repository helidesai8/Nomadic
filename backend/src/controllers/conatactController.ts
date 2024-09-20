import { Request, Response } from "express";
import nodemailer from "nodemailer";


export const sendMail = async (req: Request, res: Response) => {
    const { name, email, message } = req.body;
    console.log(process.env.EMAIL, process.env.PASSWORD,);
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.MAIL_HOST,
            auth: {
              user: process.env.MAIL_USERNAME,
              pass: process.env.MAIL_PASSWORD
            }
          });
        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: process.env.MAIL_USERNAME,
            subject: `Message from ${name}`,
            text: message,
            replyTo: email,
        };

        const userOptions = {
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: "Thank you for contacting us",
            text: "We will get back to you as soon as possible",
        };
        console.log(await transporter.sendMail(mailOptions));
        await transporter.sendMail(userOptions);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send email" });
    }
}