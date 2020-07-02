"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var walker = _interopRequireWildcard(require("acorn-walk"));

var _extendWalkBaseWithJsxNodes = _interopRequireDefault(require("./extend-walk-base-with-jsx-nodes"));

var _findJsxNode = _interopRequireDefault(require("./find-jsx-node"));

var _transformJsxNode = _interopRequireDefault(require("./transform-jsx-node"));

var _replaceJsxNode = _interopRequireDefault(require("./replace-jsx-node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

(0, _extendWalkBaseWithJsxNodes["default"])(walker);

var preprocess = function preprocess(content) {
  var node = null;
  /* eslint-disable-next-line no-cond-assign */

  while ((node = (0, _findJsxNode["default"])(walker, content)) != null) {
    var transformedNode = (0, _transformJsxNode["default"])(node, content);
    /* eslint-disable-next-line no-param-reassign */

    content = (0, _replaceJsxNode["default"])(node, transformedNode, content);
  }

  return content;
};

var _default = preprocess;
exports["default"] = _default;