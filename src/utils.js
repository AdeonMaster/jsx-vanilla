const noop = () => {};
const nodeFromString = string => document.createRange().createContextualFragment(string);

module.exports = {
  noop,
  nodeFromString
}
