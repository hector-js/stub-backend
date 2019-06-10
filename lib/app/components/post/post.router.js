const postService = require("./post.service");
const router = require('express').Router();

router.post('/*', (req, res, next) => postService.handleRequest(req, res));

module.exports = router