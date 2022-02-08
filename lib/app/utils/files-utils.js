const fs = require('fs');
const path = require('path');

/**
 * @return {object} arguments coming from the config file
 */
function readConfigFile() {
  let argsFile;

  try {
    argsFile = fs.readFileSync('./_hjs/.hjs.config.json').toString();
  } catch (err) {
    try {
      argsFile = fs.readFileSync('./.hjs.config.json').toString();
    } catch (err) {}
  }

  if (!argsFile) {
    try {
      const rootToConfigAbs = path.resolve(
          path.relative(process.cwd(), __dirname),
          './../../../../.hjs.config.json'
      );
      argsFile = fs
          .readFileSync('./' + path.relative(process.cwd(), rootToConfigAbs))
          .toString();
    } catch (err) {}
  }

  return argsFile;
}

/**
 * @param {object} arg arguments
 * @param {object} value values
 * @return {object} an object with the values
 */
function checkArg(arg, value) {
  return arg ? arg : value;
}

/**
 * @return {object} arguments coming from the banner file
 */
function getBanner() {
  let bannerFn;

  try {
    bannerFn = require(path.resolve(process.cwd(), './_hjs/.hjs.banner.js'));
  } catch (err) {
    try {
      bannerFn = require(path.resolve(process.cwd(), './.hjs.banner.js'));
    } catch (err) {}
  }
  return bannerFn;
}

module.exports = { readConfigFile, checkArg, getBanner };
