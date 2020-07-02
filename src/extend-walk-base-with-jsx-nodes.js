/* eslint no-param-reassign:0 */

const noop = () => {};

const extendWalkBaseWithJSXNodes = (walker) => {
  walker.base.JSXElement = (node, state, callback) => {
    callback(node.openingElement, state);
    node.children.forEach((n) => {
      callback(n, state);
    });
  };

  walker.base.JSXExpressionContainer = (node, state, callback) => {
    callback(node.expression, state);
  };

  walker.base.JSXOpeningElement = (node, state, callback) => {
    node.attributes.forEach((n) => {
      callback(n, state);
    });
  };

  walker.base.JSXText = noop;
  walker.base.JSXAttribute = noop;
  walker.base.JSXEmptyExpression = noop;
};

export default extendWalkBaseWithJSXNodes;
