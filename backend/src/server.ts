import dotenv from "dotenv";
dotenv.config();

import express, {Express,Request,Response} from "express";
import {PrismaClient} from "@prisma/client";
import cors from "cors";
import rootRouter from "./routes";


export const prismaClient = new PrismaClient();

// dotenv.config();
const app:Express = express();
const port = process.env.PORT || 8000;

const allowedOrigins = ['*']
const options: cors.CorsOptions = {
  origin: '*'
};
/*{
  origin: ,methods: ['GET', 'POST', 'PUT', 'DELETE'],credentials: true, 
  optionsSuccessStatus: 200 
} */
app.use(cors(options));

app.use(express.json())

app.use('/api',rootRouter);

// app.all("*",(req:Request,res:Response) => {
//         res.status(404).json({error: `Route ${req.originalUrl} not found`});
//     })


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });