const preprocess = require('../src');

const content = `
  const a = <p>Test</p>;
  const b = (
    <p>{'Text'}</p>
  );
  const c = (
    <div class="test">
      <p>Hello world!</p>
    </div>
  );
  const d = text => <p class={generateClassName()}>{text}</p>;

  console.log(a);
`;

console.log(preprocess(content));

/*
  const a = `<p>Test</p>`;
  const b = `<p>${'Text'}</p>`;
  const c = (
    `<div class="test">
      <p>Hello world!</p>
    </div>
    `
  );
  const d = text => `<p class=${generateClassName()}>${text}</p>`;

*/