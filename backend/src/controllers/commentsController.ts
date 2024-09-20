// author: Heli Desai

import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

export async function addComment(req: express.Request, res: express.Response) {
    const { blogPostId, comment, name, ratings} = req.body;
    try {
        const newComment = await prisma.comment.create({
            data: { blogPostId: parseInt(blogPostId), comment, name, ratings },
        });
        res.status(201).json(newComment);
    } catch (error) {
        console.error("Failed to add comment:", error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
}

export async function updateComment(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const { comment, name } = req.body;
    try {
        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(id) },
            data: { comment, name },
        });
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update comment' });
    }
}

export async function deleteComment(req: express.Request, res: express.Response) {
    const { id } = req.params;
    try {
        await prisma.comment.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete comment' });
    }
}

export async function getBlogPostComments(req: express.Request, res: express.Response) {
    const { postId } = req.params;  // Extracting postId from the URL parameter

    try {
        const comments = await prisma.comment.findMany({
            where: { blogPostId: parseInt(postId) },
        });
        res.status(200).json(comments);
    } catch (error) {
        console.error("Failed to fetch comments:", error);
        res.status(500).json({ error: 'Failed to fetch comments for the blog post' });
    }
}
