#### Building docker images for frontend, backend, database, and also the container of docker.
```
docker-compose build
```
#### Running the container
```
docker-compose up -d
```
now you can access the ui from the port 3000.
<br/>
backend on port 3001.

#### Prisma migration
```
npx prisma migrate dev
```
#### Prisma studio
```
npx prisma studio
```

### Running the project without docker
If you do not have docker. you should do everything manually.
first, you should install the dependencies of both front and backend with the following command:
```
npm install
```
For db integration you install mysql from the official website and make sure its running.
and one last thing you have to add your db connection string to a env file in backend directory.
<br/>
now you are ready to run the development server with following command for both frontend and backend directory:
```
npm run dev
```

#### Api documentation <a href="https://documenter.getpostman.com/view/18846553/2s9YsGhYje">here</a>