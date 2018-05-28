const jsonServer = require('json-server');
const environment = require('./environment/index');
const utils = require('./config/utils');
const path = require('path');
const pathToDb = environment.pathDb ||'./config/db.json';
const db = require(pathToDb);

const server = jsonServer.create();

const middlewares = jsonServer.defaults({noCors: false, bodyParser: true,  logger: false});
server.use(middlewares);

const router = jsonServer.router(path.join('stub-backend', pathToDb));


server.use((req, res, next) => {
    var idFound;
    var contextPath;
    switch (req.method) {
        case 'GET':
            const segmentsUrl = req.url.split('/');
            const identifier = segmentsUrl.pop();
            contextPath = db[segmentsUrl.pop()];
            if (!contextPath) {
                res.sendStatus(400);
            } else {
                for (j in contextPath) {
                    if (contextPath[j].id === identifier) {
                        idFound = true;
                        if (contextPath[j].status) {
                            res.sendStatus(contextPath[j].status)
                            break;
                        }
                        if (contextPath[j].auth && utils.isNotAuthorized(req.get('Authorization'))) {
                            res.sendStatus(401)
                            break;
                        }
                        next()
                        break;
                    }
                }
            }
            break;
        case 'POST':
            const context = db[req.url.split('/').pop()];

            if(!context){
                res.sendStatus(400);
            }else{
                idFound = true;
                const token = req.get('Authorization')
                if (req.get('Authorization') && utils.isNotAuthorized(req.get('Authorization'))) {
                    res.sendStatus(401)
                }else{
                    next();
                }
            }
            break;
        case 'PUT':
        case 'DELETE':
        default:
    }
    if (!idFound) {
        res.sendStatus(404);
    }
 
});

server.use(router);
   
server.listen(environment.port, () => {
    console.log('JSON Server (' + environment.env + ' environment) is running in the port ' + environment.port)
});

module.exports = server;

