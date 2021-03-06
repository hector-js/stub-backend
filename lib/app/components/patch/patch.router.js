const patchService = require('./patch.service');
const express = require('express');
const router = new express.Router();

router.patch('/*', (req, res) => patchService.handlePatchRequest(req, res));

module.exports = router;
