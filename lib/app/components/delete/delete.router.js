const deleteService = require('./delete.service');
const express = require('express');
const router = new express.Router();

router.delete('/*', (req, res) => deleteService.handleRequest(req, res));

module.exports = router;
