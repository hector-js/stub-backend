const getService = require("./get.service");
const router = require('express').Router();

module.exports = router.get('/*', (req, res) => getService.handleRequest(req, res));
