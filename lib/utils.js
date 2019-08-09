"use strict";

var noop = function noop() {};

var nodeFromString = function nodeFromString(string) {
  return document.createRange().createContextualFragment(string);
};

module.exports = {
  noop: noop,
  nodeFromString: nodeFromString
};