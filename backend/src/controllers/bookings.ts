//Author: Meer Patel

import { Request, Response } from 'express';
import { prismaClient as prisma } from '../server';

class BookingController {
    async createBooking(req: Request, res: Response) {
        try {
            const { id, tourPackageId, totalCost,
                note,
                noOfPeople, } = req.body;

            // Ensure `id` is a number
            // const userId = Number(id);


            const newBooking = await prisma.bookings.create({
                data: {
                    totalCost: totalCost.toString(),
                    note,
                    noOfPeople: noOfPeople.toString(),
                    tourPackage: {
                        connect: { id: Number(tourPackageId) },
                    }
                    ,
                    user: {
                        connect: { id: Number(id) },
                    },
                },
            });
            console.log("newBooking", newBooking);

            res.status(201).json({ success: true, data: newBooking });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    }

    async getbookings(req: Request, res: Response) {
        console.log("getbookings");

        try {
            const bookings = await prisma.bookings.findMany();
            res.status(200).json({ success: true, length: bookings.length, data: bookings });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    }

    async getbookingsOfUser(req: Request, res: Response) {
        try {
            const { id } = req.params;

            // Ensure `id` is a number
            const userId = Number(id);

            const bookingOfUser = await prisma.bookings.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    user: true, // Optionally include user details
                    tourPackage: true
                },
            });
            res.status(200).json({ success: true, length: bookingOfUser.length, data: bookingOfUser });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    }

    async updateBooking(req: Request, res: Response) {
        try {
            const { id } = req.params;

            // Ensure `id` is a number
            const bookingId = Number(id);
            if (isNaN(bookingId)) {
                return res.status(400).json({ success: false, message: 'Invalid booking ID' });
            }

            const existingBooking = await prisma.bookings.findUnique({
                where: { id: bookingId },
            });

            if (!existingBooking) {
                return res.status(404).json({ success: false, message: 'Booking not found' });
            }

            const updateObj = req.body;
            const booking = await prisma.bookings.update({
                where: { id: bookingId },
                data: updateObj
            });

            res.status(200).json({ success: true, data: booking });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    }
}

export default new BookingController();
