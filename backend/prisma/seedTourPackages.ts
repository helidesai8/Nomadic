// author: Smit Patel
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

interface City {
  city: string;
  location: string;
}

const cities: City[] = [
  { city: "London", location: "Westminster Borough" },
  { city: "Canada", location: "Rocky Mountains" },
  { city: "Italy", location: "Rome" },
  { city: "Tanzania", location: "Serengeti National Park" },
  { city: "France", location: "Paris" },
  { city: "China", location: "Beijing" },
  { city: "Iceland", location: "Reykjavik" },
  { city: "USA", location: "Arizona" },
  { city: "New York", location: "New york" },
  { city: "Egypt", location: "Cairo" },
  { city: "Australia", location: "Sydney" },
  { city: "Nova Scotia", location: "Halifax" },
  { city: "Japan", location: "Tokyo" },
  {city: "UAE", location: "Dubai"},
];

const getRandomImage = (id: number): string => `https://picsum.photos/1200?random=${id}`;

const getRandomBoolean = (): boolean => Math.random() < 0.5;

const generateTourPackages = (categoryName: string, baseName: string): Prisma.TourPackageCreateManyTourCategoryInput[] => {
  const tourPackages: Prisma.TourPackageCreateManyTourCategoryInput[] = [];
  for (let i = 1; i <= 1000; i++) {
    const generateRandomStartDate = (): Date => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 60) + 1);
      return startDate;
    }
    const startDate = generateRandomStartDate();
    const endDate = new Date(startDate.getTime());
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 9) + 1);
    const duration = Math.floor(Math.random() * 9) + 1;
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    tourPackages.push({
      name: `${baseName} in ${randomCity.city} ${i}`,
      city: randomCity.city,
      location: randomCity.location,
      freeCancelationAvailable: getRandomBoolean(),
      image: getRandomImage(i),
      price: Math.floor(Math.random() * 600) + 20,
      startDate: startDate,
      endDate: endDate,
      duration: duration,
      accommodationDetails: `Accommodation Details for ${baseName} ${i}`,
      activities: `Activities for ${baseName} ${i}`,
      transportationDetails: `Transportation Details for ${baseName} ${i}`
    });
  }
  return tourPackages;
};

export const seedTourPackages = async (): Promise<void> => {
  await prisma.tourCategory.create({
    data: {
      name: "Tours",
      tourPackages: {
        createMany: {
          data: generateTourPackages("Tours", "Cultural Tour"),
        },
      },
    },
  });
  await prisma.tourCategory.create({
    data: {
      name: "Attractions",
      tourPackages: {
        createMany: {
          data: generateTourPackages("Attractions", "Famous Attraction"),
        },
      },
    },
  });

  await prisma.tourCategory.create({
    data: {
      name: "Day Trips",
      tourPackages: {
        createMany: {
          data: generateTourPackages("Day Trips", "Exciting Day Trip"),
        },
      },
    },
  });

  await prisma.tourCategory.create({
    data: {
      name: "Outdoor Activities",
      tourPackages: {
        createMany: {
          data: generateTourPackages("Outdoor Activities", "Adventure Activity"),
        },
      },
    },
  });

  await prisma.tourCategory.create({
    data: {
      name: "Concerts & Shows",
      tourPackages: {
        createMany: {
          data: generateTourPackages("Concerts & Shows", "Live Performance"),
        },
      },
    },
  });
};