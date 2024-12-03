// Author: Meer Patel

import express from "express";
import {
    getTotalRevenue,
    getTotalUsers
} from "../controllers/analyticsController";

const router = express.Router();

router.get("/analytics/gettotalusers", getTotalUsers);
router.get("/analytics/gettotalrevenue", getTotalRevenue);

export default router;
