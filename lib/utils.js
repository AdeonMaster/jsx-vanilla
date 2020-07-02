"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeFromString = void 0;

/* eslint import/prefer-default-export:0 */
var nodeFromString = function nodeFromString(string) {
  return document.createRange().createContextualFragment(string);
};

exports.nodeFromString = nodeFromString;