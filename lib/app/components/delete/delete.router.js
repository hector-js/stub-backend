const deleteService = require('./delete.service');
const express = require('express');
const router = new express.Router();

router.delete('/*', (req, res, next) => deleteService.handleRequest(req, res, next));

module.exports = router;
