const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const source=fs.readFileSync('javascript-browser-apis-no-node-section.js','utf8');
assert.doesNotThrow(()=>new vm.Script(source,{filename:'javascript-browser-apis-no-node-section.js'}));

const T=(tag,name,description,code,preview,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta});
const context={console,sections:[],T};
context.window=context;
vm.createContext(context);
new vm.Script(source,{filename:'javascript-browser-apis-no-node-section.js'}).runInContext(context);

const section=context.sections.find(item=>item.title==='JavaScript · 10G. APIs desde el navegador · sin Node.js');
assert.ok(section,'falta la sección de APIs sin Node.js');
assert.ok(section.items.length>=10,'la sección debe tener al menos 10 prácticas');

const text=section.items.map(item=>`${item.name}\n${item.description}\n${item.code}\n${item.tip}`).join('\n');
[
  'fetch()',
  'response.json()',
  'response.ok',
  'URLSearchParams',
  'Content-Type',
  'JSON.stringify',
  'CORS',
  'PokéAPI',
  'Open-Meteo',
  'IGDB',
  'Client Secret',
  'publishable',
  '/api/games',
  'mode: "no-cors"'
].forEach(term=>assert.ok(text.includes(term),`falta explicar: ${term}`));

assert.ok(text.includes('no necesitas require("node-fetch")'));
assert.ok(text.includes('No de forma correcta directamente desde app.js'));
assert.ok(text.includes('PHP, Python, Java, .NET'));
assert.ok(text.includes('cualquier valor escrito en app.js puede verse en DevTools'));
assert.ok(section.items.every(item=>Array.isArray(item.guide)&&item.guide.length));
assert.ok(section.items.every(item=>Array.isArray(item.filesToCreate)&&item.filesToCreate.length));

const project=section.items.find(item=>item.name.includes('Mini proyecto'));
assert.ok(project);
assert.ok(project.code.includes('https://pokeapi.co/api/v2/pokemon/'));
assert.ok(project.code.includes('addEventListener("submit"'));
assert.ok(project.code.includes('createElement("img")'));

console.log({status:'ok',section:section.title,lessons:section.items.length});
