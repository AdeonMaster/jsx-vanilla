'use strict';

const
	acorn = require("acorn-jsx"),
	walk = require("acorn/dist/walk")
;

class JSXVanillaError extends Error {
	constructor(message) {
		super(message);
		this.name = "JSXVanillaError";
	}
}

class JSXVanilla {
	static extendWalkBase(walk) {
		walk.base.JSXElement = (node, st, c) => {
			c(node.openingElement, st);
			node.children.forEach(n => {
				c(n, st);
			});
		};

		walk.base.JSXExpressionContainer = (node, st, c) => {
			c(node.expression, st);
		}

		walk.base.JSXText = (node, st, c) => {
		};

		walk.base.JSXOpeningElement = (node, st, c) => {
			node.attributes.forEach(n => {
				c(n, st);
			});
		};

		walk.base.JSXAttribute = (node, st, c) => {
			c(node.value, st);
		};
		
		walk.base.JSXEmptyExpression = (node, st, c) => {
		};
	}
	
	//to do: replace walk.simple with a custom walk.first
	static findJSXElement(content) {
		try {
			const root = acorn.parse(content, {
				plugins: {jsx:true}
			});
			
			let element = null;
			
			walk.simple(root, {
				JSXElement(node) {
					element = node;
				}
			});
			
			return element;
		} catch(e) {
			throw new JSXVanillaError(e.toString());
		}
	}

	//to do: replace walk.simple with a custom walk.first
	static findJSXExpressionContainer(content) {
		try {
			const root = acorn.parse(content, {
				plugins: {jsx:true}
			});

			let element = null;

			walk.simple(root, {
				JSXExpressionContainer(node) {
					element = node;
				}
			});
			
			return element;
		} catch(e) {
			throw new JSXVanillaError(e.toString());
		}
	}
	
	static sugar_expression(content) {
		let element = this.findJSXExpressionContainer(content);
		if(element) {
			let string = content.substr(element.start+1, element.end - element.start-2);

			//remove whitespaces
			string = string.replace(/[\r\n\t]/g, '');
			
			//transform JSXExpressionContainer into string
			if(element.expression.type == "Literal") {
				string = "\"'+" + string + "+'\"";
			} else {
				string = "'+" + string + "+'";
			}
			
			return content.substr(0, element.start) + string + content.substr(element.end, content.length);
		} else {
			return null;
		}
	}
		
	static sugar_element(content) {
		let element = this.findJSXElement(content);
		if(element) {
			let string = content.substr(element.start, element.end - element.start);
			
			//remove whitespaces
			string = string.replace(/[\r\n\t]/g, '');
			
			//transform JSXElement into string
			string = "'" + string + "'";

			return content.substr(0, element.start) + string + content.substr(element.end, content.length);
		} else {
			return null;
		}
	}
	
	static preprocess(content) {
		this.extendWalkBase(walk);
		
		let tmp = null;
		
		while((tmp = this.sugar_expression(content)) != null) {
			content = tmp;
		}
		
		while((tmp = this.sugar_element(content)) != null) {
			content = tmp;
		}
		
		content = "/*JSX override*/if(!window.NATIVE_appendChild) {window.NATIVE_appendChild = Node.prototype.appendChild;Node.prototype.appendChild = function() {if(typeof arguments[0] == 'string') {arguments[0] = document.createRange().createContextualFragment(arguments[0]);}return window.NATIVE_appendChild.apply(this, arguments);};}/*JSX override*/\n\n" + content;
		
		return content;
	}
}

module.exports = JSXVanilla;