const environment = require('./environment/index');
const express = require('express');
const getRouter = require('./app/components/get/stub.controller');

var server = express();
// server.get((req, res, next) => getService.handleRequest({request: req, response: res, fn: next}));


server.use(getRouter);
server.listen(environment.port, () => 
    console.log('JSON Server (' + environment.env + ' environment) is running in the port ' + environment.port))

module.exports = server;

