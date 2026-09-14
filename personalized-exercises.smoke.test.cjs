const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('personalized-exercises.js', 'utf8');
const loader = fs.readFileSync('loader.js', 'utf8');
const index = fs.readFileSync('index.html', 'utf8');

assert.ok(loader.includes("'personalized-exercises.js?v=1'"));
assert.ok(index.includes('&practice=1'));
assert.ok(source.includes("details.className='personal-exercise'"));
assert.ok(source.includes("details.dataset.personalExercise='true'"));
assert.ok(source.includes('Ejercicio para ti'));
assert.ok(source.includes('tu nombre'));
assert.ok(source.includes('tu edad'));
assert.ok(source.includes('tu ciudad'));
assert.ok(source.includes('Usa datos ficticios si vas a publicar el ejercicio'));

[
  "area==='HTML'",
  "area==='CSS'",
  "area==='JavaScript'",
  "area==='TypeScript'",
  "area==='Git'",
  "area==='APIs'",
  "area==='Angular'",
  "area==='React'",
  "area==='Vue'",
  "area==='Svelte'||area==='Solid.js'",
  "area==='Django Framework'",
  "area==='FastAPI'",
  "area==='Django REST'",
  "area==='Base de datos'",
  "area==='Backend'",
  "area==='Frameworks'"
].forEach(marker => assert.ok(source.includes(marker), `falta práctica para ${marker}`));

assert.ok(source.includes('getElementById'));
assert.ok(source.includes('querySelector'));
assert.ok(source.includes('data-ciudad'));
assert.ok(source.includes('componente Perfil'));
assert.ok(source.includes('endpoint /perfil'));
assert.ok(source.includes('guarda un perfil'));

console.log('Personalized exercises smoke OK');
