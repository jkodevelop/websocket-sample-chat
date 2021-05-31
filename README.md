# Sample WebSocket Chat [2021]
This is a sample project of a web chat using **WebSocket**. The repo history includes a simple steps guide for adding different functions on top of basic server/client setup. **webpack** is used for build/bundler for the client side code. **ws** is the module used for the server websocket handling.

note: this is a reference project for using **WebSocket**, it is not ready for production deployment.

### prerequisite:
1. node 12+
3. make sure to run `npm install` to install the package

## Development
`npm start` to start the server and client

For development these libraries are used/enabled:
- ws (handling WebSocket)
- nodemon
- webpack
- jQuery 3^

`./wsserver` folder controls the server side code
`./client` folder controls the client side code

**nodemon** is used for watching and reloading server side development, **webpack** is used for watching and serving changes to the client side.

## Guide
Please use git history to see the steps and changes of this project.