import { cd, touch } from 'shelljs';
import { warn } from 'console';
import { writeFileByData, checkPath } from '../../utils/utils.cli';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';

export function getCli(args) {
  if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
    cd(RESOURCES_PATH);

    var headers;
    if (args.headers) {
      headers = args.headers.replace(' ', '').split(',');
    }

    const rootFile = args._[2].replace(/\W/g, '');

    writeFileByData(`${rootFile}.get.json`, getTemplate(args._[2], headers));

    cd('..');
    cd('test');

    writeFileByData(`${rootFile}.test.js`, getTestTemplate(args._[2], headers));

    cd('..');
  } else {
    warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
  }
}

const getTemplate = (endpoint, headers) => {
  var headersCustom = '';
  if (headers) {
    headers.forEach(header => {
      headersCustom = headersCustom + `"${header}",`;
    });
  }
  return `{
  "${endpoint}" : [
    {
      "body_" : {"body":"To be defined!"},
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
