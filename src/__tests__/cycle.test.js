import { preprocess } from '..';

const content = `
  const menu = (
    <ul class="menu">
      {array.map(item => (
        <li>{item}</li>
      )).join('')}
    </ul>
  );
`;

const expected = `
  const menu = (
    \`<ul class="menu">
      \${array.map(item => (
        \`<li>\${item}</li>\`
      )).join('')}
    </ul>\`
  );
`;

test('JSX block with cycle', () => {
  const output = preprocess(content);

  expect(output).toBe(expected);
});
