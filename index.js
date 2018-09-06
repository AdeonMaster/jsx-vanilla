const
	acorn = require("acorn-jsx"),
	walk = require("acorn/dist/walk")
;

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
			//c(node.value, st);
		};
		
		walk.base.JSXEmptyExpression = (node, st, c) => {
		};
	}

	static findNode(content, type) {
		const root = acorn.parse(content, {
			plugins: {jsx:true},
			sourceType: 'module'
		});
		
		let 
			element = null,
			result = {}
		;
		result[type] = (node) => {
			element = node;
		}
		
		walk.simple(root, result);
		
		return element;
	}
	
	static transformNode(node, content) {
		switch(child.type) {
			case 'JSXText': {
				return child.value;
			}
			
			case 'JSXExpressionContainer': {
				switch(child.expression.type) {
					case 'Literal': {
						return child.expression.value;
					}
					
					case 'Identifier': {
						return "'+"+child.expression.name+"+'";
					}
					
					case 'BinaryExpression': {
						return "'+"+content.substr(child.start+1, child.end-child.start-2)+"+'";
					}
				}
				
				return "";
			}
			
			case 'JSXElement': {
				return this.transformJSXElement(child, content);
			}
			
			default: {
				return "";
			}
		}
	}
	
	static transformJSXElement(element, content) {
		let tmp ='';
		tmp += '<'+element.openingElement.name.name;
		if(element.openingElement.attributes.length) {
			tmp += " "+element.openingElement.attributes.map(attribute => {
				if(attribute.value) {
					switch(attribute.value.type) {
						case 'Literal': {
							return attribute.name.name+'="\'+\''+attribute.value.value+'\'+\'"';
						}
						
						case 'JSXExpressionContainer': {
							return (attribute.name.name+'="\'+'+content.substr(attribute.value.start+1, attribute.value.end-attribute.value.start-2)+'+\'"');
						}
					}
				} else {
					return attribute.name.name;
				}
			}).join(" ");
		}
		tmp += '>';
		
		tmp += element.children.map(child => {
			switch(child.type) {
				case 'JSXText': {
					return child.value;
				}
				
				case 'JSXExpressionContainer': {
					switch(child.expression.type) {
						case 'Literal': {
							return child.expression.value;
						}
						
						case 'Identifier': {
							return "'+"+child.expression.name+"+'";
						}
						
						case 'BinaryExpression': {
							return "'+"+content.substr(child.start+1, child.end-child.start-2)+"+'";
						}
						
						case 'ConditionalExpression': {
							return "'+"+content.substr(child.start+1, child.end-child.start-2)+"+'";
						}
					}
					
					return "'+"+content.substr(child.expression.start, child.expression.end-child.expression.start)+"+'";
				}
				
				case 'JSXElement': {
					return this.transformJSXElement(child, content);
				}
				
				default: {
					return "";
				}
			}
		}).join("");
		
		tmp +='</'+element.closingElement.name.name+'>';
		
		return tmp;
	}
	
	static preprocess(content) {
		this.extendWalkBase(walk);
		
		let element = null;
		
		while((element = this.findNode(content, 'JSXElement')) != null) {
			const transformed = this.transformJSXElement(element, content).replace(/[\r\n\t]/g, '');
			content = content.substr(0, element.start)+"'"+transformed+"'"+content.substr(element.end, content.length);
		}
		
		content = "/*JSX override*/if(!window.NATIVE_appendChild){window.NATIVE_appendChild = Node.prototype.appendChild;Node.prototype.appendChild = function(){if(typeof arguments[0] == 'string'){arguments[0] = document.createRange().createContextualFragment(arguments[0]);}return window.NATIVE_appendChild.apply(this, arguments);};}/*JSX override*/\n\n" + content;

		return content;
	}
}

module.exports = JSXVanilla;