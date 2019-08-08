const emptyWalkFunction = () => {
}

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

	walker.base.JSXText = emptyWalkFunction;
	walker.base.JSXAttribute = emptyWalkFunction;
	walker.base.JSXEmptyExpression = emptyWalkFunction;
}

module.exports = extendWalkBaseWithJSXNodes;
