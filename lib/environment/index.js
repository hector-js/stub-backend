'use strict';

const args = require('minimist')(process.argv.slice(2));

const profile = args['profile']?args['profile']:process.env.NODE_ENV;
const fileEnv = profile || 'development';
const environment = require(`./${fileEnv.replace(' ', '')}`);

module.exports = environment;
