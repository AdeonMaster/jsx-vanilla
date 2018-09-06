# What is JSX?
(taken from <a href="https://www.reactenlightenment.com/react-jsx/5.1.html">www.reactenlightenment.com</a>)

JSX is an XML/HTML-like syntax used by React that extends ECMAScript so that XML/HTML-like text can co-exist with JavaScript/React code. The syntax is intended to be used by preprocessors (i.e., transpilers like Babel) to transform HTML-like text found in JavaScript files into standard JavaScript objects that a JavaScript engine will parse.

Basically, by using JSX you can write concise HTML/XML-like structures (e.g., DOM like tree structures) in the same file as you write JavaScript code, then Babel will transform these expressions into actual JavaScript code. Unlike the past, instead of putting JavaScript into HTML, JSX allows us to put HTML into JavaScript.

# What is JSX Vanilla?
# [![npm version](https://badge.fury.io/js/jsx-vanilla.svg)](https://badge.fury.io/js/jsx-vanilla)
JSX Vanilla is a JavaScript preprocessor that allows you to use JSX syntax in vanilla JavaScript, separetly from React. It transforms JSX elements into strings, then into DOM elements.

By using JSX one can write the following JSX/JavaScript code:
```javascript
let a = (
    <ul>
		<li><a href="#">First</></li>
		<li><a href="#">Second</></li>
		<li><a href="#">Third</></li>
    </ul>
);
```

And JSX Vanilla will transform it into this:
```javascript
let a = '<ul id="nav"><li><a href="#">Home</a></li><li><a href="#">About</a></li><li><a href="#">Clients</a></li><li><a href="#">Contact Us</a></li></ul>';
```
Then it could be transformed into DOM elements:
```javascript
let a = document.createRange().createContextualFragment('<ul id="nav"><li><a href="#">Home</a></li><li><a href="#">About</a></li><li><a href="#">Clients</a></li><li><a href="#">Contact Us</a></li></ul>');
```
# Syntax examples
Here are some examples of JSX Vanilla usage.

## Variables declaration
```javascript
let 
	a = <p>Hello world!</p>,
	b = (
		<ul>
			<li><a href="#">First</></li>
			<li><a href="#">Second</></li>
			<li><a href="#">Third</></li>
		</ul>
	)
;
```

## Parameters usage
```javascript
const 
	text = "Hello world!",
	six = 6
;

function test() {
	return text;
}

let 
	a = <h1>{text}</h1>,
	b = <h2>{(2+2)}</h2>,
	c = <h3>{text()}</h3>,
	d = <p>{(six > 5 ? 'True' : 'False')}</p>,
	e = (
	    <p>{(function(){
    	    return text;
    	})()}</p>
	)
;
```

## Cycles examples
```javascript
const array = ['First', 'Second', 'Third'];

let 
    a = <ul class="menu">{array.map(item => <li>{item}</li>).join('')}</ul>,
	b = (
        <ul class="menu">
	        {array.map(item => {
	            return <li>{item}</li>;
	        }).join('')}
	    </ul>
	)
;
```

## Rendering elements
```javascript
let a = <h1>Hello world!</h1>;

document.body.appendChild(a);
document.body.appendChild(<h2>Hello world!</h2>);
```

## Example of file preprocessing
If you are using webpack you can install custom <a href="https://www.npmjs.com/package/jsx-vanilla-loader">jsx-vanilla loader</a>

```javascript
const 
	JSXVanilla = require('jsx-vanilla'),
	fs = require('fs')
;

fs.readFile('pathToInputFile', 'utf8', function(err, contents) {
   fs.writeFile('pathToOutputFile', JSXVanilla.preprocess(contents), function(err) {
		//other code
   });
});
```

# Known issues
 None