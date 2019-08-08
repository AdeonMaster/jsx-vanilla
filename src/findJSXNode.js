const acorn = require('acorn');
const acornJSX = require('acorn-jsx');

const extendedAcornParser = acorn.Parser.extend(acornJSX());

const findJSXNode = (walker, content) => {
  const root = extendedAcornParser.parse(content);

  let foundNode = null;

  walker.simple(root, {
    'JSXElement': node => {
      foundNode = node;
    }
  });

  return foundNode;
}

module.exports = findJSXNode;
