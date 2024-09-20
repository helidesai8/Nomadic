// author: Smit Patel
import { Request, Response } from 'express';
import { prismaClient as prisma } from '../server';
import { TourCategory } from '@prisma/client';

interface TourCategoryResponse extends TourCategory {
    tourPackageCount: number;
}

export const getAllTourCategories = async (req: Request, res: Response) => {
    try {
        const { city, startDate, endDate } = req.query;
        const filters: any = {};
        if (city) {
            filters.city = { contains: String(city), mode: 'insensitive' }; // Case insensitive search
        }
        if (startDate && endDate) {
            filters.startDate = {
                gte: new Date(String(startDate)),
            };
            filters.endDate = {
                lte: new Date(String(endDate)),
            };
        }
        const tourCategories = await prisma.tourCategory.findMany({
            where: {
                tourPackages: {
                    some: filters
                }
            }
        });
        const toursPackageCountByCategory = await prisma.tourPackage.groupBy({
            by: ['tourCategoryId'],
            _count: {
                id: true,
            },
            where: filters,
        });
        const tourCategoriesResponse: TourCategoryResponse[] = [];
        tourCategories.forEach((category) => {
            const tourPackageCount = toursPackageCountByCategory.find((count) => count.tourCategoryId === category.id);
            tourCategoriesResponse.push({
                ...category,
                tourPackageCount: tourPackageCount?._count.id || 0,
            });
        });

        res.status(200).json({
            data: tourCategoriesResponse,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tour categories: ' + JSON.stringify(error) });
    }
}

export const createTourCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const newTourCategory = await prisma.tourCategory.create({
            data: { name },
        });
       
        res.status(201).json({
            message: "Tour category created successfully",
            data: newTourCategory
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create tour category' });
    }
}

export const updateTourCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
       
        const updatedTourCategory = await prisma.tourCategory.update({
            where: { id: Number(id) },
            data: { name },
        });
        
        res.status(200).json({
            message: "Tour category updated successfully",
            data: updatedTourCategory
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update tour category: ' + JSON.stringify(error) });
    }
}
//Author : Sneh Patel
export const getEveryTourCategory = async (req: Request, res: Response) => {
    try {
        const tourCategories = await prisma.tourCategory.findMany();
        res.status(200).json({
            data: tourCategories
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tour categories: ' + JSON.stringify(error) });
    }
}
//Author : Sneh Patel
export const deleteTourCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
       
        const response =await prisma.tourCategory.delete({
            where: { id: Number(id) },
        });
       
        res.status(200).json({
            message: "Tour category deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete tour category: ' + JSON.stringify(error) });
    }
}
//Author : Sneh Patel
export const getTourCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tourCategory = await prisma.tourCategory.findUnique({
            where: { id: Number(id) },
        });
        res.status(200).json({
            data: tourCategory
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tour category: ' + JSON.stringify(error) });
    }
}
//Author : Sneh Patel
export const getTourCategoryTours = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tours = await prisma.tourPackage.findMany({
            where: {
                tourCategoryId: Number(id),
            },
        });
        res.status(200).json({
            data: tours
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tours for tour category: ' + JSON.stringify(error) });
    }
}

