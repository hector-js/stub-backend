'use strict';

var fileEnv = process.env.NODE_ENV || 'development';
var environment = require(`./${fileEnv.replace(' ','')}`);

module.exports = environment;