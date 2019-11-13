import { existsSync } from 'fs';
import { writeFile } from 'fs';
import { cd, touch } from 'shelljs';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';

export function getCli(args) {
  if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
    cd(RESOURCES_PATH);
    touch('get.json');


    var headers;
    if (args.headers) {
      headers = args.headers.replace(' ', '').split(',');
    }

    writeFile('get.json', getTemplate(args._[2], headers), (err) => {
      if (err) {
        console.error('Error creating get.json file');
        throw err;
      }
      console.info(chalk.green('\nGET endpoint created! :)'));
    });

    cd('..');
    cd('test');
    writeFile(`${args._[2].replace(/\W/g, '')}.test.js`, getTestTemplate(args._[2], headers), (err) => {
      if (err) {
        console.error('Error creating get.json file');
        throw err;
      }
      console.info(chalk.green('\nGET test created! :)'));
    });
    cd('..');
  } else {
    console.warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
  }
}

function checkPath(path) {
  try {
    return existsSync(path);
  } catch (err) {
    console.error('Error in the location');
    return false;
  }
}

const getTemplate = (endpoint, headers) => {
  var headersCustom = '';
  if (headers) {
    headers.forEach(header => {
      headersCustom = headersCustom + `"${header}",`;
    });
  }
  console.log('headersCustom: ', headersCustom)
  return `{
  "${endpoint}" : [
    {
      "body_" : {"STATUS":"UP"},
      "headers_" : [${headersCustom.slice(0, -1)}],
      "status_" : 0,
      "cookies_" : [],
      "description_" : "Description to be defined"
    }
  ]
}`;
};

const getTestTemplate = (endpoint, headers) => {
  return `
'use strict';

var app = require('../app');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('GET - ${endpoint} ', () => {
    it('should exist', (done) => {
        request(app)
            .get('${endpoint.startsWith('/') ? endpoint : '/' + endpoint}')
            ${headers ? `.set({${arrayToJson(headers)}})` : ''}
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.deep.equal({
                    "STATUS": "UP"
                });
                done();
            });
    });
});
`;
}


const arrayToJson = (headers) => {

  var headersJson = ''

  headers.forEach(header => {
    headersJson = headersJson + `${header}: "any value" ,`
  });

  return headersJson.slice(0, -1);
}
