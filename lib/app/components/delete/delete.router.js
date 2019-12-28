const deleteService = require('./delete.service');
const express = require('express');
const router = new express.Router();

router.delete('/*', (req, res) => deleteService.handleDeleteRequest(req, res));

module.exports = router;
