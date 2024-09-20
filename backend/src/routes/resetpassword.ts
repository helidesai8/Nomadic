// author: Parth Patel
import {Router} from "express";
import { resetpassword } from "../controllers/resetpassword";

const ResetPasswordRouter: Router =  Router();

ResetPasswordRouter.post('/reset-password/',resetpassword)
console.log("Request reached in Reset Password Router...")

export default ResetPasswordRouter;