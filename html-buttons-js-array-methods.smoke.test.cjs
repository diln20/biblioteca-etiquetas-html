const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const htmlSource = fs.readFileSync('html-button-types-section.js', 'utf8');
const jsSource = fs.readFileSync('javascript-reduce-some-every-section.js', 'utf8');
const loader = fs.readFileSync('loader.js', 'utf8');

assert.doesNotThrow(() => new vm.Script(htmlSource, { filename:'html-button-types-section.js' }));
assert.doesNotThrow(() => new vm.Script(jsSource, { filename:'javascript-reduce-some-every-section.js' }));

const sections = [];
const context = {
  console,
  sections,
  T: (tag,name,description,code,preview=code,attrs=[],meta={}) => ({tag,name,description,code,preview,attrs,...meta}),
  buildNav: () => {},
  render: () => {}
};
context.window = context;
vm.createContext(context);
new vm.Script(htmlSource, { filename:'html-button-types-section.js' }).runInContext(context);
new vm.Script(jsSource, { filename:'javascript-reduce-some-every-section.js' }).runInContext(context);

const buttons = sections.find(section => section.title === 'HTML · Formularios · Tipos de button');
assert.ok(buttons, 'falta la sección de tipos de button');
assert.ok(buttons.items.length >= 8, 'faltan ejemplos de button');
const buttonText = buttons.items.map(item => `${item.name}\n${item.description}\n${item.code}\n${item.tip || ''}`).join('\n');
[
  'type="submit"',
  'type="reset"',
  'type="button"',
  'event.preventDefault()',
  'FormData',
  'event.submitter',
  'formaction',
  'formnovalidate',
  'disabled',
  'Dentro de un formulario, omitir type'
].forEach(term => assert.ok(buttonText.includes(term), `falta explicar ${term}`));

const arrays = sections.find(section => section.title === 'JavaScript · 8B. reduce(), some() y every() a fondo');
assert.ok(arrays, 'falta la sección reduce some every');
assert.ok(arrays.items.length >= 8, 'faltan prácticas de arrays');
const arrayText = arrays.items.map(item => `${item.name}\n${item.description}\n${item.code}\n${item.tip || ''}`).join('\n');
[
  '.reduce(',
  '.some(',
  '.every(',
  'acumulador',
  'valor inicial',
  'array vacío',
  'se detiene',
  'precio * producto.stock',
  'includes(permiso)'
].forEach(term => assert.ok(arrayText.includes(term), `falta explicar ${term}`));

assert.ok(loader.includes('html-button-types-section.js?v=1'), 'loader no carga tipos de button');
assert.ok(loader.includes('javascript-reduce-some-every-section.js?v=1'), 'loader no carga reduce some every');

console.log({
  status:'ok',
  buttonLessons:buttons.items.length,
  arrayLessons:arrays.items.length,
  submitResetButton:true,
  reduceSomeEvery:true
});
