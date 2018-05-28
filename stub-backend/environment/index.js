'use strict';

var fileEnv = process.env.NODE_ENV || 'development';
var environment = require(`./${fileEnv}`);

module.exports = environment;