// author: Heli Desai

import express from 'express';
import {
    addComment,
    updateComment,
    deleteComment,
    getBlogPostComments
} from '../controllers/commentsController';

const router = express.Router();

router.post('/posts/:postId/comments', addComment); // Updated to include `postId` in the path
router.put('/comments/:id', updateComment); // Changed from `/comment/:id` to `/comments/:id` for consistency
router.delete('/comments/:id', deleteComment); // Changed from `/comment/:id` to `/comments/:id` for consistency
router.get('/posts/:postId/comments', getBlogPostComments);

export default router;
