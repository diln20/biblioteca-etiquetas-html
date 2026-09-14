const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('dom-section.js','utf8');
const context = {
  console,
  sections: [],
  T: (tag,name,description,code,preview=code,attrs=[],meta={}) => ({tag,name,description,code,preview,attrs,...meta}),
  buildNav() {},
  render() {}
};
context.window = context;
vm.createContext(context);
new vm.Script(source,{filename:'dom-section.js'}).runInContext(context);

assert.equal(context.sections.length,1);
const section = context.sections[0];
assert.equal(section.title,'Manejo del DOM');
assert.equal(section.group,'JavaScript');
assert.ok(section.description.includes('árbol de objetos'));
assert.equal(section.items.length,15);

const text = section.items.map(item => `${item.name}\n${item.description}\n${item.code}`).join('\n');
[
  '¿Qué es el DOM y cómo se forma el árbol?',
  'ACCESS · seleccionar y obtener elementos',
  'CHANGE · modificar texto y contenido',
  'EVENT HANDLING · responder a clics y otros eventos',
  'ADD · crear y añadir nuevos elementos',
  'REMOVE · eliminar o reemplazar elementos',
  'Delegación de eventos',
  'DOM con formularios',
  'defer y DOMContentLoaded',
  'Proyecto de repaso · lista dinámica completa'
].forEach(value => assert.ok(text.includes(value),`falta ${value}`));

['querySelector','querySelectorAll','textContent','classList','setAttribute','addEventListener','createElement','appendChild','remove()','closest','dataset','preventDefault','DOMContentLoaded'].forEach(value => {
  assert.ok(text.includes(value),`falta ${value}`);
});

const first = section.items[0];
assert.ok(Array.isArray(first.filesToCreate));
['dom/index.html','dom/app.js','dom/styles.css'].forEach(path => {
  assert.ok(first.filesToCreate.some(file => file.path === path),`falta indicar ${path}`);
});
assert.ok(section.items.every(item => Array.isArray(item.guide) && item.guide.length > 0));
assert.ok(section.items.every(item => item.guideTitle === 'Dónde se hace cada modificación'));

console.log({status:'ok',domLessons:section.items.length});
