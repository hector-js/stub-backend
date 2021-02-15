'use strict';

const http = require('http');
const app = require('./app');
const server = new http.Server(app);
const io = require('socket.io')(server);
const shelljs = require('shelljs');
const Data = require('./app/shared/read-db-files');
const environment = require('./environment/index');
const fs = require('fs');
const path = require('path');
const { readConfigFile, checkArg, getBanner } = require('./app/utils/files-utils');
const args = require('minimist')(process.argv.slice(2));

let port = checkArg(args.port, null);
let logs = checkArg(args.logs, null);
let open = checkArg(args.open, null);

const argsFile = readConfigFile();
const banner = getBanner();

if (argsFile) {
  try {
    const argsFileJSON = JSON.parse(argsFile);
    port = checkArg(port, argsFileJSON.port);
    logs = checkArg(logs, argsFileJSON.logs);
    open = checkArg(open, argsFileJSON.open);
  } catch (err) {
    throw new Error('.hjs.config.json is not well-formed');
  }
}

port = checkArg(port, environment.port);

server.listen(port, () => {
  if (!banner) {
    const l1 = '===================================================';
    const l2 = '===================================================';
    const l3 = ' _   _  _____ _____ _____ ___________   ___ _____';
    const l4 = '| | | ||  ___/  __ \\_   _|  _  | ___ \\ |_  /  ___|';
    const l5 = '| |_| || |__ | /  \\/ | | | | | | |_/ /   | \\ `--. ';
    const l6 = '|  _  ||  __|| |     | | | | | |    /    | |`--. \\';
    const l7 = '| | | || |___| \\__/\\ | | \\ \\_/ / |\\ \\/\\__/ /\\__/ /';
    const l8a = '\\_| |_/\\____/ \\____/ ';
    const l8b = '\\_/  \\___/\\_| \\_\\____/ ____/';
    console.log(' ');
    console.log('\x1b[34m%s\x1b[0m', l1);
    console.log('\x1b[34m%s\x1b[0m', l2);
    console.log('\x1b[34m%s\x1b[0m', l3);
    console.log('\x1b[34m%s\x1b[0m', l4);
    console.log('\x1b[34m%s\x1b[0m', l5);
    console.log('\x1b[34m%s\x1b[0m', l6);
    console.log('\x1b[34m%s\x1b[0m', l7);
    console.log('\x1b[34m%s\x1b[0m', l8a + l8b);
  } else {
    banner();
  }
  console.log(' ');
  console.log(' ');
  console.log('\x1b[32m%s\x1b[0m', 'Stub service starts with:');
  console.log(' ');
  console.log('\x1b[36m%s\x1b[0m', '   --> Port     :' + port);
  console.log('\x1b[36m%s\x1b[0m', '   --> Profile  :' + environment.env);
  const logConsole = logs ? logs : 'no logs';
  console.log('\x1b[36m%s\x1b[0m', '   --> Logs     :' + logConsole);
  console.log(' ');
  console.log('\x1b[32m%s\x1b[0m', 'Listening...');
  console.log(' ');


  let hasUIConfig;
  if (argsFile) {
    hasUIConfig = JSON.parse(argsFile).ui? JSON.parse(argsFile).ui.enable: null;
  }
  if (checkArg(args['ui-enable'], hasUIConfig) && open) {
    if (process.platform === 'win32') {
      shelljs.exec(
          `start chrome "http://${open === true ? 'localhost' : open}:${port}"`
      );
    } else {
      shelljs.exec(
          `open "http://${open === true ? 'localhost' : open}:${port}"`
      );
    }
  }
});

io.on('connection', (socket) => {
  const db = Data.db();
  socket.emit('db', db);

  const pathToResourcesAbs = path.resolve(
      path.relative(process.cwd(), __dirname),
      environment.pathDb.abs
  );
  fs.watch(
      './' + path.relative(process.cwd(), pathToResourcesAbs),
      (event, filename) => {
        if (filename) {
          socket.emit('reload', true);
        } else {
          console.error('filename not provided');
        }
      }
  );
});
