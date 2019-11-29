import { cd } from 'shelljs';
import { warn } from 'console';
import { writeFileByData, checkPath, sanitizeRootFile, getIdFormatted } from './utils.cli';

const chalk = require('chalk');
const RESOURCES_PATH = 'resources';

export function scenarioGenerator(args, resourceTemplate, testTemplate, METHOD) {
    if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
        cd(RESOURCES_PATH);
        let path = args._[2];

        const rootFile = sanitizeRootFile(path);
        const idsFormatted = getIdFormatted(path);

        writeFileByData(`${rootFile}.${METHOD}.json`, resourceTemplate(args, idsFormatted));

        cd('..');
        cd('test');

        writeFileByData(`${rootFile}-${METHOD}.test.js`, testTemplate(args, idsFormatted));

    } else {
        warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
    }
}
