const getService = require("./get.service");
const router = require('express').Router();

router.get('/*', (req, res, next) => getService.handleRequest(req, res));

module.exports = router