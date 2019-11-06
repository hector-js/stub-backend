import { createInterface } from 'readline';
import { cd, exec, mkdir, touch } from 'shelljs';
import { writeFile } from 'fs';
import { info, warn } from 'console';

const chalk = require('chalk');
const VERSION = '0.32.0';

export async function cli(args) {

    if (!args) {
        warn(chalk.red('\nSorry, you missed a parameter (hjs --help)'));
        process.exit();
    }

    if (args.version) {
        info(chalk.yellow(`\nVersion: ${VERSION}\n`));
        process.exit();
    }

    if (args.help) {
        info(chalk.green('\nBelow, you can see different options for your mock:\n\n'));
        info(chalk.green(` --new     : create new mock project`));
        info(chalk.green(` --version : know version hjs`));
        info(chalk.green(` --vs      : open visual code studio if exists`));
        info(chalk.green(` --licence : MIT\n\n`));
        info(chalk.green(`Example: hjs --new --vs\n`));
        info(chalk.yellow(`version: ${VERSION}\n`));
        process.exit();
    }

    if (args.new) {
        var start = new Date()

        exec('clear');

        var nameProject = await handleQuestion('Project name?').catch(() => process.exit());
        var pathProject = await handleQuestion('Root path? (example: /c/opt/...)').catch(() => process.exit());
        info(chalk.green(`\n----------------------------------------------------\n`));
        info(chalk.green(` Init hectorjs ...\n`));
        info(chalk.green(` -> Project name: ${nameProject}`));
        info(chalk.green(` -> Root path: ${pathProject}\n`));
        info(chalk.green(`- - - - - - - - - - - - - - - - - - - - - - - - - - \n`));

        cd(pathProject);
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

        info(chalk.green(' Be aware if you dont have hjs set globally, you will need to run the server via node command\n'));
        var runHealth = await handleQuestion('Run service with health check? (y/N)').catch(() => process.exit());
        if (args['vs'] && args['vs'] == true) {
            exec('code .');
        }
        if (runHealth == 'y') {
            require('@hectorjs/stub-backend');
        } else {
            info('Ready to test (run node app.js)');
        }

        var end = new Date() - start
        info(chalk.green('\nExecution time: %dms '), end)
        process.exit();
    }

    warn(chalk.red('\nSorry, you missed a parameter (hjs --help)'));
    process.exit();
};

function handleQuestion(message) {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        readline.question(chalk.blue('\n>')+chalk.grey(` ${message} \n`),
            (name) => handleAnswer(resolve, reject, readline, name));
    });
}

function handleAnswer(resolve, reject, readline, value) {
    if (!value) {
        warn(chalk.red(` You must add a value  :(`));
        readline.close();
        reject();
    } else {
        info(chalk.green(` Well done  :)`));
        readline.close();
        resolve(value);
    }
}
