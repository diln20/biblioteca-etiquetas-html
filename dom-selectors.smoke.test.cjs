const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const read = file => fs.readFileSync(file, 'utf8');
const source = read('dom-selectors-section.js');
const loader = read('loader.js');
const index = read('index.html');

assert.ok(loader.includes("dom-selectors-section.js?v=1"));
assert.ok(index.includes('domselectors=1'));
assert.doesNotThrow(() => new vm.Script(source, {filename:'dom-selectors-section.js'}));

const context = {
  console,
  sections: [],
  T: (tag,name,description,code,preview='',attrs=[],meta={}) => ({tag,name,description,code,preview,attrs,...meta})
};
context.window = context;
vm.createContext(context);
new vm.Script(source, {filename:'dom-selectors-section.js'}).runInContext(context);

assert.equal(context.sections.length, 1);
const section = context.sections[0];
assert.equal(section.title, 'JavaScript · DOM · Selectores');
assert.equal(section.group, 'JavaScript');
assert.equal(section.primaryArea, 'JavaScript');
assert.equal(section.areaOrder, 905);
assert.equal(section.items.length, 12);

const joined = section.items.map(item => `${item.name}\n${item.description}\n${item.code}`).join('\n');
[
  'getElementById',
  'getElementsByClassName',
  'getElementsByTagName',
  'querySelector',
  'querySelectorAll',
  'closest',
  'matches',
  'HTMLCollection',
  'NodeList',
  'data-action',
  'nth-child'
].forEach(term => assert.ok(joined.includes(term), `falta explicar ${term}`));

const first = section.items[0];
assert.ok(Array.isArray(first.filesToCreate));
assert.ok(first.filesToCreate.some(file => file.path === 'dom/selectores/index.html'));
assert.ok(first.filesToCreate.some(file => file.path === 'dom/selectores/app.js'));
assert.ok(first.filesToCreate.some(file => file.path === 'dom/selectores/styles.css'));
assert.ok(section.items.every(item => Array.isArray(item.guide) && item.guide.length >= 3));
assert.ok(section.items.every(item => item.guideTitle === 'Dónde se hace cada modificación'));
assert.ok(section.items.every(item => item.codeLabel === 'Código HTML + JavaScript'));

console.log({status:'ok', section:section.title, lessons:section.items.length});
