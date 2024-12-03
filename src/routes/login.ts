// author: Parth Patel
import {Router} from "express";
import { login } from "../controllers/login";

const loginRouter: Router =  Router();

loginRouter.post('/login',login)
console.log("Request reached in signUp Router...")

export default loginRouter;