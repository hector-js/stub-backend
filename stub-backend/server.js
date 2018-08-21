const jsonServer = require('json-server');
const path = require('path');
const environment = require('./environment/index');
const pathSerDb = environment.pathSerDb || './config/db.json';
const stubController = require("./app/controller/stub.controller")

const server = jsonServer.create();

const middlewares = jsonServer.defaults({ noCors: false, bodyParser: true, logger: false });
server.use(middlewares);

const router = jsonServer.router(path.join('stub-backend', pathSerDb));

server.use((req, res, next) => stubController.handleRequest({request: req, response: res, fn: next}));

server.use(router);

server.listen(environment.port, () => 
    console.log('JSON Server (' + environment.env + ' environment) is running in the port ' + environment.port))

module.exports = server;

