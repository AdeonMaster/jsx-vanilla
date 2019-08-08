"use strict";

var walker = require('acorn-walk');

var extendWalkBaseWithJSXNodes = require('./extendWalkBaseWithJSXNodes');

var findJSXNode = require('./findJSXNode');

var transformJSXNode = require('./transformJSXNode');

extendWalkBaseWithJSXNodes(walker);

var preprocess = function preprocess(content) {
  var node = null;

  while ((node = findJSXNode(walker, content)) != null) {
    var transformedNode = transformJSXNode(node, content).replace(/[\r\n\t]/g, '');
    content = content.substr(0, node.start) + "'" + transformedNode + "'" + content.substr(node.end, content.length);
  }

  return content;
};

var nodeFromString = function nodeFromString(string) {
  return document.createRange().createContextualFragment(string);
};

module.exports = {
  preprocess: preprocess,
  nodeFromString: nodeFromString
};