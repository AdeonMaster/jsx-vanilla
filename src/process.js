import * as walker from 'acorn-walk';

import extendWalkBaseWithJSXNodes from './extend-walk-base-with-jsx-nodes';
import findJSXNode from './find-jsx-node';
import transformJSXNode from './transform-jsx-node';
import replaceJSXNode from './replace-jsx-node';

extendWalkBaseWithJSXNodes(walker);

const preprocess = (content) => {
  let node = null;

  /* eslint-disable-next-line no-cond-assign */
  while ((node = findJSXNode(walker, content)) != null) {
    const transformedNode = transformJSXNode(node, content);
    /* eslint-disable-next-line no-param-reassign */
    content = replaceJSXNode(node, transformedNode, content);
  }

  return content;
};

export default preprocess;
