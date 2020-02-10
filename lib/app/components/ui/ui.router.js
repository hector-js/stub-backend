const express = require('express');
const router = new express.Router();
const path = require('path');

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

module.exports = router;
