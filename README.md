#### Building docker images for frontend, backend, database, and also the container of docker.
```
docker-compose up --build
```
#### Running the container
```
docker-compose up -d
```
now you can access the ui from the port 3000.
<br/>
backend on port 3001.

### If it is your first time cloning this repo, you should do these things first.
#### Prisma migration (handled in docker)
```
npx prisma migrate dev
```
#### prisma seeders (from the backend directory) 
```
bash scripts/run.sh
```
#### if you have errors of permission run this
```
sudo chmod +x scripts/run.sh
```
#### Prisma studio
```
npx prisma studio
```

#### Api documentation <a href="https://documenter.getpostman.com/view/18846553/2s9YsGhYje">here</a>