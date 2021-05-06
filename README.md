# DevOps mentoring app

This project was generated using [Nx](https://nx.dev).

`npm run start:fe` command will run the default Angular dev-server, compile and serve the frontend under http://localhost:4200

`npm run start:be` command will start the NestJS dev-server, compile the Typescript down to NodeJS-compatible JavaScript and serve the result under http://localhost:8080

Added a proxy configuration for the Angular dev-server, which will proxy requests to http://localhost:4200/api to the NestJS dev-server for us, so that we don't run into any CORS issues while developing. The proxy config can be found under `apps/client/proxy.conf.json` and it's referenced inside the angular.json project definition file.

Running `npm run dev` will start both dev-servers in parallel, prefix each line to the Terminal with either "Angular" or "NestJS".

To run with nginx, run `docker compose up` in root directory. App will be available under https://localhost 
