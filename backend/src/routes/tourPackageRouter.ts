// author: Smit Patel, Sneh Patel
// src/routes/tourPackageRouter.ts
import express from 'express';
import {
    createTourPackage,
    getAllTourPackages,
    getTourPackageById,
    updateTourPackageById,
    deleteTourPackageById,
} from '../controllers/tourPackageController';

const router = express.Router();

router.post('/tours', createTourPackage);
router.get('/tours', getAllTourPackages);
router.get('/tours/:id', getTourPackageById);
router.put('/tours/:id', updateTourPackageById);
router.delete('/tours/:id', deleteTourPackageById);

export default router;
