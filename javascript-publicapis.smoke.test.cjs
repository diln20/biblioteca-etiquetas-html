const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const sections = [];
const T = (topic,name,description,code,preview,attrs=[],meta={}) => ({
  topic,name,description,code,preview,attrs,...meta
});

const context = {
  window: { sections, T },
  sections,
  T,
  console
};
vm.createContext(context);
vm.runInContext(fs.readFileSync('javascript-publicapis-practice.js','utf8'), context);

const section = sections.find(s => s.title === 'JavaScript · 10C. APIs públicas de PublicAPIs.io');
assert.ok(section, 'Falta la sección de PublicAPIs.io');
assert.strictEqual(section.primaryArea, 'JavaScript');
assert.ok(section.items.length >= 5, 'Se esperaban al menos 5 lecciones');

const all = section.items.map(i => `${i.name}\n${i.description}\n${i.code}`).join('\n');
for (const expected of ['Open-Meteo','REST Countries','Rick and Morty','response.ok','Cargando']) {
  assert.ok(all.includes(expected), `Falta ${expected}`);
}

assert.ok(section.items.some(i => String(i.code).includes('api.open-meteo.com')));
assert.ok(section.items.some(i => String(i.code).includes('restcountries.com')));
assert.ok(section.items.some(i => String(i.code).includes('rickandmortyapi.com')));
assert.ok(section.items.some(i => Array.isArray(i.filesToCreate) && i.filesToCreate.some(f => f.path.endsWith('styles.css'))));
assert.ok(section.items.every(i => Array.isArray(i.guide) && i.guide.length > 0));
assert.ok(section.items.every(i => Array.isArray(i.exerciseTasks) && i.exerciseTasks.length > 0));

for (const item of section.items) {
  const code = String(item.code || '');
  if (code.includes('await ')) {
    assert.ok(
      code.includes('async function'),
      `${item.name}: usa await pero no muestra una función async completa`
    );
  }
}

const weather = section.items.find(i => String(i.code).includes('api.open-meteo.com'));
assert.ok(weather.code.includes('async function consultarClima()'));
assert.ok(weather.code.includes('try {'));
assert.ok(weather.code.includes('catch (error)'));
assert.ok(weather.code.includes('current_units'));

const countries = section.items.find(i => String(i.code).includes('restcountries.com'));
assert.ok(countries.code.includes('<script src="app.js" defer>'));
assert.ok(countries.code.includes('async function buscarPais()'));
assert.ok(countries.code.includes('encodeURIComponent(name)'));

const characters = section.items.find(i => String(i.code).includes('rickandmortyapi.com'));
assert.ok(characters.code.includes('<link rel="stylesheet" href="styles.css">'));
assert.ok(characters.code.includes('async function loadCharacters()'));
assert.ok(characters.code.includes('finally {'));
assert.ok(characters.code.includes('characters.length'));

console.log({
  status: 'ok',
  section: section.title,
  lessons: section.items.length,
  apiExamples: 3,
  htmlPractice: true,
  cssPractice: true,
  asyncAwaitGuard: true,
  fileGuides: true,
  exercises: true
});
