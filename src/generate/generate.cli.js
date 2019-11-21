import { getCli } from "./methods/get.cli";
import { headCli } from "./methods/head.cli";
import { postCli } from "./methods/post.cli";
import { deleteCli } from "./methods/delete.cli";
import { info, warn } from 'console';

const chalk = require('chalk');

export function generateCli(args) {

  if (args.help) {
    info(chalk.green('\nGenerate options:\n'));
    info(chalk.grey(` -  hjs generate  get [url]: scenario for a GET request`));
    info(chalk.grey(` -  hjs generate  post [url]: scenario for a POST request`));
    info(chalk.grey(` -  hjs generate  delete [url]: scenario for a DELETE request`));
    info(chalk.grey(` -  hjs generate  head [url]: scenario for a DELETE request`));
    info(chalk.green(`\nYou can use the following abreviatures:\n`));
    info(chalk.grey(` -  generate = g  (hjs g get ...)`));
    info(chalk.grey(` -  get = g       (hjs g g ...)`));
    info(chalk.grey(` -  post = p      (hjs g p ...)`));
    info(chalk.grey(` -  delete = d    (hjs g d ...)`));
    info(chalk.grey(` -  head = h      (hjs g h ...)\n`));
    process.exit();
  }

  switch (args._[1]) {
    case 'get':
    case 'g':
      getCli(args);
      break;
    case 'post':
    case 'p':
      postCli(args);
      break;
    case 'delete':
    case 'd':
      deleteCli(args);
      break;
    case 'head':
    case 'h':
      headCli(args);
      break;
    default:
      warn(chalk.yellow('\nMethod not found :(\n'));
  }
}