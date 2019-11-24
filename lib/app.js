'use strict';

const environment = require('./environment/index');
const express = require('express');
const cookieParser = require('cookie-parser');
const getRouter = require('./app/components/get/get.router');
const postRouter = require('./app/components/post/post.router');
const deleteRouter = require('./app/components/delete/delete.router');
const putRouter = require('./app/components/put/put.router');
const patchRouter = require('./app/components/patch/patch.router');
const uiRouter = require('./app/components/ui/ui.router');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const args = require('minimist')(process.argv.slice(2));
const port = args['port'] ? args['port'] : environment.port;
const logs = args['logs'] ? args['logs'] : null;
const app = express();
if (logs) {
  app.use(morgan(logs));
}

app.use(cookieParser(), bodyParser.json());
app.use(uiRouter,getRouter, postRouter, deleteRouter, putRouter, patchRouter);
app.listen(port, () => {
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
  console.log('\x1b[36m%s\x1b[0m', '   --> Port:    ' + port);
  console.log('\x1b[36m%s\x1b[0m', '   --> Profile: ' + environment.env);
  const logConsole = logs ? logs : 'no logs';
  console.log('\x1b[36m%s\x1b[0m', '   --> Logs:    ' + logConsole);
  console.log(' ');
  console.log('\x1b[32m%s\x1b[0m', 'Listening...');
  console.log(' ');
});

module.exports = app;
