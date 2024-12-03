// author: Smit Patel
import { Request, Response } from 'express';
import {prismaClient as prisma} from '../server';


export const getAllLocations = async (req: Request, res: Response) => {
    try {
        const locations = await prisma.tourPackage.findMany({
            select: {
                city: true,
            },
            distinct: ['city']
        });
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get locations' });
    }
}