# Nomadic

- _Date Created_: 09 August 2024
- _Last Modification Date_: 09 August 2024
- _Deployed Application URL_: <https://csci-5709-g10.netlify.app/>
- _Repository GitLab URL_: <https://git.cs.dal.ca/snehp/csci-5709-grp-10>

## Authors

- [Smit Patel](smit.patel@dal.ca)
- [Heli Desai](helidesai8@dal.ca)
- [Meer Patel](mr418607@dal.ca)
- [Sneh Patel](sn372821@dal.ca)
- [Vyansi Diyora](vy744910@dal.ca)
- [Parth Patel](pr410642@dal.ca)

## About

The primary goal of the Nomadic project is to create a comprehensive platform that facilitates the management and booking of tours and travel packages. The platform aims to provide an easy-to-use interface for travelers to discover, book, and manage tours, while also offering robust tools for travel agents and tour operators to organize and promote their travel offerings.

## Built With

- [Node.js](https://nodejs.org/en) - Node.js is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.

- [React.js](https://react.dev/) - React.js is a popular JavaScript library for building user interfaces.

## External Dependencies

- [express](https://www.npmjs.com/package/express) - npm package that provide small, robust tooling for HTTP servers, making it a great solution for single page applications, websites, hybrids, or public HTTP APIs.
- [Material UI](https://material-ui.com/) - Material UI is a popular React UI framework that provides pre-built components and styling for creating modern and responsive user interfaces.
- [Chakra UI](https://chakra-ui.com/) - Chakra UI is a simple and modular component library for building React applications.
- [Axios](https://www.npmjs.com/package/axios) Axios is JS library used for making HTTP requests from the browser or Node.js. It provides an easy-to-use API and supports features like request and response interception, automatic JSON parsing, and error handling.
- [React hook form](https://react-hook-form.com/) React Hook Form is a lightweight library for managing form state in React. It provides an intuitive API for handling form validation, error messages, and form submission.
- [Prisma ORM](https://www.prisma.io/) - Prisma is an open-source database toolkit that provides an Object-Relational Mapping (ORM) layer for Node.js and TypeScript.
- [Postgres](https://www.postgresql.org/) - Postgres is a powerful open-source relational database management system.

## Tools and Technology used

- Vite - Javascirpt bundler to build frontend artifacts [1].
- Netlify - Hosting frontend artifacts [2].
- Docker - Container technology to ship backend images [3].
- AWS RDS - Managed database service [4]
- GCP Cloud Run - Deploying backend docker containers [5].
- GCP Cloud Build - Running backed CI CD pipeline [6].
- GCP Artifact Registry - To store backend docker images [7].

## Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- [NodeJS](https://nodejs.org/en) `v16.x`
- [npm](https://www.npmjs.com/) `v9.x`
  OR
- [yarn](https://www.npmjs.com/) `v1.x`

## Getting Started

### Languages and Frameworks Used

```
1. React
2. Node and npm
3. Typescript
```

```
Libraries Used
1) Material UI
2) Tailwind css
3) Chakra UI
4) Axios
5) react-hook-form
```

```
Database
1) Postgres
```

### Installation steps

Follow these steps to set up and run the project locally.

#### 1. Clone the Repository

Clone with HTTPS:

```bash
 git clone https://git.cs.dal.ca/snehp/csci-5709-grp-10.git
```

OR

Clone with SSH:

```bash
git clone git@git.cs.dal.ca:snehp/csci-5709-grp-10.git
```

### Installation for Frontend

#### 1. Navigate to the frontend directory

```bash
cd csci-5709-grp-10/frontend
```

#### 2. Install required dependencies

```bash
npm install
```

OR

```bash
yarn
```

#### 3. Run the project

```bash
npm run dev
```

Open your web browser and navigate to http://localhost:5173.

### Installation for Backend

#### 1. open another terminal

```bash
cd csci-5709-grp-10/backend
```

#### 2. Create .env file and add these fields with its value

```bash
DATABASE_URL=
JWT_SECRET =
MAIL_USERNAME =
MAIL_PASSWORD =
MAIL_HOST=
```

#### 3. Install dependencies

```bash
npm install
```

OR

```bash
yarn
```

#### 4. Start the backend development server

```bash
npm run dev
```

OR

```bash
yarn dev
```

- Server will start on [http://localhost:8000](http://localhost:8000).

## Deployment

### Deploying the Node.js Backend to Render

To deploy the Node.js backend to Render, follow these steps:

1. **Sign In to Render**

   - Login to your Render account at [Render](https://render.com/).

2. **Create a New Web Service**

   - Click on "New" and select "Web Service".
   - Connect to your GitLab repository.
   - Select the branch to deploy from.

3. **Configure the Web Service**

   - Set the root directory to `backend`.
   - Set the build command to `npm install`.
   - Set the start command to `npm start` or `ts-node src/server.ts`.

4. **Set Environment Variables**

   - Add all required environment variables from your `.env` file.

5. **Deploy**

   - Click "Create Web Service" to start the deployment process.

### Deploying the React.js Frontend to Netlify

To deploy the React.js frontend to Netlify, follow these steps:

1. **Sign In to Netlify**

   - Login to your Netlify account at [Netlify](https://www.netlify.com/).

2. **Create a New Site**

   - Click on "New site from Git".
   - Connect to your GitLab repository.
   - Select the branch to deploy from.

3. **Configure the Site**

   - Set the build command to `npm run build`.
   - Set the publish directory to `frontend/dist`.

4. **Deploy**

   - Click "Deploy site" to start the deployment process.

Once deployed, Netlify will provide a URL for the frontend, and Render will provide URLs for the backends. You can use these URLs to access the application in a live environment.

## Folder Structure

#### Frontend:

```
frontend/
├── node_modules/ # Node.js packages
├── public/ # Public assets
└── src/ # Source files
    ├── assets/ # Static assets like images, fonts, etc.
    ├── components/ # Reusable components
    ├── Context/ # React Context for global state management
    ├── hooks/ # Custom React hooks
    ├── interfaces/ # TypeScript interfaces and types
    ├── pages/ # Page-level components
    ├── services/ # Services for API calls and business logic
    ├── styles/ # Global styles and CSS files
    ├── utils/ # Utility functions and helpers
    ├── App.css # Main CSS file for the App component
    ├── App.tsx # Main App component in TypeScript
    ├── index.css # Global CSS file
    ├── logo.svg # Application logo in SVG format
    └── main.tsx # Entry point of the application in TypeScript
```

#### Node Backend:

```
backend/
├── node_modules/ # Node.js packages
├── prisma/ # Prisma ORM setup and schema files
└── src/ # Source files
    ├── controllers/ # Controllers for handling requests and business logic
    ├── routes/ # Route definitions for the application
    ├── secret.ts # Secret management or environment variable handling
    ├── server.ts # Main server configuration and setup
├── .env # Environment variables
├── .gitignore # Git ignore file
├── Dockerfile # Docker configuration for containerization
├── package-lock.json # Lockfile for npm dependencies
├── package.json # Project metadata and npm dependencies
├── server.ts # Duplicate or another server file (potential typo or needed duplicate)
├── tsconfig.json # TypeScript configuration
└── yarn.lock # Lockfile for Yarn dependencies

```

## Sources used

backend/prisma/schema.prisma

```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  USER
  MANAGER
}

model User {
  id               Int       @id @default(autoincrement())
  first_name       String
  last_name        String
  email            String    @unique
  password         String
  resetToken       String?
  resetTokenExpiry DateTime?
  createdAt        DateTime  @default(now())
  reviews          Review[]
  role       Role     @default(USER)
  Wishlist         Wishlist[]

  @@map("user")
  Bookings Bookings[]
  BlogPost BlogPost[]
}



model TourCategory {
  id           Int           @id @default(autoincrement())
  name         String
  tourPackages TourPackage[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

model TourPackage {
  id                       Int          @id @default(autoincrement())
  name                     String
  location                 String
  city                     String
  price                    Float
  image                    String
  freeCancelationAvailable Boolean
  tourCategory             TourCategory @relation(fields: [tourCategoryId], references: [id])
  tourCategoryId           Int
  accommodationDetails     String
  transportationDetails    String
  activities               String
  startDate                DateTime
  endDate                  DateTime
  duration                 Int
  createdAt                DateTime     @default(now())
  updatedAt                DateTime     @updatedAt
  reviews                  Review[]
  Bookings                 Bookings[]
  Wishlist                 Wishlist[]
}

model Review {
  id            Int         @id @default(autoincrement())
  comment       String
  rating        Int
  tourPackage   TourPackage @relation(fields: [tourPackageId], references: [id])
  tourPackageId Int
  user          User        @relation(fields: [userId], references: [id])
  userId        Int
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

model Bookings {
  id             Int         @id @default(autoincrement())
  noOfPeople     String?
  totalCost      String?
  note           String?     @default("")
  tourPackage    TourPackage @relation(fields: [tourPackageId], references: [id])
  tourPackageId  Int
  createdAt      DateTime    @default(now())
  userId         Int
  user           User        @relation(fields: [userId], references: [id])
}

model BlogPost {
  id          Int       @id @default(autoincrement())
  title       String
  category    String
  description String
  thumbnail   String
  content     String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  comments    Comment[]
  userId      Int
  user        User       @relation(fields: [userId], references: [id])
}

model Comment {
  id         Int      @id @default(autoincrement())
  comment    String
  createdAt  DateTime @default(now())
  blogPost   BlogPost @relation(fields: [blogPostId], references: [id])
  blogPostId Int
  name       String
  ratings    Int
}

model Wishlist {
  id           Int          @id @default(autoincrement())
  tourPackage   TourPackage  @relation(fields: [tourPackageId], references: [id])
  tourPackageId Int
  user          User         @relation(fields: [userId], references: [id])
  userId        Int
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
}


```

- This code is taken from [Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-typescript-postgresql) official docs. From this code snippet, We got the idea of how to define the schema of the table .

```
async function main() {
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
    },
  })

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  console.dir(allUsers, { depth: null })
}
```

- This code is taken from [Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/querying-the-database-typescript-postgresql) official docs. From this code snippet, We got the idea of how to query the data from the table .

### frontend/src/pages/TourDetail.tsx

Lines 3-8

```

import {
Typography, Button, Grid, Paper, Box, Container,
CircularProgress, Card, CardMedia, CardContent, Chip,
styled, Avatar, Rating, ThemeProvider, createTheme,
List, ListItem, Divider, Fade, IconButton, Tooltip
} from '@mui/material';

Lines 197-248

tsx
<StyledCard>
<Box position="relative">
<StyledCardMedia
              image={tourPackage.image}
              title={tourPackage.name}
            />
<OverlayContent>
<Typography variant="h3" gutterBottom>
{tourPackage.name}
</Typography>
<Box display="flex" alignItems="center" mb={2}>
<LocationOnIcon />
<Typography variant="h6" ml={1}>
{tourPackage.location}, {tourPackage.city}
</Typography>
</Box>
<Rating value={4.5} readOnly precision={0.5} />
</OverlayContent>
</Box>
<CardContent>
<Grid container spacing={3} alignItems="center">
<Grid item xs={12} md={6}>
<Box display="flex" alignItems="center">
<AttachMoneyIcon color="secondary" fontSize="large" />
<Typography variant="h4" color="secondary" ml={1}>
${tourPackage.price}
</Typography>
<Typography variant="subtitle1" color="textSecondary" ml={1}>
/ person
</Typography>
</Box>
</Grid>
<Grid item xs={12} md={6}>
<Box display="flex" justifyContent="flex-end">
<Chip
label={tourPackage.tourCategory.name}
color="secondary"
variant="outlined"
sx={{ mr: 1 }}
/>
{tourPackage.freeCancelationAvailable && (
<Chip
                      label="Free Cancellation"
                      color="success"
                      variant="outlined"
                    />
)}
</Box>
</Grid>
</Grid>
</CardContent>
</StyledCard>
```

- The code above was created by adapting the code in [Materialui](https://mui.com/material-ui/) as shown below:
  Lines 91-112

```

const FeatureIcon = styled(Avatar)(({ theme }) => ({
backgroundColor: theme.palette.primary.main,
color: theme.palette.common.white,
marginRight: theme.spacing(2),
}));

const ReviewPaper = styled(Paper)(({ theme }) => ({
padding: theme.spacing(4),
marginTop: theme.spacing(4),
borderRadius: theme.shape.borderRadius \* 2,
background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
flexDirection: 'column',
alignItems: 'flex-start',
padding: theme.spacing(3),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
width: 60,
height: 60,
marginRight: theme.spacing(2),
backgroundColor: theme.palette.secondary.main,
color: theme.palette.secondary.contrastText,
}));

- The code above was created by adapting the code in [Materialui](https://mui.com/material-ui/) as shown below:
  Lines 4-8
  tsx
  import {
  Box, Button, Container, Rating, TextField, Typography,
  Paper, Snackbar, Alert, CircularProgress, Fade,
  ThemeProvider, createTheme
  } from '@mui/material';
```

Lines 123-176

```
tsx
<Container maxWidth="sm">
<Fade in={true} timeout={1000}>
<StyledPaper elevation={3}>
<Box display="flex" flexDirection="column" alignItems="center" mb={4} mt={14}>
<RateReviewIcon sx={{ fontSize: 48, color: 'primary.main' }} />
<Typography variant="h4" component="h2" sx={{ mt: 2, color: 'text.primary' }}>
Share Your Experience
</Typography>
</Box>
<StyledForm onSubmit={handleSubmit}>
<StyledRatingBox>
<Typography component="legend" variant="h6" color="text.secondary">
How was your experience?
</Typography>
<Rating
name="rating"
value={rating}
onChange={(\_, newValue) => setRating(newValue)}
precision={1}
size="large"
/>
<SentimentSatisfiedAltIcon sx={{ fontSize: 48, color: 'primary.main' }} />
</StyledRatingBox>
<TextField
label="Leave a comment"
multiline
rows={4}
variant="outlined"
value={comment}
onChange={(e) => setComment(e.target.value)}
fullWidth
/>
<Button
type="submit"
variant="contained"
color="primary"
size="large"
disabled={isSubmitting || rating === null}
fullWidth >
{isSubmitting ? <CircularProgress size={24} /> : 'Submit Review'}
</Button>
</StyledForm>
<Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
              >
<Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
{snackbar.message}
</Alert>
</Snackbar>
</StyledPaper>
</Fade>
</Container>
```

- The code above was created by adapting the code in [Materialui](https://mui.com/material-ui/) as shown below:

## References

[1] “Vite,” vitejs. [Online]. Available: https://vitejs.dev/. [Accessed: 30-Jul-2024]
[2] “Scale & Ship Faster with a composable web architecture,” Netlify. [Online]. Available: https://www.netlify.com/. [Accessed: 30-Jul-2024]
[3] “Accelerated Container Application Development,” Docker, 08-Jul-2024. [Online]. Available: https://www.docker.com/. [Accessed: 30-Jul-2024]
[4] Managed SQL database - amazon relational database service (RDS) - AWS. [Online]. Available: https://aws.amazon.com/rds/. [Accessed: 30-Jul-2024]
[5] “Cloud run,” Google. [Online]. Available: https://cloud.google.com/run. [Accessed: 30-Jul-2024]
[6] “Cloud Build Serverless CI/CD Platform.” Google Cloud, [Online]. Available: https://cloud.google.com/build?hl=en. [Accessed: 30 July 2024]
[7] “Artifact Registry.” Google Cloud, [Online]. Available: https://cloud.google.com/artifact-registry [Accessed: 30 July 2024]

## Acknowledgements

- The official express (backend framework) Docs provided me with valuable guidance and resources for the nodejs backend.
- The official Docs of nodemon helps me to configure the nodejs app in such a way that after every changes in the code doesn't needs the server to restart.
- The official Docs of Material-UI and Chakra-UI helps me to use the ready made component and Tailwind for applying CSS.
- The official Docs of prisma ORM helps me to connect to the Postgres database, define schema and query from the database.
