FROM node:20.9-alpine3.17

# ENV NODE_ENV development
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install nodemon
COPY . ./

EXPOSE 3001

CMD [ "npm", "run", "dev" ]