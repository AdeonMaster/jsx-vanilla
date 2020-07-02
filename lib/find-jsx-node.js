"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _acorn = require("acorn");

var _acornJsx = _interopRequireDefault(require("acorn-jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var extendedAcornParser = _acorn.Parser.extend((0, _acornJsx["default"])());

var findJSXNode = function findJSXNode(walker, content) {
  var root = extendedAcornParser.parse(content);
  var foundNode = null;
  walker.simple(root, {
    JSXElement: function JSXElement(node) {
      foundNode = node;
    }
  });
  return foundNode;
};

var _default = findJSXNode;
exports["default"] = _default;