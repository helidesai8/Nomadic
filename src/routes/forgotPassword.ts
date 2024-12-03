// author: Parth Patel
import {Router} from "express";
import { forgotpassword } from "../controllers/forgotpassword";

const ForgotPasswordRouter: Router =  Router();

ForgotPasswordRouter.post('/forgotPassword',forgotpassword)
console.log("Request reached in Forgot Password Router...")

export default ForgotPasswordRouter;