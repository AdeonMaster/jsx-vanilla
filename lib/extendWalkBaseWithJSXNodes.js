"use strict";

var emptyWalkFunction = function emptyWalkFunction() {};

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

  walker.base.JSXText = emptyWalkFunction;
  walker.base.JSXAttribute = emptyWalkFunction;
  walker.base.JSXEmptyExpression = emptyWalkFunction;
};

module.exports = extendWalkBaseWithJSXNodes;