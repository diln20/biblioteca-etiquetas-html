const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const read = file => fs.readFileSync(file, 'utf8');
const loader = read('loader.js');
const jsFunctions = read('javascript-functions-detailed.js');
const htmlPython = read('html-python-section.js');

assert.ok(loader.includes('javascript-functions-detailed.js?v=1'));
assert.ok(loader.includes('html-python-section.js?v=1'));
assert.ok(loader.includes('javascript-foundations-extra-1.js?v=1'));
assert.ok(loader.includes('javascript-foundations-extra-2.js?v=1'));
assert.ok(loader.includes('javascript-runtime-review.js?v=1'));
assert.ok(loader.indexOf('javascript-functions-detailed.js?v=1') < loader.indexOf('section-order.js?v=7'));
assert.ok(loader.indexOf('html-python-section.js?v=1') < loader.indexOf('section-order.js?v=7'));
assert.doesNotThrow(() => new vm.Script(jsFunctions, { filename:'javascript-functions-detailed.js' }));
assert.doesNotThrow(() => new vm.Script(htmlPython, { filename:'html-python-section.js' }));

const context = {
  console,
  sections: [],
  T: (tag,name,description,code,preview=code,attrs=[],meta={}) => ({tag,name,description,code,preview,attrs,...meta})
};
context.window = context;
vm.createContext(context);
new vm.Script(jsFunctions, { filename:'javascript-functions-detailed.js' }).runInContext(context);
new vm.Script(htmlPython, { filename:'html-python-section.js' }).runInContext(context);

const functionsSection = context.sections.find(section => section.title === 'JavaScript · 7A. Tipos de funciones');
assert.ok(functionsSection, 'falta la sección detallada de funciones JavaScript');
assert.equal(functionsSection.primaryArea, 'JavaScript');
assert.ok(functionsSection.items.length >= 14);
const functionNames = functionsSection.items.map(item => item.name);
[
  '1. Function declaration · declaración de función',
  '2. Function expression · expresión de función',
  '3. Arrow function · función flecha',
  '4. Anonymous function · función anónima',
  '5. IIFE · función invocada inmediatamente',
  '6. Callback function · función entregada a otra función',
  '7. Default parameter · parámetro con valor por defecto',
  '8. Rest parameter · recibir una cantidad variable de argumentos',
  '9. Parameterized function · función con parámetros',
  '10. Recursive function · función recursiva',
  '11. Higher-order function · función de orden superior',
  '12. Constructor function · función constructora',
  '13. Async function · funciones asíncronas',
  '14. Generator function · función generadora'
].forEach(name => assert.ok(functionNames.includes(name), `falta ${name}`));
assert.ok(functionsSection.items.some(item => item.code.includes('function Persona')));
assert.ok(functionsSection.items.some(item => item.code.includes('...numeros')));
assert.ok(functionsSection.items.some(item => item.code.includes('async function')));
assert.ok(functionsSection.items.some(item => item.code.includes('function* ids')));
assert.ok(functionsSection.items.every(item => item.codeLabel === 'Código JavaScript'));
assert.ok(functionsSection.items.every(item => Array.isArray(item.guide) && item.guide.length > 0));
assert.ok(functionsSection.items.every(item => String(item.preview).includes('Resultado ·')));

const pythonSection = context.sections.find(section => section.title === 'HTML + Python · Python en el navegador');
assert.ok(pythonSection, 'falta la sección HTML + Python');
assert.equal(pythonSection.primaryArea, 'HTML');
assert.ok(pythonSection.items.length >= 10);
const pythonCode = pythonSection.items.map(item => item.code).join('\n');
assert.ok(pythonCode.includes('pyscript.net/releases/2026.7.3/core.js'));
assert.ok(pythonCode.includes('type="py"'));
assert.ok(pythonCode.includes('@when("click"'));
assert.ok(pythonCode.includes('from pyscript import web'));
assert.ok(pythonCode.includes('pyodide/v314.0.6/full/pyodide.js'));
assert.ok(pythonCode.includes('pyscript.json'));
assert.ok(pythonCode.includes('Django/FastAPI'));
assert.ok(pythonSection.items.every(item => Array.isArray(item.guide) && item.guide.length > 0));
assert.ok(pythonSection.items.every(item => item.codeLabel === 'Código HTML + Python'));
assert.ok(pythonSection.items.some(item => item.filesToCreate.some(file => file.path === 'python-html/main.py')));
assert.ok(pythonSection.items.some(item => item.filesToCreate.some(file => file.path === 'python-html/pyscript.json')));
assert.ok(pythonSection.items.some(item => item.filesToCreate.some(file => file.path === 'python-html/calculadora/index.html')));

console.log({
  status:'ok',
  javascriptFunctionLessons:functionsSection.items.length,
  pythonHtmlLessons:pythonSection.items.length
});

require('./javascript-foundations-depth.smoke.test.cjs');
require('./javascript-order.smoke.test.cjs');
