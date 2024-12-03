// Author: Sneh Patel
import { Prisma, Wishlist } from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient as prisma } from "../server";

interface WishListResponse extends Wishlist {
    tourPackageTitle: string;
}

export const createWishList = async (req: Request, res: Response) => {
    try {
        const { userId, tourPackageId } = req.body;
        const wishlist = await prisma.wishlist.findFirst({where: {userId, tourPackageId}});
        if (wishlist) {
            return res.status(400).json({ error: "Wish list already exists" });
        }
        const newWishList = await prisma.wishlist.create({
            data: {
                userId,
                tourPackageId,
            },
        });
        res.status(201).json({
            message: "Wish list created successfully",
            data: newWishList,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to create wish list" });
    }
}

export const getWishList = async (req: Request, res: Response) => {
    const { userId } = req.params;
    console.log(userId);
    try {
        const wishList = await prisma.wishlist.findMany({
            where: {
                userId: parseInt(userId),
            },
            include: {
                tourPackage: {
                    select: {
                        id: true,
                        name: true,
                        location: true,
                        price: true,
                        image: true,
                        startDate: true,
                        endDate: true,
                        freeCancelationAvailable: true,
                        city: true,
                    },
                },
            },
        });
        console.log(wishList);
        res.status(200).json(wishList);
    } catch (error) {
        res.status(500).json({ error: "Failed to get wish list" });
    }
}

export const deleteWishList = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        await prisma.wishlist.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json({ message: "Wish list deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete wish list" });
    }
}

export const checkWishList = async (req: Request, res: Response) => {
    const { userId, tourPackageId } = req.body;
    try {
        const wishList = await prisma.wishlist.findFirst({where: {userId, tourPackageId}});
        const id = wishList?.id;
        console.log(wishList);
        if (wishList) {
            return res.status(200).json({ message: true, id });
        }
        res.status(200).json({ message: false  });
    } catch (error) {
        res.status(500).json({ error: "Failed to check wish list" });
    }
}