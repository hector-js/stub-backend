import { cd } from 'shelljs';
import { warn } from 'console';
import { writeFileByData, checkPath, sanitizeRootFile, getIdFormatted } from '../../utils/utils.cli';
import { traceTestTemplate } from '../../utils/templates/tests/trace.template';
import { traceTemplate } from '../../utils/templates/resources/trace.template';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';

export function traceCli(args) {
  if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
    cd(RESOURCES_PATH);
    let path = args._[2];

    const rootFile = sanitizeRootFile(path);
    const idsFormatted = getIdFormatted(path);

    writeFileByData(`${rootFile}.trace.json`, traceTemplate(path, args, idsFormatted));

    cd('..');
    cd('test');

    writeFileByData(`${rootFile}-trace.test.js`, traceTestTemplate(path, args, idsFormatted));

    cd('..');
  } else {
    warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
  }
}
