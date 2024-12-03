// author: Parth Patel
import { Request,Response } from "express";
import { prismaClient } from "../server";
import {compareSync, hashSync} from 'bcrypt';

export const resetpassword = async(req:Request, res:Response) => {
try{
    const {token,password} = req.body;
    console.log(token)
    let user = await prismaClient.user.findFirst({where: {resetToken:token}});
    if(!user || !user.resetTokenExpiry || user.resetToken!==token || new Date() > user.resetTokenExpiry){
        res.status(400).json({error: "Invalid or expired token."});
    }
    const hashedPassword = hashSync(password,10);
    if(user){
        await prismaClient.user.update({
            where: {id:user.id},
            data:{password: hashedPassword,resetToken:null,resetTokenExpiry:null}
        })
    }
    res.json({message:"Password reset successful."})
}
catch(error){
    console.error(error)
    res.status(500).json({"error":"An error occurred. Please try again later."})
}

}


