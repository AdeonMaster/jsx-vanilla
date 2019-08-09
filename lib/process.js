"use strict";

var walker = require('acorn-walk');

var extendWalkBaseWithJSXNodes = require('./extendWalkBaseWithJSXNodes');

var findJSXNode = require('./findJSXNode');

var transformJSXNode = require('./transformJSXNode');

var replaceJSXNode = require('./replaceJSXNode');

extendWalkBaseWithJSXNodes(walker);

var preprocess = function preprocess(content) {
  var node = null;

  while ((node = findJSXNode(walker, content)) != null) {
    var transformedNode = transformJSXNode(node, content);
    content = replaceJSXNode(node, transformedNode, content);
  }

  return content;
};

module.exports = preprocess;