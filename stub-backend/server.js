const jsonServer = require('json-server');
const environment = require('./environment/index');
const utils = require('./config/utils');
const path = require('path');
const pathToDb = environment.pathDb || './config/db.json';
const db = require(pathToDb);

const stubController = require("./app/controller/stub.controller")

const server = jsonServer.create();

const middlewares = jsonServer.defaults({ noCors: false, bodyParser: true, logger: false });
server.use(middlewares);

const router = jsonServer.router(path.join('stub-backend', pathToDb));


server.use((req, res, next) => stubController.handleRequest(req,res,next,db));

server.use(router);

server.listen(environment.port, () => 
    console.log('JSON Server (' + environment.env + ' environment) is running in the port ' + environment.port))

module.exports = server;

