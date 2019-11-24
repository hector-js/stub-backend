const express = require('express');
const router = new express.Router();

router.trace('/*', (req,res)=>{
    res.status(200).json({});
});


module.exports = router;
