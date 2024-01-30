FROM node:20.9.0-alpine3.17

WORKDIR /app/frontend
COPY package*.json ./
RUN npm install --force
EXPOSE 3000

CMD ["npm", "start"]