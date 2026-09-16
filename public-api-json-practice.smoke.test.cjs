const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const source=fs.readFileSync('public-api-json-practice.js','utf8');
assert.doesNotThrow(()=>new vm.Script(source,{filename:'public-api-json-practice.js'}));

const sections=[];
const T=(tag,name,description,code,preview,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta});
const context={console,sections,T,URL,URLSearchParams};
context.window=context;
vm.createContext(context);
new vm.Script(source,{filename:'public-api-json-practice.js'}).runInContext(context);

const section=sections.find(item=>item.title==='APIs · JSON de APIs públicas en práctica');
assert.ok(section,'falta la sección JSON de APIs públicas');
assert.equal(section.primaryArea,'APIs');
assert.ok(section.items.length>=8,'la sección debe incluir al menos 8 prácticas');

const text=section.items.map(item=>`${item.name}\n${item.description}\n${item.code}`).join('\n');
[
  'Open-Meteo',
  'current_units',
  'PokéAPI',
  'json.types.map',
  'json.abilities.map',
  'Rick and Morty',
  'json.results.map',
  'json.info',
  'response.json()',
  'Object.keys',
  'textContent',
  'filter('
].forEach(term=>assert.ok(text.includes(term),`falta contenido: ${term}`));

for(const item of section.items){
  if(String(item.code).includes('await ')){
    assert.ok(/async\s+function|async\s*\(/.test(item.code),`await sin async en: ${item.name}`);
  }
  assert.ok(Array.isArray(item.guide)&&item.guide.length,`falta guía: ${item.name}`);
  assert.ok(Array.isArray(item.filesToCreate)&&item.filesToCreate.length,`faltan archivos: ${item.name}`);
}

const loader=fs.readFileSync('loader.js','utf8');
assert.ok(loader.includes('public-api-json-practice.js?v='),'loader no carga JSON de APIs públicas');

console.log({status:'ok',section:section.title,lessons:section.items.length,apis:['Open-Meteo','PokéAPI','Rick and Morty']});
