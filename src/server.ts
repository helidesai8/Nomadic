import dotenv from "dotenv";
dotenv.config();

import express, {Express,Request,Response} from "express";
import {PrismaClient} from "@prisma/client";
import cors from "cors";
import rootRouter from "./routes";

import path from 'path';


export const prismaClient = new PrismaClient();

// dotenv.config();
const app:Express = express();
const port = process.env.PORT || 8080;

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

const reactBuildPath = path.join(__dirname, '..', 'public'); // Adjust path if necessary
app.use(express.static(reactBuildPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(reactBuildPath, 'index.html'));
  });



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });