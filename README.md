# DevOps mentoring app

This project was generated using [Nx](https://nx.dev).

`npm run start:fe` command will run the default Angular dev-server, compile and serve the frontend under http://localhost:4200

`npm run start:be` command will start the NestJS dev-server, compile the Typescript down to NodeJS-compatible JavaScript and serve the result under http://localhost:8080

Added a proxy configuration for the Angular dev-server, which will proxy requests to http://localhost:4200/api to the NestJS dev-server for us, so that we don't run into any CORS issues while developing. The proxy config can be found under `apps/client/proxy.conf.json` and it's referenced inside the angular.json project definition file.

Running `npm run dev` will start both dev-servers in parallel, prefix each line to the Terminal with either "Angular" or "NestJS".

An example of running a db.sh script from `./scripts` folder with specific users.db file:
`(export USER_DB_FILE=../data/users.db && ./db.sh help)`
An example of running a build-client.sh script from `./scripts` folder with specific ENV_CONFIGURATION variable:
`(export ENV_CONFIGURATION=production && ./build-client.sh)`

# Dockerise:

To build Docker image for backend, run: `docker build . -f api.Dockerfile -t devops-api` <br>
To build Docker image for frontend, run: `docker build . -f client.Dockerfile -t devops-client`

To run Docker container for backend, run: `docker run -d --name=my-devops-client -p 80:80 devops-client`<br>
To run Docker container for frontend, run: `docker run -d --name=my-devops-api -p 3000:8080 devops-api-client`

To run with nginx, run `docker compose up` in root directory. App will be available under https://localhost 

