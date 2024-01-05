FROM node:20.9.0-alpine3.17

WORKDIR /app/backend
COPY package*.json ./

#RUN apk add --no-cache make gcc g++ python && \
#  npm install && \
#  npm rebuild bcrypt --build-from-source && \
#  apk del make gcc g++ python

RUN npm install
RUN npm install -g nodemon
COPY . .

EXPOSE 3001
CMD ["npm", "run", "dev"]
