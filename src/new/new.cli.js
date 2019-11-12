import { cd, exec, mkdir, touch } from 'shelljs';
import { writeFile } from 'fs';
import { info } from 'console';
import { handleQuestion } from '../utils/utils.cli';

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
        // TODO: add this question for manual guidance
        // pathProject = await handleQuestion('Root path? (example: /c/opt/...)').catch(() => process.exit());
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
    mkdir('resources');
    cd('resources');
    touch('health.json');

    const healthData = "{\n    \"health\" : [\n        {\n            \"body_\" : {\"STATUS\":\"UP\"}\n        }\n    ]\n}";
    writeFile('health.json', healthData, (err) => {
        if (err) throw err;
    });
    cd('..');
    touch('app.js');

    const appData = "require('@hectorjs/stub-backend')";
    writeFile('app.js', appData, (err) => {
        if (err) throw err;
    });

    if (args['vs'] && args['vs'] == true) {
        exec('code .');
    }
    if (args['idea'] && args['idea'] == true) {
        exec('idea .');
    }

    info(chalk.green('The mock has been set successfully (run node app.js)'));
    var end = new Date() - start
    info(chalk.grey('\nExecution time: %dms '), end)
}
