"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const getRouter = require("./app/components/get/get.router");
const postRouter = require("./app/components/post/post.router");
const deleteRouter = require("./app/components/delete/delete.router");
const putRouter = require("./app/components/put/put.router");
const patchRouter = require("./app/components/patch/patch.router");
const traceRouter = require("./app/components/trace/trace.router");
const uiRouter = require("./app/components/ui/ui.router");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const fs = require("fs");
const app = express();
const path = require("path");
const cors = require("cors");
const args = require("minimist")(process.argv.slice(2));

let logs = checkArg(args["logs"], null);
let corsArgs = checkArg(args["cors"], null);

const argsFile = readConfigFile();

if (argsFile) {
  try {
    const argsFileJSON = JSON.parse(argsFile);
    logs = checkArg(logs, argsFileJSON.logs);
    corsArgs = checkArg(corsArgs, argsFileJSON.corsOptions);
  } catch (err) {
    throw new Error(".hjs.config.json is not well-formed", err);
  }
}

if (logs) {
  app.use(morgan(logs));
}

app.use(cors(corsArgs));
app.use(
  bodyParser.raw({ inflate: true, limit: "100kb", type: "application/xml" })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  uiRouter,
  traceRouter,
  getRouter,
  postRouter,
  deleteRouter,
  putRouter,
  patchRouter
);

module.exports = app;

/**
 * @param {object} arg arguments
 * @param {object} value values
 * @return {object} an object with the values
 */
function checkArg(arg, value) {
  return arg ? arg : value;
}

/**
 * @return {object} arguments coming from the config file
 */
function readConfigFile() {
  let argsFile;

  try {
    argsFile = fs.readFileSync("./_hjs/.hjs.config.json").toString();
  } catch (err) {
    try {
      argsFile = fs.readFileSync("./.hjs.config.json").toString();
    } catch (err) {}
  }

  if (!argsFile) {
    try {
      const rootToConfigAbs = path.resolve(
        path.relative(process.cwd(), __dirname),
        "./../../../../.hjs.config.json"
      );
      argsFile = fs
        .readFileSync("./" + path.relative(process.cwd(), rootToConfigAbs))
        .toString();
    } catch (err) {}
  }

  return argsFile;
}
