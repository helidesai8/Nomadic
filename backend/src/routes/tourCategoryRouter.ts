// author: Smit Patel, Sneh Patel
import express from 'express';
import { createTourCategory, deleteTourCategory, getAllTourCategories, getEveryTourCategory, updateTourCategory, getTourCategoryById } from '../controllers/tourCategoryController';
import { get } from 'http';
const router = express.Router();

router.get('/tour-categories', getAllTourCategories);
router.post('/tour-categories', createTourCategory);
router.put('/tour-categories/:id', updateTourCategory);
router.get('/tour-categories/all', getEveryTourCategory);
router.delete('/tour-categories/:id', deleteTourCategory);
router.post('/tour-categories/:id', getTourCategoryById);

export default router;