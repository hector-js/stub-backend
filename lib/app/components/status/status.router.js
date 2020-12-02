const express = require('express');
const router = new express.Router();

let id;

router.get('/__scenario', (req, res) => {
  res.json({ id: id });
});

router.post('/__scenario', (req, res) => {
  const bodyJson = req.body;

  id = bodyJson.id;

  res.sendStatus(200);
});

router.post('/__scenario/reset', (req, res) => {
  id = undefined;

  res.sendStatus(200);
});

module.exports = {
  router: router,
  id: ()=> id
};
