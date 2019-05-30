const postComponent = require("./post-template.service");

var express = require('express');
var router = express.Router();

router.post('/*',(req, res, next)=>{
    const context = {
        request: req,
        response: res
    } 
    postComponent.handleRequest(context);
});

module.exports = router