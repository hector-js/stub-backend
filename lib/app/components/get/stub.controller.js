const getComponent = require("./get-template.service");

var express = require('express');
var router = express.Router();

router.get('/*',(req, res, next)=>{
    const context = {
        request: req,
        response: res
    } 
    getComponent.handleRequest(context);
});

module.exports = router