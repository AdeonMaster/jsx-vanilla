'use strict';

class JSXVanillaError extends Error {
	constructor(message) {
		super(message);
		this.name = "JSXVanillaError";
	}
}

class JSXVanilla {
	static matchAll(string, regexpr) {
		let 
			match = null,
			matches = []
		;
		
		while((match = regexpr.exec(string)) !== null) {
			matches.push(match);
		}
		
		return matches;
	}

	static extractHTMLTags(text) {
		return this.matchAll(text, /<(\/)?([a-z0-9]+?)(?: \S+?="[\S+ ]+?")*?(?: \S+?)*?( ?\/)?>/g); // <(\/)?([a-z0-9]+?)(?: \S+?="[\S+ ]+?")*( \S+?)*>
	}
	
	static extractStrings(text) {
		return this.matchAll(text, /["'](?:.+?)*?["']/g);
	}
	
	static NumberInRange(n, left, right) {
		return left < n && n < right;
	}
	
	static HTMLTagInsideString(tag, string) {
		let stringLeftBorder = string.index;
		let stringRightBorder = string.index + string[0].length;
		let tagLeftBorder = tag.index;
		let tagRightBorder = tag.index + tag[0].length;
		
		return this.NumberInRange(tagLeftBorder, stringLeftBorder, stringRightBorder) && this.NumberInRange(tagRightBorder, stringLeftBorder, stringRightBorder);
	}
	
	static HTMLTagInsideStrings(tag, strings) {
		for(let i = 0, len = strings.length; i < len; ++i) {
			if(this.HTMLTagInsideString(tag, strings[i])) {
				return true;
			}
		}
		
		return false;
	}
	
	static filterHTMLTagsInStrings(tags, strings) {
		return tags.filter(tag => !this.HTMLTagInsideStrings(tag, strings));
	}

	static findHTMLBlock(tags, text) {
		let openedTag = null;
		let equalizer = null;
		let usedTags = [];
		
		if(tags.length) {
			for(let i = 0, len = tags.length; i < len; ++i) {
				if(!openedTag) {
					if(tags[i][3] != undefined) { //self enclosed tag
						return {
							content: text.substr(tags[i].index, tags[i][0].length),
							index: tags[i].index,
							len: tags[i][0].length,
							usedTags: [i]
						}
					} else {
						if(tags[i][1] == undefined) { //opened tag
							openedTag = tags[i];
							equalizer = 1;
							usedTags = [i];
						}
					}
				} else {
					usedTags.push(i);
					
					if(openedTag[2] == tags[i][2]) {
						if(tags[i][1] == undefined) {
							++equalizer;
						} else {
							--equalizer;
						}

						if(equalizer == 0) {
							return {
								content: text.substr(openedTag.index, tags[i].index - openedTag.index +  tags[i][0].length),
								index: openedTag.index,
								len: tags[i].index - openedTag.index +  tags[i][0].length,
								usedTags: usedTags
							}
						}
					}
				}
			}
		}
		
		if(equalizer != 0 && openedTag) {
			throw new JSXVanillaError("Unclosed HTML tag "+openedTag[0]);
		}
		
		return null;
	}
	
	static extractParams(text) {
		let 
			opened = 0,
			closed = 0,
			start = null,
			params = []
		;
		
		for(let i = 0, len = text.length; i < len; ++i) {
			switch(text[i]) {
				case '{': {
					if(!opened) {
						start = i;
					}
					++opened;
					break;
				} 
				
				case '}': {
					++closed;
					break;
				}
			}
		
			if(opened && closed && (opened == closed)) {
				if(i-start != 1) { //skip {}
					params.push(text.substr(start, i-start+1));
				}
				
				opened = closed = start = 0;
			}
		}
	  
		if(opened != closed) {
			throw new JSXVanillaError("Unclosed brackets at "+text);
		}
	  
		return params;
	}
	
	static processHTMLBlock(block, text, level) {
		//remove whitespaces
		block.content = block.content.replace(/[\r\n\t]/g, '');
		
		//transform JSX block into string
		block.content = "/*JSXBS*/'" + block.content + "'/*JSXBE*/";

		//find and replace style
		block.content = block.content.replace(/style ?= ?{([a-zA-z$_]+)}/g, "style='+Object.keys($1).map((key) => key.replace(/([A-Z])/g, (g) => '-'+g.toLowerCase())+':'+$1[key]+';').join('')+'");
		
		//extract params
		const params = this.extractParams(block.content);
		if(params.length) {
			for(let i = 0, len = params.length; i < len; ++i) {
				let param = this.sugar(params[i].substr(1, params[i].length-2), 'params');
				block.content = block.content.replace(params[i], "'+"+param+"+'");
			}
		}
		
		//test block replacer
		const 
			textLength = text.length,
			firstPart = text.substr(0, block.index),
			secondPart = text.substr(block.index + block.len, textLength)
		;
		
		return firstPart+block.content+secondPart;
	}
	
	static extractJSXCommentBlocks(text) {
		return this.matchAll(text, /(\/\*JSXBS\*\/)|(\/\*JSXBE\*\/)/g);
	}
	
	static findJSXCommentBlocks(text) {
		let comments = this.extractJSXCommentBlocks(text);
		let openedTag = null;
		let equalizer = null;
		let blocks = [];
		
		for(let i = 0, len = comments.length; i < len; ++i) {
			if(!openedTag) {
				openedTag = comments[i];
				equalizer = 1;
			} else {
				if(openedTag[1] == comments[i][1]) {
					++equalizer;
				} else {
					--equalizer;
				}
				
				if(equalizer == 0) {
					blocks.push({
						0 : text.substr(openedTag.index, comments[i].index - openedTag.index +  comments[i][0].length),
						index: openedTag.index
					});
				}
			}
		}
		
		if(comments.length && equalizer != 0) {
			throw new JSXVanillaError("Unclosed JSX block?");
		}
		
		return blocks;
	}
	
	static HTMLTagInsideJSXBlock(tag, jsx) {
		let jsxLeftBorder = jsx.index;
		let jsxRightBorder = jsx.index + jsx[0].length;
		let tagLeftBorder = tag.index;
		let tagRightBorder = tag.index + tag[0].length;
	
		console.log(tag[0], tagLeftBorder, tagRightBorder, jsxLeftBorder, jsxRightBorder, this.NumberInRange(tagLeftBorder, jsxLeftBorder, jsxRightBorder) && this.NumberInRange(tagRightBorder, jsxLeftBorder, jsxRightBorder));
	
		return this.NumberInRange(tagLeftBorder, jsxLeftBorder, jsxRightBorder) && this.NumberInRange(tagRightBorder, jsxLeftBorder, jsxRightBorder);
	}
	
	static HTMLTagInsideJSXBlocks(tag, jsx) {
		for(let i = 0, len = jsx.length; i < len; ++i) {
			if(this.HTMLTagInsideJSXBlock(tag, jsx[i])) {
				return true;
			}
		}
		
		return false;
	}
	
	static filterHTMLTagsInJSXBlocks(tags, jsx) {
		return tags.filter(tag => !this.HTMLTagInsideJSXBlocks(tag, jsx));
	}
	
	static sugar(text, level="main") {
		let tags;
		let strings;
		let jsx;
		let block;
		let maxIterations = 1000;

		do {
			console.log("Text:", text);
			tags = this.extractHTMLTags(text);
			strings = this.extractStrings(text);
			jsx = this.findJSXCommentBlocks(text);
			
			console.log("Tags:", tags.map(tag => tag[0]));
			console.log("Strings:", strings.map(tag => tag[0]));
			console.log("JSX:", jsx.map(tag => tag[0]));
			
			tags = this.filterHTMLTagsInJSXBlocks(tags, jsx);
			tags = this.filterHTMLTagsInStrings(tags, strings);

			console.log("Filtered tags:", tags.map(tag => tag[0]));
			
			block = this.findHTMLBlock(tags, text);
			if(block) {
				console.log("Block:"+block.content);
				text = this.processHTMLBlock(block, text, level);
			}

			--maxIterations;
			if(!maxIterations) {
				throw new JSXVanillaError("Probably an infinite loop");
				break;
			}
		} while(block != null);

		return text;
	}
	
	static extractRegExps(text) {
		return this.matchAll(text, /\/.+?\//g);
	}
	
	static findStringsTest(text) {
	}
	
	static preprocess(text) {
		let strings = this.findStringsTest(text);
		console.log(strings);
		
		/*
		text = this.sugar(text);

		text = text.replace(/\/\*JSXBS\*\//g, "");
		text = text.replace(/\/\*JSXBE\*\//g, "");
		*/
		//text = "/*JSX override*/if(!window.NATIVE_appendChild) {window.NATIVE_appendChild = Node.prototype.appendChild;Node.prototype.appendChild = function() {if(typeof arguments[0] == 'string') {arguments[0] = document.createRange().createContextualFragment(arguments[0]);}return window.NATIVE_appendChild.apply(this, arguments);};}/*JSX override*/\n\n" + text;

		return text;
	}
}

module.exports = JSXVanilla;