"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint no-param-reassign:0 */
var noop = function noop() {};

var extendWalkBaseWithJSXNodes = function extendWalkBaseWithJSXNodes(walker) {
  walker.base.JSXElement = function (node, state, callback) {
    callback(node.openingElement, state);
    node.children.forEach(function (n) {
      callback(n, state);
    });
  };

  walker.base.JSXExpressionContainer = function (node, state, callback) {
    callback(node.expression, state);
  };

  walker.base.JSXOpeningElement = function (node, state, callback) {
    node.attributes.forEach(function (n) {
      callback(n, state);
    });
  };

  walker.base.JSXText = noop;
  walker.base.JSXAttribute = noop;
  walker.base.JSXEmptyExpression = noop;
};

var _default = extendWalkBaseWithJSXNodes;
exports["default"] = _default;