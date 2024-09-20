FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npm i -g prisma

COPY . .

EXPOSE 8000

CMD ["npx", "prisma", "migrate", "deploy"]
CMD ["npm", "run", "start"]
