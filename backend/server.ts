import { PrismaClient } from '@prisma/client'
import express from 'express';
import routes from "./routes/index"
export const prisma = new PrismaClient()
const port = 3000;
const app = express()

app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});