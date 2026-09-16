const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const source=fs.readFileSync('javascript-order-finalizer.js','utf8');
const loader=fs.readFileSync('loader.js','utf8');
assert.doesNotThrow(()=>new vm.Script(source,{filename:'javascript-order-finalizer.js'}));
assert.ok(loader.includes('javascript-order-finalizer.js?v='));
assert.ok(loader.indexOf('modern-frontend-tools-section.js')<loader.indexOf('javascript-order-finalizer.js'));
assert.ok(loader.indexOf('javascript-order-finalizer.js')<loader.indexOf('course-ui.js'));

const titles=[
  'JavaScript · 10A. Motor, navegador y Node.js',
  'JavaScript · 4. Estructuras de datos',
  'JavaScript · 1. Primeros pasos',
  'JavaScript · 8A. map vs filter vs reduce',
  'Manejo del DOM',
  'JavaScript · 2. Variables y tipos de datos',
  'JavaScript · 7A. Tipos de funciones',
  'JavaScript · DOM · Selectores',
  'JavaScript · 3. Operadores',
  'JavaScript · 11A. Repaso y preguntas de entrevista',
  'JavaScript · 5. Estructuras condicionales',
  'JavaScript · 4B. Objeto Math y aleatoriedad',
  'JavaScript · 10. Errores, módulos y asincronía',
  'JavaScript · 10B. Fetch API a fondo',
  'JavaScript · 10C. APIs públicas de PublicAPIs.io',
  'JavaScript · 10D. Archivos JSON',
  'JavaScript · 10E. Mini base de datos con JSON',
  'JavaScript · 2A. Tipos especiales y memoria',
  'JavaScript · 8. Métodos de arreglos',
  'JavaScript · 1A. Sintaxis, entrada y salida',
  'JavaScript · 9. Objetos y manejo de datos',
  'JavaScript · 3A. Conversión, coerción y valores booleanos',
  'JavaScript · 6. Estructuras repetitivas',
  'JavaScript · 4A. Strings y Numbers a fondo',
  'JavaScript · 7. Funciones'
];
const context={console,sections:[{title:'HTML · referencia',primaryArea:'HTML'},...titles.map(title=>({title,group:'JavaScript',primaryArea:'JavaScript'})),{title:'Git · referencia',primaryArea:'Git'}]};
context.window=context;
vm.createContext(context);
new vm.Script(source,{filename:'javascript-order-finalizer.js'}).runInContext(context);

const js=context.sections.filter(section=>section.primaryArea==='JavaScript');
const expected=[
  'JavaScript · 1. Primeros pasos',
  'JavaScript · 1A. Sintaxis, entrada y salida',
  'JavaScript · 2. Variables y tipos de datos',
  'JavaScript · 2A. Tipos especiales y memoria',
  'JavaScript · 3A. Conversión, coerción y valores booleanos',
  'JavaScript · 3. Operadores',
  'JavaScript · 4A. Strings y Numbers a fondo',
  'JavaScript · 4B. Objeto Math y aleatoriedad',
  'JavaScript · 4. Estructuras de datos',
  'JavaScript · 5. Estructuras condicionales',
  'JavaScript · 6. Estructuras repetitivas',
  'JavaScript · 7. Funciones',
  'JavaScript · 7A. Tipos de funciones',
  'JavaScript · 8. Métodos de arreglos',
  'JavaScript · 8A. map vs filter vs reduce',
  'JavaScript · 9. Objetos y manejo de datos',
  'Manejo del DOM',
  'JavaScript · DOM · Selectores',
  'JavaScript · 10. Errores, módulos y asincronía',
  'JavaScript · 10B. Fetch API a fondo',
  'JavaScript · 10C. APIs públicas de PublicAPIs.io',
  'JavaScript · 10D. Archivos JSON',
  'JavaScript · 10E. Mini base de datos con JSON',
  'JavaScript · 10A. Motor, navegador y Node.js',
  'JavaScript · 11A. Repaso y preguntas de entrevista'
];
assert.deepEqual(js.map(section=>section.title),expected);
assert.deepEqual(js.slice(0,11).map(section=>section.learningLevel),Array(11).fill('Básico'));
assert.deepEqual(js.slice(11,18).map(section=>section.learningLevel),Array(7).fill('Intermedio'));
assert.deepEqual(js.slice(18).map(section=>section.learningLevel),Array(7).fill('Avanzado'));
assert.equal(context.sections[0].title,'HTML · referencia');
assert.equal(context.sections.at(-1).title,'Git · referencia');
assert.equal(context.javascriptLearningPath.titles.length,25);
console.log({status:'ok',javascriptSections:js.length,basic:11,intermediate:7,advanced:7});
