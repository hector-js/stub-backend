'use strict';

const environment = require('./environment/index');
const express = require('express');
const cookieParser = require('cookie-parser');
const getRouter = require('./app/components/get/get.router');
const postRouter = require('./app/components/post/post.router');
const deleteRouter = require('./app/components/delete/delete.router');
const putRouter = require('./app/components/put/put.router');
const patchRouter = require('./app/components/patch/patch.router');
const traceRouter = require('./app/components/trace/trace.router');
const uiRouter = require('./app/components/ui/ui.router');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Data = require('./app/shared/read-db-files');
const fs = require('fs');
const app = express();
const http = require('http');
const server = new http.Server(app);
const io = require('socket.io')(server);
const path = require('path');
const cors = require('cors');
const shelljs = require('shelljs');
const args = require('minimist')(process.argv.slice(2));

let port = checkArg(args['port'], environment.port);
let logs = checkArg(args['logs'], null);
let corsArgs = checkArg(args['cors'], null);
let ui = checkArg(args['ui'], null);

const argsFile = readConfigFile();

if (argsFile) {
  try {
    const argsFileJSON = JSON.parse(argsFile);
    port = checkArg(argsFileJSON.port, port);
    logs = checkArg(argsFileJSON.logs, logs);
    ui = checkArg(argsFileJSON.ui, ui);
    corsArgs = checkArg(argsFileJSON.corsOptions, corsArgs);
  } catch (err) {
    throw new Error('.hjs.config.json is not well-formed');
  }
}

if (logs) {
  app.use(morgan(logs));
}

app.use(cors(corsArgs));
app.use(bodyParser.raw({ inflate: true, limit: '100kb', type: 'application/xml' }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(uiRouter, traceRouter, getRouter, postRouter, deleteRouter, putRouter, patchRouter);

io.on('connection', (socket) => {
  const db = Data.db();
  socket.emit('db', db);

  const pathToResourcesAbs = path.resolve(path.relative(process.cwd(), __dirname), environment.pathDb.abs);
  fs.watch('./' + path.relative(process.cwd(), pathToResourcesAbs), (event, filename) => {
    if (filename) {
      socket.emit('reload', true);
    } else {
      console.error('filename not provided');
    }
  });
});

server.listen(port, () => {
  const l1 = '===================================================';
  const l2 = '===================================================';
  const l3 = ' _   _  _____ _____ _____ ___________   ___ _____';
  const l4 = '| | | ||  ___/  __ \\_   _|  _  | ___ \\ |_  /  ___|';
  const l5 = '| |_| || |__ | /  \\\/ | | | | | | |_/ /   | \\ `--. ';
  const l6 = '|  _  ||  __|| |     | | | | | |    /    | |`--. \\';
  const l7 = '| | | || |___| \\__/\\ | | \\ \\_/ / |\\ \\\/\\__/ /\\__/ /';
  const l8a = '\\_| |_\/\\____\/ \\____\/ ';
  const l8b = '\\_\/  \\___\/\\_| \\_\\____\/ \____\/';
  console.log(' ');
  console.log('\x1b[34m%s\x1b[0m', l1);
  console.log('\x1b[34m%s\x1b[0m', l2);
  console.log('\x1b[34m%s\x1b[0m', l3);
  console.log('\x1b[34m%s\x1b[0m', l4);
  console.log('\x1b[34m%s\x1b[0m', l5);
  console.log('\x1b[34m%s\x1b[0m', l6);
  console.log('\x1b[34m%s\x1b[0m', l7);
  console.log('\x1b[34m%s\x1b[0m', l8a + l8b);
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
  if (ui) {
    shelljs.exec(`start chrome "http://${ui === true ? 'localhost' : ui}:${port}"`);
  }
});

module.exports = app;

/**
 * @param {object} arg arguments
 * @param {object} value values
 * @return {object} an object with the values
 */
function checkArg(arg, value) {
  return arg ? arg : value;
}

/**
 * @return {object} arguments coming from the config file
 */
function readConfigFile() {
  let argsFile;
  try {
    argsFile = fs.readFileSync('./.hjs.config.json').toString();
  } catch (err) { }

  if (!argsFile) {
    try {
      const rootToConfigAbs = path.resolve(path.relative(process.cwd(), __dirname), './../../../../.hjs.config.json');
      argsFile = fs.readFileSync('./' + path.relative(process.cwd(), rootToConfigAbs)).toString();
    } catch (err) { }
  }

  return argsFile;
}
