import { existsSync } from 'fs';
import { writeFile } from 'fs';
import { cd, touch } from 'shelljs';

const chalk = require('chalk');

const RESOURCES_PATH = 'resources';

export function getCli(args) {
    const path = './pacKage.json';

    if (checkPath('./package.json') && checkPath(`./${RESOURCES_PATH}/`)) {
        cd(RESOURCES_PATH);
        touch('get.json');
    
        const getData = `{\n    \"${args._[2]}\" : [\n        {\n            \"body_\" : {\"STATUS\":\"UP\"},\n            \"headers_\" : [],\n            \"status_\" : 0,\n            \"cookies_\" : [],\n            \"description_\" : \"Description to be defined\"\n        }\n    ]\n}`;
        writeFile('get.json', getData, (err) => {
            if (err){ 
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

