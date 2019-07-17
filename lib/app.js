const environment = require('./environment/index');
const express = require('express');
const cookieParser = require('cookie-parser');
const getRouter = require('./app/components/get/get.router');
const postRouter = require('./app/components/post/post.router');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const args = require('minimist')(process.argv.slice(2));
var port = args['port'] ? args['port'] : environment.port;
var logs = args['logs'] ? args['logs'] : null;
var app = express();
if (logs) {
    app.use(morgan(logs));
}


app.use(cookieParser());
app.use(bodyParser.json())
app.use(getRouter);
app.use(postRouter);
app.listen(port, () => {
    console.log(' ')
    console.log('\x1b[34m%s\x1b[0m', '===================================================')
    console.log('\x1b[34m%s\x1b[0m', '===================================================')
    console.log('\x1b[34m%s\x1b[0m', ' _   _  _____ _____ _____ ___________   ___ _____');
    console.log('\x1b[34m%s\x1b[0m', '| | | ||  ___/  __ \\_   _|  _  | ___ \\ |_  /  ___|');
    console.log('\x1b[34m%s\x1b[0m', '| |_| || |__ | /  \\\/ | | | | | | |_/ /   | \\ `--. ');
    console.log('\x1b[34m%s\x1b[0m', '|  _  ||  __|| |     | | | | | |    /    | |`--. \\');
    console.log('\x1b[34m%s\x1b[0m', '| | | || |___| \\__/\\ | | \\ \\_/ / |\\ \\\/\\__/ /\\__/ /');
    console.log('\x1b[34m%s\x1b[0m', '\\_| |_\/\\____\/ \\____\/ \\_\/  \\___\/\\_| \\_\\____\/\____\/');
    console.log(' ')
    console.log(' ')
    console.log('\x1b[32m%s\x1b[0m', 'Stub service starts with:');
    console.log(' ')
    console.log('\x1b[36m%s\x1b[0m', '   --> Port:    ' + port);
    console.log('\x1b[36m%s\x1b[0m', '   --> Profile: ' + environment.env);
    const logConsole = logs ? logs : 'no logs';
    console.log('\x1b[36m%s\x1b[0m', '   --> Logs:    ' + logConsole);
    console.log(' ');
    console.log('\x1b[32m%s\x1b[0m', 'Listening...');
    console.log(' ');
})

module.exports = app;

