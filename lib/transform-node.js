"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _transformJsxNode = _interopRequireDefault(require("./transform-jsx-node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
            return "`+".concat(node.expression.name, "+`");

          case 'BinaryExpression':
            return "`+".concat(content.substr(node.start + 1, node.end - node.start - 2), "+`");

          default:
            throw new Error("Unknown node expression type (".concat(node.expression.type, ")"));
        }
      }

    case 'JSXElement':
      return (0, _transformJsxNode["default"])(node, content);

    default:
      throw new Error("Unknown node type (".concat(node.type, ")"));
  }
};

var _default = transformNode;
exports["default"] = _default;