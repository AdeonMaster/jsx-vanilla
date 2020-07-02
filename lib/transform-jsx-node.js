"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var transformAttribute = function transformAttribute(attribute, content) {
  if (!attribute.value) {
    return attribute.name.name;
  }

  switch (attribute.value.type) {
    case 'Literal':
      return "".concat(attribute.name.name, "=\"").concat(attribute.value.value, "\"");

    case 'JSXExpressionContainer':
      return "".concat(attribute.name.name, "=\"${").concat(content.substr(attribute.value.start + 1, attribute.value.end - attribute.value.start - 2), "}\"");

    default:
      throw new Error("Unknown attribute type (".concat(attribute.value.type, ")"));
  }
};

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
            return "${".concat(node.expression.name, "}");

          case 'BinaryExpression':
          case 'ConditionalExpression':
            return "${".concat(content.substr(node.start + 1, node.end - node.start - 2), "}");

          default:
            return "${".concat(content.substr(node.expression.start, node.expression.end - node.expression.start), "}");
        }
      }

    case 'JSXElement':
      /* eslint-disable-next-line no-use-before-define */
      return transformJSXNode(node, content);

    default:
      throw new Error("Unknown node type (".concat(node.type, ")"));
  }
};

var getOpeningTagName = function getOpeningTagName(node) {
  return node.openingElement.name.name;
};

var hasAttributes = function hasAttributes(node) {
  return node.openingElement.attributes.length;
};

var getAttributes = function getAttributes(node) {
  return node.openingElement.attributes;
};

var getChildren = function getChildren(node) {
  return node.children;
};

var hasClosingTag = function hasClosingTag(node) {
  return node.closingElement;
};

var getClosingTagName = function getClosingTagName(node) {
  return node.closingElement.name.name;
};

var isSelfClosing = function isSelfClosing(node) {
  return node.selfClosing;
};

var getTransformedAttributes = function getTransformedAttributes(node, content) {
  return hasAttributes(node) ? " ".concat(getAttributes(node).map(function (attribute) {
    return transformAttribute(attribute, content);
  }).join(' ')) : '';
};

var getTransfomedChildren = function getTransfomedChildren(node, content) {
  return getChildren(node).map(function (children) {
    return transformNode(children, content);
  }).join('');
};

var transformJSXNode = function transformJSXNode(node, content) {
  var openingTagName = getOpeningTagName(node);
  var transformedAttributes = getTransformedAttributes(node, content);

  if (hasClosingTag(node)) {
    var transformedChildren = getTransfomedChildren(node, content);
    var closingTagName = getClosingTagName(node);
    return "<".concat(openingTagName).concat(transformedAttributes, ">").concat(transformedChildren, "</").concat(closingTagName, ">");
  }

  return isSelfClosing(node) ? "<".concat(openingTagName).concat(transformedAttributes, "/>") : "<".concat(openingTagName).concat(transformedAttributes, ">");
};

var _default = transformJSXNode;
exports["default"] = _default;