const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const read=file=>fs.readFileSync(file,'utf8');
const source=read('api-json-html-js-section.js');
const loader=read('loader.js');
const T=(tag,name,description,code,preview,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta});

assert.doesNotThrow(()=>new vm.Script(source,{filename:'api-json-html-js-section.js'}));

const sections=[];
const context={console,sections,T};
context.window=context;
vm.createContext(context);
new vm.Script(source,{filename:'api-json-html-js-section.js'}).runInContext(context);

const section=sections.find(item=>item.title==='APIs · JSON con HTML y JavaScript');
assert.ok(section,'falta la sección JSON con HTML y JavaScript');
assert.equal(section.group,'APIs');
assert.ok(section.items.length>=8,'la sección debe tener al menos 8 prácticas');

const text=section.items.map(item=>`${item.name}\n${item.description}\n${item.code}`).join('\n');
[
  'datos.json',
  'response.json()',
  'document.createElement',
  'textContent',
  'JSON.stringify',
  'filter',
  'find',
  '<form',
  '<table',
  'file://'
].forEach(term=>assert.ok(text.includes(term),`falta contenido: ${term}`));

for(const item of section.items){
  assert.ok(Array.isArray(item.guide)&&item.guide.length,`falta guía: ${item.name}`);
  assert.ok(Array.isArray(item.filesToCreate)&&item.filesToCreate.length,`faltan archivos: ${item.name}`);
  if(String(item.code).includes('await ')){
    assert.ok(String(item.code).includes('async function'),`await sin función async en ${item.name}`);
  }
}

assert.ok(loader.includes('api-json-html-js-section.js?v='),'loader no carga la sección JSON + HTML + JavaScript');
assert.ok(
  loader.indexOf('api-json-cheat-sheet.js')<loader.indexOf('api-json-html-js-section.js'),
  'JSON + HTML + JavaScript debe cargarse después de la chuleta JSON'
);
assert.ok(
  loader.indexOf('api-json-html-js-section.js')<loader.indexOf('free-apis-section.js'),
  'JSON + HTML + JavaScript debe cargarse antes de free-apis-section'
);

console.log({
  status:'ok',
  section:section.title,
  practices:section.items.length,
  localJson:true,
  htmlAndJavaScript:true,
  apiPost:true
});
