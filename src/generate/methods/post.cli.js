import { cd, touch } from 'shelljs';
import { warn } from 'console';
import { postTemplate } from '../../utils/templates/resources/post.template';
import { postTestTemplate } from '../../utils/templates/tests/post.template';
import { writeFileByData, checkPath } from '../../utils/utils.cli';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';

export function postCli(args) {
  if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
    cd(RESOURCES_PATH);
    var headers;
    if (args.headers) {
      headers = args.headers.replace(' ', '').split(',');
    }
    const rootFile = args._[2].replace(/\W/g, '');
    writeFileByData(`${rootFile}.post.json`, postTemplate(args._[2], headers));

    cd('..');
    cd('test');

    writeFileByData(`${rootFile}-post.test.js`, postTestTemplate(args._[2], headers));

  } else {
    warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
  }
}
