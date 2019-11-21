import { cd } from 'shelljs';
import { warn } from 'console';
import { putTemplate } from '../../utils/templates/resources/put.template';
import { putTestTemplate } from '../../utils/templates/tests/put.template';
import { writeFileByData, checkPath, sanitizeRootFile, getIdFormatted } from '../../utils/utils.cli';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';
const METHOD = 'put';

export function putCli(args) {
  if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
    cd(RESOURCES_PATH);
    let path = args._[2];

    const rootFile = sanitizeRootFile(path);
    const idsFormatted = getIdFormatted(path);
 
    writeFileByData(`${rootFile}.${METHOD}.json`, putTemplate(args, idsFormatted));

    cd('..');
    cd('test');

    writeFileByData(`${rootFile}-${METHOD}.test.js`, putTestTemplate(args, idsFormatted));

  } else {
    warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
  }
}
