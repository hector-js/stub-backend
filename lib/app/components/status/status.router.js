const express = require('express');
const router = new express.Router();

let idMap = new Map();
let id;

router.get('/__scenario', (req, res) => {
  res.json({ id: idMap.get(req.body.path) || id });
});

router.post('/__scenario', (req, res) => {
  if (req.body.path) {
    idMap.set(req.body.path, req.body.id);
  } else {
    id = req.body.id;
  }

  res.sendStatus(200);
});

router.post('/__scenario/reset', (req, res) => {
  if (req.body.path) {
    idMap.set(req.body.path, undefined);
  } else {
    id = undefined;
  }

  res.sendStatus(200);
});

module.exports = {
  router: router,
  id: (path) => idMap.get(path) || id
};
