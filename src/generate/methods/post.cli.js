import { cd, touch } from 'shelljs';
import { warn } from 'console';
import { postData } from '../../utils/templates/resources/post.template';
import { writeFileByData, checkPath } from '../../utils/utils.cli';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';

export function postCli() {
  if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
    cd(RESOURCES_PATH);
    touch('post.json');
    writeFileByData('post.json', postData);
  } else {
    warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
  }
}
