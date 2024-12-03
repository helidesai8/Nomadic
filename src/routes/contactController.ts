import { sendMail } from "../controllers/conatactController";

const {Router} = require('express');
const contactRouter = Router();

contactRouter.post('/contact', sendMail);

export default contactRouter;