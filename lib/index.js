"use strict";

var preprocess = require('./process');

var _require = require('./utils'),
    nodeFromString = _require.nodeFromString;

module.exports = {
  preprocess: preprocess,
  nodeFromString: nodeFromString
};