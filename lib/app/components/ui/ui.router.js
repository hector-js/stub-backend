const express = require('express');
const router = new express.Router();
const path = require('path');
const shelljs = require('shelljs');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../..', './resources/main.html'));
});

router.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '../../..', `./resources${req.url}`));
});

router.get('/css/main.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../../..', `./resources${req.url}`));
});

router.get('/js/main.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../..', `./resources${req.url}`));
});

router.get('/assets/Icon.png', (req, res) => {
  res.sendFile(path.join(__dirname, '../../..', `./resources${req.url}`));
});

router.get('/_test', (req, res) => {
  try {
    shelljs.exec('npm run test', (valu) => {
      res.json({status: `${valu === 1 ? `ko` : `ok`}`});
    });
  } catch (err) {
    res.json({status: 'ko'});
  };
});

module.exports = router;
