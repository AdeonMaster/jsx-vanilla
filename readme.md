# JSX Vanilla

# [![npm version](https://badge.fury.io/js/jsx-vanilla.svg)](https://badge.fury.io/js/jsx-vanilla)

JSX is a JavaScript XML/HTML syntax extender, that allows you to render XML/HTML tags inside vanilla JavaScript. Originaly inspired by React.js JSX

# Syntax examples

Here are some examples of JSX Vanilla usage

## Variables declaration

```javascript
	let 
		a = <p>Hello world!</p>,
		b = (
			<div>
				<h1>Hello world!</h1>
			</div>
		)
	;
	
	document.body.appendChild(a);
	document.body.appendChild(<h2>Hello world!</h2>);
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
		d = <p>{(six > 5 ? 'True' : 'False')}</p>
	;
```

## Cycles examples

```javascript
const array = ['First', 'Second', 'Third'];

let 
    a = (
		<ul class="menu">
			{array.map(item => (
				<li>{item}</li>
			)).join('')}
		</ul>
	)
;
	
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

- String literals passed as parameters should be covered with a ' quotes, otherwise it will cause error
- Passing a closure as parameter will cause error