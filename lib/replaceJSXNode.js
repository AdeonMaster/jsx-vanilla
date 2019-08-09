"use strict";

var replaceJSXNode = function replaceJSXNode(node, transformedNode, content) {
  var leftPart = content.substr(0, node.start);
  var rightPart = content.substr(node.end, content.length);
  return leftPart + '`' + transformedNode + '`' + rightPart;
};

module.exports = replaceJSXNode;