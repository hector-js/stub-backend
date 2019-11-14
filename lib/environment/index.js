'use strict';

const fileEnv = process.env.NODE_ENV || 'development';
const environment = require(`./${fileEnv.replace(' ', '')}`);

module.exports = environment;
