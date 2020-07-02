const transformAttribute = (attribute, content) => {
  if (!attribute.value) {
    return attribute.name.name;
  }

  switch (attribute.value.type) {
    case 'Literal':
      return `${attribute.name.name}="${attribute.value.value}"`;

    case 'JSXExpressionContainer':
      return `${attribute.name.name}="\${${content.substr(
        attribute.value.start + 1,
        attribute.value.end - attribute.value.start - 2,
      )}}"`;

    default:
      throw new Error(`Unknown attribute type (${attribute.value.type})`);
  }
};

const transformNode = (node, content) => {
  switch (node.type) {
    case 'JSXText':
      return node.value;

    case 'JSXExpressionContainer': {
      switch (node.expression.type) {
        case 'Literal':
          return node.expression.value;

        case 'Identifier':
          return `\${${node.expression.name}}`;

        case 'BinaryExpression':
        case 'ConditionalExpression':
          return `\${${content.substr(node.start + 1, node.end - node.start - 2)}}`;

        default:
          return `\${${content.substr(
            node.expression.start,
            node.expression.end - node.expression.start,
          )}}`;
      }
    }

    case 'JSXElement':
      /* eslint-disable-next-line no-use-before-define */
      return transformJSXNode(node, content);

    default:
      throw new Error(`Unknown node type (${node.type})`);
  }
};

const getOpeningTagName = (node) => node.openingElement.name.name;
const hasAttributes = (node) => node.openingElement.attributes.length;
const getAttributes = (node) => node.openingElement.attributes;
const getChildren = (node) => node.children;
const hasClosingTag = (node) => node.closingElement;
const getClosingTagName = (node) => node.closingElement.name.name;
const isSelfClosing = (node) => node.selfClosing;

const getTransformedAttributes = (node, content) =>
  hasAttributes(node)
    ? ` ${getAttributes(node)
        .map((attribute) => transformAttribute(attribute, content))
        .join(' ')}`
    : '';
const getTransfomedChildren = (node, content) =>
  getChildren(node)
    .map((children) => transformNode(children, content))
    .join('');

const transformJSXNode = (node, content) => {
  const openingTagName = getOpeningTagName(node);
  const transformedAttributes = getTransformedAttributes(node, content);

  if (hasClosingTag(node)) {
    const transformedChildren = getTransfomedChildren(node, content);
    const closingTagName = getClosingTagName(node);

    return `<${openingTagName}${transformedAttributes}>${transformedChildren}</${closingTagName}>`;
  }
  return isSelfClosing(node)
    ? `<${openingTagName}${transformedAttributes}/>`
    : `<${openingTagName}${transformedAttributes}>`;
};

export default transformJSXNode;
