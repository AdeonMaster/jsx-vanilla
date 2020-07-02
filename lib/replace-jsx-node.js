"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var replaceJSXNode = function replaceJSXNode(node, transformedNode, content) {
  var leftPart = content.substr(0, node.start);
  var rightPart = content.substr(node.end, content.length);
  return "".concat(leftPart, "`").concat(transformedNode, "`").concat(rightPart);
};

var _default = replaceJSXNode;
exports["default"] = _default;