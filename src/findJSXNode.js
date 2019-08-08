const acorn = require('acorn-jsx');

const acornOptions = {
	plugins: {
		jsx: true
	},
	sourceType: 'module'
};

const findJSXNode = (walker, content) => {
  const root = acorn.parse(content, acornOptions);

  let foundNode = null;

  walker.simple(root, {
    'JSXElement': node => {
      foundNode = node;
    }
  });

  return foundNode;
}

module.exports = findJSXNode;
