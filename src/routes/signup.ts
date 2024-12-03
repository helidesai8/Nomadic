// author: Parth Patel
import {Router} from "express";
import { signUp } from "../controllers/signup";

const signUpRouter: Router =  Router();

signUpRouter.post('/signup',signUp)
console.log("Request reached in signUp Router...")

export default signUpRouter;