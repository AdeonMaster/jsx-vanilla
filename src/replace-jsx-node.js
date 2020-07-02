const replaceJSXNode = (node, transformedNode, content) => {
  const leftPart = content.substr(0, node.start);
  const rightPart = content.substr(node.end, content.length);

  return `${leftPart}\`${transformedNode}\`${rightPart}`;
};

export default replaceJSXNode;
