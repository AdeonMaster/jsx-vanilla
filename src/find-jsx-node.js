import { Parser } from 'acorn';
import acornJSX from 'acorn-jsx';

const extendedAcornParser = Parser.extend(acornJSX());

const findJSXNode = (walker, content) => {
  const root = extendedAcornParser.parse(content, { allowImportExportEverywhere: true });

  let foundNode = null;

  walker.simple(root, {
    JSXElement: (node) => {
      foundNode = node;
    },
  });

  return foundNode;
};

export default findJSXNode;
