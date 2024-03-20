const express = require('express');
const router = new express.Router();

let idMap, id;

router.get('/__scenario', (_req, res) => {
  res.json({ id, idMap });
});

router.post('/__scenario', ({ body }, res) => {
  if (body.path) {
    if (!idMap) idMap = {};

    idMap[body.path] = body.id;
  } else {
    id = body.id;
  }

  res.sendStatus(200);
});

router.post('/__scenario/reset', ({ body }, res) => {
  if (body.path && idMap) {
    delete idMap[body.path];

    if (!Object.entries(idMap).length) {
      idMap = undefined;
    }
  } else {
    id = undefined;
  }

  res.sendStatus(200);
});

router.get('/__scenario/reset-all', (_req, res) => {
  idMap = undefined;
  id = undefined;

  res.sendStatus(200);
});

module.exports = {
  router: router,
  id: (path) => idMap ? idMap[path] || id : id
};
