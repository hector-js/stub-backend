import { cd } from 'shelljs';
import { warn } from 'console';
import { writeFileByData, checkPath, sanitizeRootFile, getIdFormatted, getHeaders } from '../../utils/utils.cli';
import { headTestTemplate } from '../../utils/templates/tests/head.template';
import { headTemplate } from '../../utils/templates/resources/head.template';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';
const METHOD = 'head';

export function headCli(args) {
  if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
    cd(RESOURCES_PATH);
    let path = args._[2];

    const rootFile = sanitizeRootFile(path);
    const idsFormatted = getIdFormatted(path);

    writeFileByData(`${rootFile}.${METHOD}.json`, headTemplate(path, args, idsFormatted));

    cd('..');
    cd('test');

    writeFileByData(`${rootFile}-${METHOD}.test.js`, headTestTemplate(path, args, idsFormatted));

    cd('..');
  } else {
    warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
  }
}
