import { getCli } from "./methods/get.cli";
import { headCli } from "./methods/head.cli";
import { postCli } from "./methods/post.cli";
import { putCli } from "./methods/put.cli";
import { deleteCli } from "./methods/delete.cli";
import { patchCli } from "./methods/patch.cli";
import { traceCli } from "./methods/trace.cli";
import { info, warn } from 'console';

const chalk = require('chalk');

export function generateCli(args) {

  if (args.help) {
    if (args.headers) {
      info(chalk.green('\nHeader options:\n'));
      info(chalk.grey(`  --headers [header1],[header2]`));
      info(chalk.grey(`    Example: hjs g g customrers --headers authorization,client_id`));
    }

    if (args.status) {
      info(chalk.green('\nStatus options:\n'));
      info(chalk.grey(`  --status [status]`));
      info(chalk.grey(`    Example: hjs g g customrers --status 404`));
    }

    if (args.cookies) {
      info(chalk.green('\nCookies options:\n'));
      info(chalk.grey(`  --cookies [status]`));
      info(chalk.grey(`    Example: hjs g g customrers --cookies NormalCookie`));
    }

    if (args.description) {
      info(chalk.green('\nDescription options:\n'));
      info(chalk.grey(`  --description "[status]"`));
      info(chalk.grey(`    Example: hjs g g customrers --description "Hello world!"`));
    }

    if (!args.description && !args.headers && !args.cookies && !args.status) {
      displayGeneratorOpts();
    }

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
    case 'put':
    case 'pu':
      putCli(args);
      break;
    case 'delete':
    case 'd':
      deleteCli(args);
      break;
    case 'head':
    case 'h':
      headCli(args);
      break;
    case 'patch':
    case 'pa':
      patchCli(args);
      break;
    case 'trace':
    case 't':
      traceCli(args);
      break;
    default:
      warn(chalk.yellow('\nMethod not found :(\n'));
  }
}


function displayGeneratorOpts() {
  info(chalk.green('\nGenerate options:\n'));
  info(chalk.grey(` -  hjs generate get [url]: scenario for a GET request`));
  info(chalk.grey(` -  hjs generate post [url]: scenario for a POST request`));
  info(chalk.grey(` -  hjs generate delete [url]: scenario for a DELETE request`));
  info(chalk.grey(` -  hjs generate head [url]: scenario for a HEAD request`));
  info(chalk.grey(` -  hjs generate put [url]: scenario for a PUT request`));
  info(chalk.grey(` -  hjs generate patch [url]: scenario for a PATCH request`));
  info(chalk.green(`\nYou can use the following abreviatures:\n`));
  info(chalk.grey(` -  generate = g  (hjs g get ...)`));
  info(chalk.grey(` -  get = g       (hjs g g ...)`));
  info(chalk.grey(` -  post = p      (hjs g p ...)`));
  info(chalk.grey(` -  delete = d    (hjs g d ...)`));
  info(chalk.grey(` -  head = h      (hjs g h ...)`));
  info(chalk.grey(` -  put = pu      (hjs g pu ...)`));
  info(chalk.grey(` -  patch = pa    (hjs g pa ...)\n`));
  info(chalk.grey(` -  trace = t     (hjs g t ...)\n`));
}