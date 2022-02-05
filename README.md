# Node App Example
Fazt tutorial Node APP example with mongo DB
+ Express
+ Mongo
+ Mongoose
+ Express Handlebars

## How to start
1. run docker(Docker and D compose is needed)
``` bash
$ docker-compose -f mongodb/database/docker-compose.yml up -d
```
2. Run proyect
``` bash
$ npm install // only the first time
$ npm start 
```
> Server Runs on localhost:8080




## Db Initialize
Access DB folder and run Mongo docker with docker-compose
``` bash
$ cd /mongodb/database
$ docker-compose up -d
```

## Node Proyect
in proyect '/' :
```bash
$ npm install
$ npm run dev
```



