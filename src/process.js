const walker = require('acorn-walk');

const extendWalkBaseWithJSXNodes = require('./extendWalkBaseWithJSXNodes');
const findJSXNode = require('./findJSXNode');
const transformJSXNode = require('./transformJSXNode');
const replaceJSXNode = require('./replaceJSXNode');

extendWalkBaseWithJSXNodes(walker);

const preprocess = content => {
	let node = null;

	while((node = findJSXNode(walker, content)) != null) {
		const transformedNode = transformJSXNode(node, content);
		content = replaceJSXNode(node, transformedNode, content);
	}

	return content;
}

module.exports = preprocess;
