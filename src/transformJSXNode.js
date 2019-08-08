const transformAttribute = (attribute, content) => {
  if (attribute.value) {
    switch (attribute.value.type) {
      case 'Literal':
        return `${attribute.name.name}="'+'${attribute.value.value}'+'"`;
      
      case 'JSXExpressionContainer':
        return `${attribute.name.name}="'+${content.substr(attribute.value.start+1, attribute.value.end-attribute.value.start-2)}+'"`;
    }
  } else {
    return attribute.name.name;
  }
}

const transformNode = (node, content) => {
  switch (node.type) {
    case 'JSXText':
      return node.value;
    
    case 'JSXExpressionContainer': {
      switch (node.expression.type) {
        case 'Literal':
          return node.expression.value;
        
        case 'Identifier':
          return `'+${node.expression.name}+'`;
        
        case 'BinaryExpression':
        case 'ConditionalExpression':
          return `'+${content.substr(node.start+1, node.end-node.start-2)}+'`;

        default:
          return `'+${content.substr(node.expression.start, node.expression.end-node.expression.start)}+'`;
      }
    }
    
    case 'JSXElement':
      return transformJSXNode(node, content);
    
    default:
      return '';
  }
}

const getOpeningTagName = node => node.openingElement.name.name;
const hasOpeningTagAttributes = node => node.openingElement.attributes.length;
const getOpeningTagAttributes = node => node.openingElement.attributes;
const getChildren = node => node.children;
const hasClosingTag = node => node.closingElement;
const getClosingTagName = node => node.closingElement.name.name;
const isSelfClosing = node => node.selfClosing;

const getOpeningTagTransformedAttributes = (node, content) => hasOpeningTagAttributes(node)
  ? ' '+getOpeningTagAttributes(node).map(attribute => transformAttribute(attribute, content)).join(' ')
  : '';
const getTransfomedChildren = (node, content) => getChildren(node).map(children => transformNode(children, content)).join('');

const transformJSXNode = (node, content) => {
  const openingTagName = getOpeningTagName(node);
  const openingTagTransformedAttributes = getOpeningTagTransformedAttributes(node, content);
  
  if (hasClosingTag(node)) {
    const transformedChildren = getTransfomedChildren(node, content);
    const closingTagName = getClosingTagName(node);

    return `<${openingTagName}${openingTagTransformedAttributes}>${transformedChildren}</${closingTagName}>`;
  } else {
    return isSelfClosing(node)
      ? `<${openingTagName}${openingTagTransformedAttributes}/>`
      : `<${openingTagName}${openingTagTransformedAttributes}>`
  }
}

module.exports = transformJSXNode;
