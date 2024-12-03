//Author : Vyansi Diyora
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ReviewController {
  static async createReview(req: Request, res: Response) {
    const { tourPackageId, userId, rating, comment } = req.body;

    console.log('Received data:', { tourPackageId, userId, rating, comment });
    try {
      const newReview = await prisma.review.create({
        data: {
          tourPackageId,
          userId,
          rating, // Convert rating to string if it's a number
          comment
        },
      });
      res.status(201).json(newReview);
    } catch (error) {
      console.error('Error creating review:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(500).json({ error: 'Review creation failed', details: errorMessage });
    }
  }

  static async getReviews(req: Request, res: Response) {
    try {
      const reviews = await prisma.review.findMany();
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(500).json({ error: 'Failed to fetch reviews', details: errorMessage });
    }
  }

  static async getReviewsByTourPackageId(req: Request, res: Response) {
    const { id } = req.params;
    const tourPackageId =id

    try {
      const reviews = await prisma.review.findMany({
        where: {
          tourPackageId: parseInt(tourPackageId, 10), // Ensure tourPackageId is an integer
        },
      });
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews by tourPackageId:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      res.status(500).json({ error: 'Failed to fetch reviews by tourPackageId', details: errorMessage });
    }
  }
}
