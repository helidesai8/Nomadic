import { PrismaClient } from "@prisma/client";
import {seedBlogs} from "./seedBlogs";
import { seedTourPackages } from "./seedTourPackages";
import { seedReviewsPackages } from "./seedReviewsPackages";
const prisma = new PrismaClient();
async function main() {
    await seedBlogs();
    await seedTourPackages();
    await seedReviewsPackages();
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })