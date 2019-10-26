# Simple-TypeScript-Nodejs-Express

This is a basic application for a rest api created with Typescript Nodejs with the express framework. The application has a Socket Server created in it using SocketIO.

The endpoint of the rest api can be accessed from the following link:

```sh
http://localhost:5000/api/data?foo=1
```

The application has this GET route which accepts a foo variable, increments the value of it and sends it to a socket server.

### Installation

The application requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm run build
$ npm run start
```
