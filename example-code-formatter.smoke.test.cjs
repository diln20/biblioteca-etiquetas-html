const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('example-code-formatter.js','utf8');
const context = {
  console,
  sections:[
    {
      title:'HTML · Listas',
      primaryArea:'HTML',
      items:[
        {code:'<ul><li>HTML</li><li>CSS</li><li>JS</li></ul>'},
        {code:'<div><section><p>Hola</p></section></div>'}
      ]
    },
    {
      title:'JavaScript · ejemplo',
      primaryArea:'JavaScript',
      items:[
        {code:'const html = "<ul><li>HTML</li></ul>";'}
      ]
    }
  ]
};
context.window=context;
vm.createContext(context);
new vm.Script(source,{filename:'example-code-formatter.js'}).runInContext(context);

assert.equal(
  context.sections[0].items[0].code,
  '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JS</li>\n</ul>'
);
assert.equal(
  context.sections[0].items[1].code,
  '<div>\n  <section>\n    <p>Hola</p>\n  </section>\n</div>'
);
assert.equal(
  context.sections[1].items[0].code,
  'const html = "<ul><li>HTML</li></ul>";'
);
assert.equal(context.formattedHtmlExampleCount,2);
assert.equal(typeof context.formatHtmlExample,'function');

console.log({status:'ok',formatted:context.formattedHtmlExampleCount});
