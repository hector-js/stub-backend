import { existsSync } from 'fs';
import { writeFile } from 'fs';
import { cd, touch } from 'shelljs';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';

export function getCli(args) {
	if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
		cd(RESOURCES_PATH);
		touch('get.json');

		writeFile('get.json', getTemplate(args._[2]), (err) => {
			if (err) {
				console.error('Error creating get.json file');
				throw err;
			}
			console.info(chalk.green('\nGET endpoint created! :)'));
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

const getTemplate = (value) => {
	return `{
  "${value}" : [
    {
      "body_" : {"STATUS":"UP"},
      "headers_" : [],
      "status_" : 0,
      "cookies_" : [],
      "description_" : "Description to be defined"
    }
  ]
}`;
}

