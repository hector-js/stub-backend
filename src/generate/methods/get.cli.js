import { cd } from 'shelljs';
import { warn } from 'console';
import { writeFileByData, checkPath } from '../../utils/utils.cli';
import { getTestTemplate } from '../../utils/templates/tests/get.template';
import { getTemplate } from '../../utils/templates/resources/get.template';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';

export function getCli(args) {
  if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
    cd(RESOURCES_PATH);

    var headers;
    if (args.headers) {
      headers = args.headers.replace(' ', '').split(',');
    }

    const rootFile = args._[2].replace(/\W/g, '');

    writeFileByData(`${rootFile}.get.json`, getTemplate(args._[2], headers));

    cd('..');
    cd('test');

    writeFileByData(`${rootFile}.test.js`, getTestTemplate(args._[2], headers));

    cd('..');
  } else {
    warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
  }
}
