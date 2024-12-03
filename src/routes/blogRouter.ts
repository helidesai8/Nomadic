// author: Heli Desai

import express from "express";
import {
  getAllBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostById,
  getBlogCategories,
  getBlogPostByUserId
} from "../controllers/blogController";

const router = express.Router();

router.get("/blog", getAllBlogPosts);
router.get("/blog/:id", getBlogPostById);
router.post("/blog", createBlogPost);
router.put("/blog/:id", updateBlogPost);
router.delete("/blog/:id", deleteBlogPost);
router.get("/blog-categories", getBlogCategories);
router.get("/user/:userId/blogs", getBlogPostByUserId);

export default router;
