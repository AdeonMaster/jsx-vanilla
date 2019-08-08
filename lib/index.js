"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var acorn = require('acorn-jsx');

var walk = require('acorn/dist/walk');

var JSXVanilla =
/*#__PURE__*/
function () {
  function JSXVanilla() {
    _classCallCheck(this, JSXVanilla);
  }

  _createClass(JSXVanilla, null, [{
    key: "extendWalkBase",
    value: function extendWalkBase(walk) {
      walk.base.JSXElement = function (node, st, c) {
        c(node.openingElement, st);
        node.children.forEach(function (n) {
          c(n, st);
        });
      };

      walk.base.JSXExpressionContainer = function (node, st, c) {
        c(node.expression, st);
      }; // walk.base.JSXText = (node, st, c) => {
      // };


      walk.base.JSXOpeningElement = function (node, st, c) {
        node.attributes.forEach(function (n) {
          c(n, st);
        });
      }; // walk.base.JSXAttribute = (node, st, c) => {
      // 	// c(node.value, st);
      // };
      // walk.base.JSXEmptyExpression = (node, st, c) => {
      // };

    }
  }, {
    key: "findNode",
    value: function findNode(content, type) {
      var root = acorn.parse(content, {
        plugins: {
          jsx: true
        },
        sourceType: 'module'
      });
      var element = null;

      var result = _defineProperty({}, type, function (node) {
        element = node;
      });

      walk.simple(root, result);
      return element;
    }
  }, {
    key: "transformNode",
    value: function transformNode(node, content) {
      switch (node.type) {
        case 'JSXText':
          {
            return node.value;
          }

        case 'JSXExpressionContainer':
          {
            switch (node.expression.type) {
              case 'Literal':
                {
                  return node.expression.value;
                }

              case 'Identifier':
                {
                  return "'+" + node.expression.name + "+'";
                }

              case 'BinaryExpression':
                {
                  return "'+" + content.substr(node.start + 1, node.end - node.start - 2) + "+'";
                }
            }

            return '';
          }

        case 'JSXElement':
          {
            return this.transformJSXElement(node, content);
          }

        default:
          {
            return '';
          }
      }
    }
  }, {
    key: "transformJSXElement",
    value: function transformJSXElement(element, content) {
      var _this = this;

      var tmp = '';
      tmp += '<' + element.openingElement.name.name;

      if (element.openingElement.attributes.length) {
        tmp += " " + element.openingElement.attributes.map(function (attribute) {
          if (attribute.value) {
            switch (attribute.value.type) {
              case 'Literal':
                {
                  return attribute.name.name + '="\'+\'' + attribute.value.value + '\'+\'"';
                }

              case 'JSXExpressionContainer':
                {
                  return attribute.name.name + '="\'+' + content.substr(attribute.value.start + 1, attribute.value.end - attribute.value.start - 2) + '+\'"';
                }
            }
          } else {
            return attribute.name.name;
          }
        }).join(' ');
      }

      tmp += element.selfClosing ? '/>' : '>';
      tmp += element.children.map(function (child) {
        switch (child.type) {
          case 'JSXText':
            {
              return child.value;
            }

          case 'JSXExpressionContainer':
            {
              switch (child.expression.type) {
                case 'Literal':
                  {
                    return child.expression.value;
                  }

                case 'Identifier':
                  {
                    return "'+" + child.expression.name + "+'";
                  }

                case 'BinaryExpression':
                  {
                    return "'+" + content.substr(child.start + 1, child.end - child.start - 2) + "+'";
                  }

                case 'ConditionalExpression':
                  {
                    return "'+" + content.substr(child.start + 1, child.end - child.start - 2) + "+'";
                  }
              }

              return "'+" + content.substr(child.expression.start, child.expression.end - child.expression.start) + "+'";
            }

          case 'JSXElement':
            {
              return _this.transformJSXElement(child, content);
            }

          default:
            {
              return '';
            }
        }
      }).join('');

      if (element.closingElement) {
        tmp += '</' + element.closingElement.name.name + '>';
      }

      return tmp;
    }
  }, {
    key: "preprocess",
    value: function preprocess(content) {
      this.extendWalkBase(walk);
      var element = null;

      while ((element = this.findNode(content, 'JSXElement')) != null) {
        var transformed = this.transformJSXElement(element, content).replace(/[\r\n\t]/g, '');
        content = content.substr(0, element.start) + "'" + transformed + "'" + content.substr(element.end, content.length);
      }

      content = "/*JSX override*/if(!window.NATIVE_appendChild){window.NATIVE_appendChild = Node.prototype.appendChild;Node.prototype.appendChild = function(){if(typeof arguments[0] == 'string'){arguments[0] = document.createRange().createContextualFragment(arguments[0]);}return window.NATIVE_appendChild.apply(this, arguments);};}/*JSX override*/\n\n" + content;
      return content;
    }
  }]);

  return JSXVanilla;
}();

exports["default"] = JSXVanilla;