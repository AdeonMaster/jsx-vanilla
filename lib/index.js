"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "preprocess", {
  enumerable: true,
  get: function get() {
    return _process["default"];
  }
});
Object.defineProperty(exports, "nodeFromString", {
  enumerable: true,
  get: function get() {
    return _utils.nodeFromString;
  }
});
exports["default"] = void 0;

var _process = _interopRequireDefault(require("./process"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _process["default"];
exports["default"] = _default;