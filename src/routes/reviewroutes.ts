//Author : Vyansi Diyora
import { Router } from 'express';
import { ReviewController } from '../controllers/reviewcontroller';


const router = Router();

router.post('/reviews', ReviewController.createReview);
router.get('/getreviews', ReviewController.getReviews);
router.get('/getreviewbyid/:id',ReviewController.getReviewsByTourPackageId);

export default router;
