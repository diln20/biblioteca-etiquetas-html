const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const read=file=>fs.readFileSync(file,'utf8');
const source=read('api-json-cheat-sheet.js');
const loader=read('loader.js');

assert.doesNotThrow(
  ()=>new vm.Script(source,{filename:'api-json-cheat-sheet.js'}),
  'api-json-cheat-sheet.js contiene sintaxis inválida'
);
assert.ok(loader.includes('api-json-cheat-sheet.js?v=1'),'loader no carga la chuleta JSON');

const context={
  console,
  sections:[],
  T:(tag,name,description,code,preview=code,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta})
};
context.window=context;
vm.createContext(context);
new vm.Script(source,{filename:'api-json-cheat-sheet.js'}).runInContext(context);

const section=context.sections.find(item=>item.title==='APIs · Chuleta JSON y datos');
assert.ok(section,'falta la sección APIs · Chuleta JSON y datos');
assert.equal(section.primaryArea,'APIs');
assert.equal(section.group,'APIs');
assert.equal(section.navLabel,'Chuleta API + JSON');
assert.ok(section.items.length>=10,`se esperaban al menos 10 bloques y hay ${section.items.length}`);

const allText=section.items.map(item=>`${item.name}\n${item.description}\n${item.code}`).join('\n');
[
  'response.json()',
  'JSON.parse',
  'JSON.stringify',
  'Array.isArray',
  '.map(',
  '.filter(',
  '.find(',
  '?.',
  'textContent',
  'Content-Type',
  'localStorage',
  'response.ok'
].forEach(term=>assert.ok(allText.includes(term),`falta explicar o usar ${term}`));

assert.ok(section.items.every(item=>Array.isArray(item.guide)&&item.guide.length>0),'todas las tarjetas deben incluir guía');
assert.ok(section.items.every(item=>Array.isArray(item.filesToCreate)),'todas las tarjetas deben indicar archivos');
assert.ok(section.items.every(item=>!item.code.includes('await ')||item.code.includes('async function')),'hay await fuera de una función async en un ejemplo');
assert.ok(section.items.every(item=>!item.code.includes('innerHTML =')),'los datos externos no deben renderizarse con innerHTML');
assert.ok(section.items.some(item=>item.name.includes('Flujo completo')),'falta el ejemplo completo API → JSON → DOM');

console.log({
  status:'ok',
  section:section.title,
  lessons:section.items.length,
  parseAndStringify:true,
  arrays:true,
  safeDom:true,
  asyncAwaitGuard:true,
  fullFlow:true
});
