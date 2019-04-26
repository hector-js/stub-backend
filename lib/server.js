const environment = require('./environment/index');
const express = require('express');
const cookieParser = require('cookie-parser')
const getRouter = require('./app/components/get/stub.controller');

var server = express();
server.use(cookieParser())
server.use(getRouter);
server.listen(environment.port, () => 
    console.log('JSON Server (' + environment.env + ' environment) is running in the port ' + environment.port))

module.exports = server;

