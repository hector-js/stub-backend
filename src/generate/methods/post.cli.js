import { existsSync } from 'fs';
import { writeFile } from 'fs';
import { cd, touch } from 'shelljs';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';

export function postCli() {
  if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
    cd(RESOURCES_PATH);
    touch('post.json');

    writeFile('post.json', postData, (err) => {
      if (err) {
        console.error('Error creating get.json file');
        throw err;
      }
      console.info(chalk.green('\nPOST file created! :)\n'));
    });

  } else {
    console.warn(chalk.yellow('\nInfo: Please, navigate to package.json file level and run the command from there.'));
  }
}

function checkPath(path) {
  try {
    return existsSync(path);
  } catch (err) {
    console.error('Error in the location');
    return false;
  }
}

const postData = `{
  "post_": [
    {
      "data": {
        "dummy": "dummy"
      },
      "response":{
        "dummyResponse": "dummyResponse"
      }
    }
  ]
}`;

