FROM node:20.9.0-alpine

WORKDIR /app/frontend

COPY . .

RUN npm i -g typescript
RUN npm i -g http-server
RUN npm i


RUN npm run build

EXPOSE 3005

#CMD ["npm", "run", "preview"]
CMD ["http-server", "build", "-p", "3005"]

