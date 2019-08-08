const walker = require('acorn/dist/walk');

const extendWalkBaseWithJSXNodes = require('./extendWalkBaseWithJSXNodes');
const findJSXNode = require('./findJSXNode');
const transformJSXNode = require('./transformJSXNode');

const preprocess = content => {
	extendWalkBaseWithJSXNodes(walker);

	let node = null;

	while((node = findJSXNode(walker, content)) != null) {
		const transformedNode = transformJSXNode(node, content).replace(/[\r\n\t]/g, '');

		content = content.substr(0, node.start)+"'"+transformedNode+"'"+content.substr(node.end, content.length);
	}

	return content;

	// content = "/*JSX override*/if(!window.NATIVE_appendChild){window.NATIVE_appendChild = Node.prototype.appendChild;Node.prototype.appendChild = function(){if(typeof arguments[0] == 'string'){arguments[0] = document.createRange().createContextualFragment(arguments[0]);}return window.NATIVE_appendChild.apply(this, arguments);};}/*JSX override*/\n\n" + content;

	// return content;
}

module.exports = preprocess;

	
// 	static preprocess(content) {
// 		this.extendWalkBase(walk);
		
// 		let element = null;
		
// 		while((element = this.findNode(content, 'JSXElement')) != null) {
// 			const transformed = this.transformJSXElement(element, content).replace(/[\r\n\t]/g, '');
// 			content = content.substr(0, element.start)+"'"+transformed+"'"+content.substr(element.end, content.length);
// 		}
		
// 		content = "/*JSX override*/if(!window.NATIVE_appendChild){window.NATIVE_appendChild = Node.prototype.appendChild;Node.prototype.appendChild = function(){if(typeof arguments[0] == 'string'){arguments[0] = document.createRange().createContextualFragment(arguments[0]);}return window.NATIVE_appendChild.apply(this, arguments);};}/*JSX override*/\n\n" + content;

// 		return content;
// 	}
// }
