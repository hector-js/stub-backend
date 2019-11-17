import { cd } from 'shelljs';
import { warn } from 'console';
import { deleteTemplate } from '../../utils/templates/resources/delete.template';
import { deleteTestTemplate } from '../../utils/templates/tests/delete.template';
import { writeFileByData, checkPath, sanitizeRootFile, getIdFormatted } from '../../utils/utils.cli';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';
const METHOD = 'delete';

export function deleteCli(args) {
  if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
    cd(RESOURCES_PATH);
    let path = args._[2];

    const rootFile = sanitizeRootFile(path);
    const idsFormatted = getIdFormatted(path);

    writeFileByData(`${rootFile}.${METHOD}.json`, deleteTemplate(args, idsFormatted));

    cd('..');
    cd('test');

    writeFileByData(`${rootFile}-${METHOD}.test.js`, deleteTestTemplate(args, idsFormatted));

  } else {
    warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
  }
}
