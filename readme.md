# JSX Vanilla

# [![npm version](https://badge.fury.io/js/jsx-vanilla.svg)](https://badge.fury.io/js/jsx-vanilla)

JSX is a JavaScript XML/HTML syntax extender, that allows you to render XML/HTML tags inside vanilla JavaScript. Originaly inspired by React.js JSX

# Examples of usage

Here is some examples of JSX Vanilla usage

## Basic syntax

```javascript
	let 
		a = <p>Hello world!</p>,
		b = (<p>Hello world</p>),
		c = (
			<div>
				<p>Hello world!</p>
			</div>
		)
	;
	
	document.body.appendChild(a);
	document.body.appendChild(<p>Hello world!</p>);
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
		a = <p>{text}</p>,
		b = (<p>{(2+2)}</p>),
		c = (<p>{text()}</p>),
		d = (<p>{(six > 5 ? "True" : "False")}</p>),
		e = (
			<p>{(function(){
				return 4 > 2 ? "Four bigger than two" : "Two bigger than four";
			})()}</p>
		)
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