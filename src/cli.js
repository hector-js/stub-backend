
import { info, warn } from 'console';
import { generateCli } from './generate/generate.cli';
import { sizeObject } from './utils/utils.cli';
import { newCli } from './new/new.cli';
import { start } from './start/start.cli';
import { exec } from 'shelljs';

const chalk = require('chalk');
const VERSION = '0.81.0';

export function cli(args) {
    switch (args._[0]) {
        case 'new':
        case 'n':
                newCli(args);
            break;
        case 'generate':
        case 'g':
                generateCli(args);
            break;
        case 'start':
        case 's':
                start(args);
            break;
        case 'test':
        case 't':
            exec('npm test');
            break;
        default:
    }

    if (args.version) {
        info(chalk.yellow(`\nVersion: ${VERSION}\n`));
        process.exit();
    }

    if (args.license) {
        info(chalk.yellow(`\nLicense: MIT\n`));
        process.exit();
    }

    if (args.help) {
        info(chalk.green('\nBelow, you can see different options for your mock:\n\n'));
        info(chalk.green(` -  new/n [name-project]  : create new mock project `));
        info(chalk.green(` -  generate/g  get/g/post/p/delete/d  [url]: create url section `));
        info(chalk.green(` -  start     : run mock service `));
        info(chalk.green(` -  test      : execute the tests `));
        info(chalk.green(` -  --version : know version hjs`));
        info(chalk.green(` -  --vs      : open visual code studio if exists`));
        info(chalk.green(` -  --idea    : open intelliJ studio if exists`));
        info(chalk.green(` -  --headers : add headers to check in the request`));
        info(chalk.green(` -  --license : MIT\n\n`));
        info(chalk.green(`Example: hjs new mock-service --vs\n`));
        info(chalk.yellow(`version: ${VERSION}\n`));
        process.exit();
    }

    if(args._.length===0 && sizeObject(args) === 1){
        warn(chalk.red('\nSorry, you missed a parameter (hjs --help)'));
        process.exit();
    }
}
