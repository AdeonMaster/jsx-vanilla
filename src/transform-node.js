import transformJSXNode from './transform-jsx-node';

const transformNode = (node, content) => {
  switch (node.type) {
    case 'JSXText':
      return node.value;

    case 'JSXExpressionContainer': {
      switch (node.expression.type) {
        case 'Literal':
          return node.expression.value;

        case 'Identifier':
          return `\`+${node.expression.name}+\``;

        case 'BinaryExpression':
          return `\`+${content.substr(node.start + 1, node.end - node.start - 2)}+\``;

        default:
          throw new Error(`Unknown node expression type (${node.expression.type})`);
      }
    }

    case 'JSXElement':
      return transformJSXNode(node, content);

    default:
      throw new Error(`Unknown node type (${node.type})`);
  }
};

export default transformNode;
