# What is JSX?
(taken from <a href="https://www.reactenlightenment.com/react-jsx/5.1.html">www.reactenlightenment.com</a>)

JSX is an XML/HTML-like syntax used by React that extends ECMAScript so that XML/HTML-like text can co-exist with JavaScript/React code. The syntax is intended to be used by preprocessors (i.e., transpilers like Babel) to transform HTML-like text found in JavaScript files into standard JavaScript objects that a JavaScript engine will parse.

Basically, by using JSX you can write concise HTML/XML-like structures (e.g., DOM like tree structures) in the same file as you write JavaScript code, then Babel will transform these expressions into actual JavaScript code. Unlike the past, instead of putting JavaScript into HTML, JSX allows us to put HTML into JavaScript.

# What is JSX Vanilla?
# [![npm version](https://badge.fury.io/js/jsx-vanilla.svg)](https://badge.fury.io/js/jsx-vanilla)
JSX Vanilla is a JavaScript preprocessor that allows you to use JSX syntax in vanilla JavaScript, separately from React, by transforming JSX blocks into string literals.

Common JSX block:
```js
const menu = (
  <ul>
    <li><a href="#">First</></li>
    <li><a href="#">Second</></li>
    <li><a href="#">Third</></li>
  </ul>
);
```

After the JSX Vanilla preprocess:
```js
const menu = (
  `<ul>
    <li><a href="#">First</></li>
    <li><a href="#">Second</></li>
    <li><a href="#">Third</></li>
  </ul>`
);
```
If desired, received strings could be transformed into DOM elements:
```js
const menu = (
  `<ul>
    <li><a href="#">First</></li>
    <li><a href="#">Second</></li>
    <li><a href="#">Third</></li>
  </ul>`
);

const node = document.createRange().createContextualFragment(menu);
```
# Syntax examples
JSX Vanilla syntax is almost the same as native one, excepts some specific cases.

## Simple variables declaration
```js
const text = <p>Hello world!</p>;
const menu = (
  <ul>
    <li><a href="#">First</></li>
    <li><a href="#">Second</></li>
    <li><a href="#">Third</></li>
  </ul>
);
```

## Passing parameters
```js
const SIX = 6;

const text = 'Hello world!';

const appendHeart = text => `${text} <3`;

const a = <h1>{text}</h1>;
const b = <h2>{(2+2)}</h2>;
const c = <h3>{appendHeart('I love JSX!')}</h3>;
const d = <p>{(SIX > 5 ? 'True' : 'False')}</p>;
const e = (
  <p>{(() => text)()}</p>
);
```

## Cycle example
```js
const array = ['First', 'Second', 'Third'];

const menu = (
  <ul class="menu">
    {array.map(item => (
      <li>{item}</li>
    )).join('')}
  </ul>
);
```

## Rendering elements
```js
const { nodeFromString } = require('jsx-vanilla');

const a = <h1>Hello world!</h1>;

document.body.appendChild(nodeFromString(a));
document.body.appendChild(nodeFromString(<h2>Hello world!</h2>));
```

## Example of file preprocessing in Node.js
If you are using webpack you can install custom <a href="https://www.npmjs.com/package/jsx-vanilla-loader">jsx-vanilla-loader</a>

```js
const { preprocess } = require('jsx-vanilla');
const fs = require('fs');

fs.readFile('TARGET_FILE_PATH', 'utf8', (error, content) => {
  if (error) return;

  try {
    const output = preprocess(content);

    fs.writeFile('OUTPUT_FILE_PATH', output, error => {
      if (error) return;

      // other code
    });
  } catch (error) {
    console.log(error);
  }
});
```

# Known issues
none
