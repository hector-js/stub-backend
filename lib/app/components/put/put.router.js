const putService = require('./put.service');
const express = require('express');
const router = new express.Router();

router.put('/*', (req, res) => putService.handleRequest(req, res));

module.exports = router;
