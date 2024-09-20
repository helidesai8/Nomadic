import { BlogPost, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const categories = [
  "Travel",
  "Beach Holiday",
  "Adventure",
  "Cultural Exploration",
  "Food & Drink",
  "Nature & Wildlife",
  "City Guide",
  "Historical Sites",
];

const generateRandomQuote = () => {
  return `> "${faker.lorem.sentence()}" - ${faker.person.fullName()}`;
};

const generateBlogContent = (city: string, index: number) => {
  return `
  # Welcome to the **${city}**! 🌍
  This destination is renowned for its stunning landscapes, rich cultural history, and delicious cuisine.

  ![Scenic view](${`https://picsum.photos/600/400?random=${index + 100}`})

  ## Day 1: Arrival in ${city} ✈️
  We began our journey in **${city}**, a charming town that serves as a perfect gateway to exploring the region. 
  ${city} is famous for its beautiful beaches and the production of artisanal goods. 
  Don't miss a chance to try the local delicacies and handmade crafts.

  ### Exploring the Town 🏙️
  The town offers a variety of attractions including museums, parks, and local markets. Be sure to visit the ${faker.company.name()} museum and enjoy the local arts and crafts.

  ![Local Cuisine](${`https://picsum.photos/600/400?random=${index + 200}`})

  #### Best Places to Eat 🍴
  - **${faker.company.name()}**: Known for its exquisite seafood dishes.
  - **${faker.company.name()}**: Offers an amazing farm-to-table dining experience.
  - **${faker.company.name()}**: Perfect for a relaxing afternoon coffee and pastries.

  ## Day 2: Exploring ${city} 🏞️
  Next, we visited **${city}**, a place with breathtaking views and historical landmarks. 

  ![Historical Site](${`https://picsum.photos/600/400?random=${index + 300}`})

  ### Must-See Attractions 🏛️
  - **${faker.company.name()}**: A historic site with a fascinating backstory.
  - **${faker.company.name()}**: Known for its stunning architecture and gardens.
  - **${faker.company.name()}**: Offers interactive exhibits and tours.

  #### Hidden Gems 💎
  - **Secret Beach**: A tranquil spot perfect for a quiet day by the sea.
  - **Old Town Market**: A bustling market where you can find unique souvenirs and local treats.

  ## Day 3: ${city} and Surrounding Areas 🏰
  **${city}:** This historic town, with its ancient ruins and vibrant festivals, is a must-visit.
  **Nearby Villages:** Perched on high cliffs above the sea, these villages offer tranquility and spectacular views. 

  ### Exploring Historical Sites 🏺
  Learn about the rich history of ${city} by visiting its numerous historical sites and landmarks.

  #### Museums and Galleries 🖼️
  - **${faker.company.name()} Museum**: Showcases local history and artifacts.
  - **${faker.company.name()} Gallery**: Features contemporary art from local artists.
  - **${faker.company.name()} Exhibition**: Offers a rotating collection of traveling exhibits.

  ## Local Cuisine 🍽️
  This region is as much a feast for the palate as it is for the eyes. Here are some dishes and drinks you must try:
  - **Seafood**: Fresh from the sea, try the grilled octopus and seafood pasta.
  - **Pasta**: Local handmade pasta with seasonal ingredients.
  - **Pizza**: Authentic wood-fired pizza that you must try! 🍕
  - **Limoncello**: A refreshing way to end any meal. 🍹

  ### Must-Do Activities 🎉
  - **Hiking**: Explore the scenic trails of ${city}.
  - **Shopping**: Visit the local markets and boutiques.
  - **Nightlife**: Enjoy the vibrant nightlife with local music and dance.

  ## Best Time to Visit 🗓️
  The best time to visit ${city} is during the spring and fall when the weather is perfect for outdoor activities and sightseeing.

  ## Quote of the Day 💬
  ${generateRandomQuote()}

  ## Related Posts 📚
  - [Discover the Magic of ${city}](#)
  - [Exploring the Wonders of ${city}](#)
  - [A Journey through ${city}](#)

  ![Beautiful Landscape](${`https://picsum.photos/600/400?random=${
    index + 400
  }`})
`;
};

export const seedBlogs = async (): Promise<void> => {
  const user = await prisma.user.create({
    data: {
        first_name: "John",
        last_name: "Doe",
        email: "john1@doe.com",
        password: "123",
        resetToken: "123",
    },
  });
  const blogPromises: Promise<BlogPost>[] = [];
  for (let i = 0; i < 1000; i++) {
    const city = faker.location.city();
    const content = generateBlogContent(city, i);
    const title = `Discover the ${city} 🌟`;
    const thumbnail = `https://picsum.photos/1200/1000?random=${i + 2}`;
    const description = `Explore the breathtaking ${city}, known for its stunning landscapes, rich cultural history, and delicious cuisine. Discover the cultural and culinary delights of this region.`;
    const category = categories[Math.floor(Math.random() * categories.length)];
    const userId = user.id;
    blogPromises.push(
      prisma.blogPost.create({
        data: {
          title,
          content,
          category,
          thumbnail,
          description,
          userId,
        },
      })
    );
  }

  const blogs = await Promise.all(blogPromises);

  // Create multiple comments for the first few blogs
  for (let i = 0; i < Math.min(100, blogs.length); i++) {
    const blogPostId = blogs[i].id;
    for (let j = 0; j < 10; j++) {
      await prisma.comment.create({
        data: {
          name: faker.person.fullName(), // Use faker to generate a random name for the commenter
          comment: faker.lorem.sentence(),
          blogPostId: blogPostId,
          ratings: Math.floor(Math.random() * 5) + 1,
        },
      });
    }
  }

  console.log("Seeding finished.");
};
