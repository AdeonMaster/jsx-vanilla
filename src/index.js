const walker = require('acorn-walk');

const extendWalkBaseWithJSXNodes = require('./extendWalkBaseWithJSXNodes');
const findJSXNode = require('./findJSXNode');
const transformJSXNode = require('./transformJSXNode');

extendWalkBaseWithJSXNodes(walker);

const preprocess = content => {
	let node = null;

	while((node = findJSXNode(walker, content)) != null) {
		const transformedNode = transformJSXNode(node, content).replace(/[\r\n\t]/g, '');

		content = content.substr(0, node.start)+"'"+transformedNode+"'"+content.substr(node.end, content.length);
	}

	return content;
}

const nodeFromString = string => document.createRange().createContextualFragment(string);

module.exports = {
	preprocess,
	nodeFromString
}
