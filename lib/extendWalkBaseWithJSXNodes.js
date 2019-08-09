"use strict";

var _require = require('./utils'),
    noop = _require.noop;

var extendWalkBaseWithJSXNodes = function extendWalkBaseWithJSXNodes(walker) {
  walker.base.JSXElement = function (node, st, c) {
    c(node.openingElement, st);
    node.children.forEach(function (n) {
      c(n, st);
    });
  };

  walker.base.JSXExpressionContainer = function (node, st, c) {
    c(node.expression, st);
  };

  walker.base.JSXOpeningElement = function (node, st, c) {
    node.attributes.forEach(function (n) {
      c(n, st);
    });
  };

  walker.base.JSXText = noop;
  walker.base.JSXAttribute = noop;
  walker.base.JSXEmptyExpression = noop;
};

module.exports = extendWalkBaseWithJSXNodes;