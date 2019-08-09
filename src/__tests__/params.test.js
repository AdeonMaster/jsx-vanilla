import { preprocess } from '..';

const content = `
  const text = 'This is test text';

  const a = <p>{text}</p>;

  const b = <p class="test">{(2+1)}</p>;

  const c = (
    <div class="container test" id={'testId'}>
      <h1>Heading</h1>
      <p>{text}</p>
    </div>
  );
`;

const expected = `
  const text = 'This is test text';

  const a = \`<p>\${text}</p>\`;

  const b = \`<p class="test">\${(2+1)}</p>\`;

  const c = (
    \`<div class="container test" id="\${'testId'}">
      <h1>Heading</h1>
      <p>\${text}</p>
    </div>\`
  );
`;

test('JSX block with params', () => {
  const output = preprocess(content);

  expect(output).toBe(expected);
});
