const getService = require('./get.service');
const express = require('express');
const router = new express.Router();

const handleReq = (req, res) => getService.handleRequest(req, res);

module.exports = router.get('/*', handleReq);
