const postService = require('./post.service');
const express = require('express');
const router = new express.Router();

router.post('/*', (req, res, next) => postService.handleRequest(req, res));

module.exports = router;
