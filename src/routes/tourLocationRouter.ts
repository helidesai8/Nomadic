// author: Smit Patel
import express from 'express';
import { getAllLocations } from '../controllers/tourLocationController';

const router = express.Router();
router.get('/locations', getAllLocations);

export default router;
