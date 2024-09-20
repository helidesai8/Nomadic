// author: Parth Patel
import { Request,Response } from "express";
import { prismaClient } from "../server";
import {compareSync, hashSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secret";
import nodemailer from 'nodemailer';


export const forgotpassword = async(req:Request, res:Response) => {
try{
    const {email} = req.body;
    let user = await prismaClient.user.findFirst({ where: { email } });
    if(!user){
        return res.status(404).json({"error":"User not found."});
    }
    const resetToken = jwt.sign({userId: user.id},JWT_SECRET,{expiresIn:'1h'});
    const resetTokenExpiry = new Date(Date.now() + 1*(60*60*1000));

    await prismaClient.user.update({
        where: {id:user.id},
        data: {resetToken:resetToken,resetTokenExpiry:resetTokenExpiry}
    })

    const transporter = nodemailer.createTransport({
        service: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: 'Password Reset',
        text: `You requested a password reset. Use the following token to reset your password: https://csci-5709-g10.netlify.app/reset-password/${resetToken}`
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({message: "Password reset email sent.","token":resetToken});

}
catch(error){
console.error(error)
res.status(500).json({"error":"An error occurred. Please try again later."})
}


}