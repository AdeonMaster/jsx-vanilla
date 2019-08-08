import preprocess from '..';

const content = 'const a = <p>Text</p>;';
const expected = `const a = '<p>Text</p>';`;

test('Simple JSXVanilla block', () => {
  const output = preprocess(content);

  expect(output).toBe(expected);
});
