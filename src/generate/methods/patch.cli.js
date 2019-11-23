import { cd } from 'shelljs';
import { warn } from 'console';
import { patchTemplate } from '../../utils/templates/resources/patch.template';
import { patchTestTemplate } from '../../utils/templates/tests/patch.template';
import { writeFileByData, checkPath, sanitizeRootFile, getIdFormatted } from '../../utils/utils.cli';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';
const METHOD = 'patch';

export function patchCli(args) {
  if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
    cd(RESOURCES_PATH);
    let path = args._[2];

    const rootFile = sanitizeRootFile(path);
    const idsFormatted = getIdFormatted(path);
 
    writeFileByData(`${rootFile}.${METHOD}.json`, patchTemplate(args, idsFormatted));

    cd('..');
    cd('test');

    writeFileByData(`${rootFile}-${METHOD}.test.js`, patchTestTemplate(args, idsFormatted));

  } else {
    warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
  }
}
