import { cd } from 'shelljs';
import { warn } from 'console';
import { postTemplate } from '../../utils/templates/resources/post.template';
import { postTestTemplate } from '../../utils/templates/tests/post.template';
import { writeFileByData, checkPath, sanitizeRootFile, getIdFormatted } from '../../utils/utils.cli';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';

export function postCli(args) {
  if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
    cd(RESOURCES_PATH);
    let headers;
    let path = args._[2];
    if (args.headers) {
      headers = args.headers.replace(' ', '').split(',');
    }

    const rootFile = sanitizeRootFile(path);
    const idsFormatted = getIdFormatted(path);
 
    writeFileByData(`${rootFile}.post.json`, postTemplate(path, headers, idsFormatted));

    cd('..');
    cd('test');

    writeFileByData(`${rootFile}-post.test.js`, postTestTemplate(path, headers, idsFormatted));

  } else {
    warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
  }
}
