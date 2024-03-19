const express = require('express');
const router = new express.Router();

let idMap = new Map();
let id;

router.get('/__scenario', ({ body }, res) => {
  res.json({ id: idMap.get(body.path) || id });
});

router.post('/__scenario', ({ body }, res) => {
  if (body.path) {
    idMap.set(body.path, body.id);
  } else {
    id = body.id;
  }

  res.sendStatus(200);
});

router.post('/__scenario/reset', ({ body }, res) => {
  if (body.path) {
    idMap.set(body.path, undefined);
  } else {
    id = undefined;
  }

  res.sendStatus(200);
});

module.exports = {
  router: router,
  id: (path) => idMap.get(path) || id
};
