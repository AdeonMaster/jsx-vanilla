import { preprocess } from '..';

const content = `
  const a = <p>Text</p>;

  const b = <p class="test">Text</p>;

  const c = (
    <div class="container test">
      <h1>Heading</h1>
      <p>Text after heading</p>
    </div>
  );
`;

const expected = `
  const a = '<p>Text</p>';

  const b = '<p class="test">Text</p>';

  const c = (
    '<div class="container test">      <h1>Heading</h1>      <p>Text after heading</p>    </div>'
  );
`;

test('Simple JSXVanilla block', () => {
  const output = preprocess(content);

  expect(output).toBe(expected);
});
