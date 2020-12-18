const express = require('express');
const router = new express.Router();
const path = require('path');
const shelljs = require('shelljs');
const args = require('minimist')(process.argv.slice(2));

if (args.ui && args.ui.enable) {
  router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../..', './resources/index.html'));
  });

  router.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, '../../..', `./resources${req.url}`));
  });

  router.get('/_css/*.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../../..', `./resources${req.url}`));
  });

  router.get('/_js/*.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../../..', `./resources${req.url}`));
  });

  router.get('/_assets/*.png', (req, res) => {
    res.sendFile(path.join(__dirname, '../../..', `./resources${req.url}`));
  });

  router.get('/_test', (req, res) => {
    const { stdout, code } = shelljs.exec(`npm run _test`);
    res.json({ status: `${code===1?'ko':'ok'}`, content: stdout });
  });

  router.get('/_terminal', (req, res) => {
    const command = req.get('command');
    if (command && command.trim().startsWith('hjs')) {
      const { stdout, code } = shelljs.exec(command.replace('hjs', 'npm run hjs -- '));
      res.json({ status: `${code===1?'ko':'ok'}`, content: stdout });
    } else {
      const message = `
      .------\\ /------.
      |       -       |
      |               |
      |               |       
      |               |     .----------------------------.
   _______________________  ¦ Sorry,                     ¦
   ===========.===========  ¦ You must add a hjs command ¦
     / ~~~~~     ~~~~~ \\    ¦ .--------------------------'
    /|     |     |\\         ¦/    
    W   ---  / \\  ---   W
    \\.      |o o|      ./
     |                 |
     \\    #########    /
      \\  ## ----- ##  /
       \\##         ##/
        \\_____v_____/ 
           `;
      res.json({ status: `ko`, content: message });
    }
  });
}

module.exports = router;
