"use strict";

var transformJSXNode = require('./transformJSXNode');

var transformNode = function transformNode(node, content) {
  switch (node.type) {
    case 'JSXText':
      return node.value;

    case 'JSXExpressionContainer':
      {
        switch (node.expression.type) {
          case 'Literal':
            return node.expression.value;

          case 'Identifier':
            return "'+".concat(node.expression.name, "+'");

          case 'BinaryExpression':
            return "'+".concat(content.substr(node.start + 1, node.end - node.start - 2), "+'");

          default:
            return '';
        }
      }

    case 'JSXElement':
      return transformJSXNode(node, content);

    default:
      return '';
  }
};

module.exports = transformNode;