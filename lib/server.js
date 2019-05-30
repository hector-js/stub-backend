const environment = require('./environment/index');
const express = require('express');
const cookieParser = require('cookie-parser');
const getRouter = require('./app/components/get/get.router');
const postRouter = require('./app/components/post/post.router');
const bodyParser = require('body-parser');

var server = express();
server.use(cookieParser());
server.use(bodyParser.json())
// server.use(bodyParser.urlencoded({ extended: false }))
server.use(getRouter);
server.use(postRouter);
server.listen(environment.port, () => 
    console.log('JSON Server (' + environment.env + ' environment) is running in the port ' + environment.port))

module.exports = server;

