const postService = require('./post.service');
const express = require('express');
const router = new express.Router();

router.post('/*', (req, res) => postService.handlePostRequest(req, res));

module.exports = router;
