import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export const seedReviewsPackages = async (): Promise<void> => {
    const user = await prisma.user.create({
        data: {
            first_name: "John",
            last_name: "Doe",
            email: "john@doe.com",
            password: "123",
            resetToken: "123",
        },
    });
    const review = await prisma.review.create({
        data: {
            rating: 5,
            comment: "Great experience",
            tourPackageId: 1,
            userId: user.id,
        },
    });
};
