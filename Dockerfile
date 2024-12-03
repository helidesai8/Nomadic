# Use Node.js for building both frontend and backend
FROM node:20-alpine AS build

# Set working directory for build
WORKDIR /app

# Copy backend dependencies
COPY /package*.json ./
COPY ./prisma ./prisma/
RUN npm install && npm install -g prisma

# Copy frontend dependencies
COPY ./frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY . .

# Build the frontend
RUN cd frontend && npm run build

# Prepare backend with built frontend assets
RUN mkdir -p public
RUN cp -r frontend/dist/* public

# Final production image
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app/ ./

RUN npm install

# Expose the port
EXPOSE 8080

#npx prisma migrate deploy && npx prisma db seed &&
# Run Prisma migrations and start the server
CMD ["sh", "-c", "npx prisma migrate dev --name init && npx prisma db seed && npm run start"]
# CMD ["sh", "-c", "npm run start"]