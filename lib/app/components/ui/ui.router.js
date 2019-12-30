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

router.get('/_css/main.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../../..', `./resources${req.url}`));
});

router.get('/_js/main.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../..', `./resources${req.url}`));
});

router.get('/_assets/*.png', (req, res) => {
  res.sendFile(path.join(__dirname, '../../..', `./resources${req.url}`));
});

router.get('/_test', (req, res) => {
  res.json({ status: `${shelljs.exec('npm run test').code === 1 ? `ko` : `ok`}` });
});

module.exports = router;
