import { getCli } from "./methods/get.cli";
import { postCli } from "./methods/post.cli";

const chalk = require('chalk');

export function generateCli(args) {
  switch (args._[1]) {
    case 'get':
    case 'g':
      getCli(args);
      break;
    case 'post':
    case 'p':
      postCli(args);
      break;
    default:
        console.warn(chalk.yellow('\nMethod not found :(\n'));
  }
}