import { cd, exec, mkdir, touch } from 'shelljs';
import { writeFile, readFile } from 'fs';
import { info, error } from 'console';
import { handleQuestion, writeFileByData } from '../utils/utils.cli';

const chalk = require('chalk');

export async function newCli(args) {
    const commands = args._;
    var start = new Date();

    exec('clear');

    var nameProject;
    if (commands.length < 2) {
        nameProject = await handleQuestion('Project name?').catch(() => process.exit());
    } else {
        nameProject = commands[1];
    }
    var pathProject;
    if (args.path) {
        pathProject = args.path;
        cd(pathProject);
    } else {
        pathProject = `./${nameProject}`;
    }
    info(chalk.green(`\n----------------------------------------------------\n`));
    info(chalk.green(` Init hectorjs ...\n`));
    info(chalk.green(` -> Project name: ${nameProject}`));
    info(chalk.green(` -> Root path: ${pathProject}\n`));
    info(chalk.green(`- - - - - - - - - - - - - - - - - - - - - - - - - - \n`));

    mkdir(nameProject);
    cd(nameProject);

    exec('npm init -y');
    exec('npm install @hectorjs/stub-backend');
    exec('npm install chai mocha supertest  --save-dev');

    readFile('./package.json', 'utf8', (err, data) => {
        if (err) return error(err);

        const replacement = `"test": "mocha --exit"`;
        var result = data.replace('\"test\"\: \"echo \\\"Error\: no test specified\\\" \&\& exit 1\"', replacement);

        writeFile('./package.json', result, 'utf8', (err) => {
            if (err) return error(err);
        });
    });

    touch('app.js');
    
    const appData = "module.exports = require('@hectorjs/stub-backend')";
    writeFileByData('app.js', appData);
    

    createFileInPath('health.json','resources');


    // mkdir('resources');
    // cd('resources');
    // touch('health.json');
    
    writeFileByData('health.json', healthData);

    cd('..');
    // touch('app.js');
    
    // const appData = "module.exports = require('@hectorjs/stub-backend')";
    // writeFileByData('app.js', appData);
    
    createFileInPath('health.test.js','test');
    // mkdir('test');
    // cd('test');
    // touch('health.test.js');

    writeFileByData('health.test.js', healthTest);
    
    cd('..');

    checkIDE(args['vs'],'code');
    checkIDE(args['idea'],'idea');

    info(chalk.green('The mock has been set successfully (run node app.js)'));
    var end = new Date() - start
    info(chalk.grey('\nExecution time: %dms \n'), end)
}

const checkIDE = (argsCLI, shortCliIDE) => {
    if (argsCLI && argsCLI == true) {
        exec(`${shortCliIDE} .`);
    }
};

const createFileInPath = (fileName, path) => {
    mkdir(path);
    cd(path);
    touch(fileName);
};

const healthData = `{
  "health": [
    {
      "body_": {
        "STATUS": "UP"
      }
    }
  ]
}`;

const healthTest = `
'use strict';

var app = require('../app');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('GET - health ', () => {
    it('should exist', (done) => {
        request(app)
            .get('/health')
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