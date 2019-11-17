import { cd } from 'shelljs';
import { warn } from 'console';
import { writeFileByData, checkPath, sanitizeRootFile, getIdFormatted, getHeaders } from '../../utils/utils.cli';
import { getTestTemplate } from '../../utils/templates/tests/get.template';
import { getTemplate } from '../../utils/templates/resources/get.template';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';

export function getCli(args) {
  if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
    cd(RESOURCES_PATH);
    let path = args._[2];

    const rootFile = sanitizeRootFile(path);
    const idsFormatted = getIdFormatted(path);

    writeFileByData(`${rootFile}.get.json`, getTemplate(path, args, idsFormatted));

    cd('..');
    cd('test');

    writeFileByData(`${rootFile}-get.test.js`, getTestTemplate(path, args, idsFormatted));

    cd('..');
  } else {
    warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
  }
}
