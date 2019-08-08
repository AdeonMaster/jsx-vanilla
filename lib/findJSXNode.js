"use strict";

var acorn = require('acorn');

var acornJSX = require('acorn-jsx');

var extendedAcornParser = acorn.Parser.extend(acornJSX());

var findJSXNode = function findJSXNode(walker, content) {
  var root = extendedAcornParser.parse(content);
  var foundNode = null;
  walker.simple(root, {
    'JSXElement': function JSXElement(node) {
      foundNode = node;
    }
  });
  return foundNode;
};

module.exports = findJSXNode;