// author: Parth Patel
import { Request,Response } from "express";
import { prismaClient } from "../server";
import {hashSync} from 'bcrypt';

export const signUp = async(req:Request, res:Response) => {
    try {
        const {fname,email,password,lname} = req.body;
        let user = await prismaClient.user.findFirst({where: { email }})
        const role = 'USER';
        if(user){
            console.log("User already exists")
            return res.status(400).json({"error": "User already exists!!!"});
        }
        user = await prismaClient.user.create({
            data:{
                first_name:fname,
                last_name:lname,
                email,
                password: hashSync(password,10),
                role: role
            }
        });
        res.json(user);
        
    } catch (error: unknown) {
        if(error instanceof Error){
            console.log(error)
            res.status(500).json({"error": "An unknown error occurred. Please try again!!!"})
        }
        else{
            console.log(error)
            res.status(500).json({error: "An unknown error occurred. Please try again!!!"})
        }
        
    }

}