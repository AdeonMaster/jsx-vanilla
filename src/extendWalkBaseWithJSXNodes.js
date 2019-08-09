const { noop } = require('./utils');

const extendWalkBaseWithJSXNodes = walker => {
	walker.base.JSXElement = (node, st, c) => {
		c(node.openingElement, st);
		node.children.forEach(n => {
			c(n, st);
		});
	};

	walker.base.JSXExpressionContainer = (node, st, c) => {
		c(node.expression, st);
	}

	walker.base.JSXOpeningElement = (node, st, c) => {
		node.attributes.forEach(n => {
			c(n, st);
		});
	};

	walker.base.JSXText = noop;
	walker.base.JSXAttribute = noop;
	walker.base.JSXEmptyExpression = noop;
}

module.exports = extendWalkBaseWithJSXNodes;
