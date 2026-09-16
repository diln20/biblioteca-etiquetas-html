const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const source=fs.readFileSync('javascript-authenticated-apis-igdb-section.js','utf8');
assert.doesNotThrow(()=>new vm.Script(source,{filename:'javascript-authenticated-apis-igdb-section.js'}));

const T=(tag,name,description,code,preview,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta});
const context={console,sections:[],T};
context.window=context;
vm.createContext(context);
new vm.Script(source,{filename:'javascript-authenticated-apis-igdb-section.js'}).runInContext(context);

const section=context.sections.find(item=>item.title==='JavaScript · 10F. APIs autenticadas con Node.js · IGDB');
assert.ok(section,'falta la sección de APIs autenticadas con IGDB');
assert.ok(section.items.length>=10,'la sección debe tener al menos 10 prácticas');

const text=section.items.map(item=>`${item.name}\n${item.description}\n${item.code}\n${item.tip}`).join('\n');
[
  'node-fetch',
  'Client-ID',
  'Authorization',
  'Bearer',
  'process.env.IGDB_CLIENT_ID',
  'process.env.IGDB_ACCESS_TOKEN',
  'https://api.igdb.com/v4/games',
  'https://id.twitch.tv/oauth2/token',
  'client_credentials',
  'fields',
  'limit',
  'response.ok',
  'response.json()',
  'CORS',
  '429',
  '/api/games'
].forEach(term=>assert.ok(text.includes(term),`falta explicar: ${term}`));

assert.ok(text.includes('node-fetch 3 es ESM'));
assert.ok(text.includes('node-fetch@2'));
assert.ok(text.includes('body no contiene JSON'));
assert.ok(text.includes('No necesitas declarar application/json'));
assert.ok(text.includes('Markdown'));
assert.ok(section.items.every(item=>Array.isArray(item.guide)&&item.guide.length));
assert.ok(section.items.every(item=>Array.isArray(item.filesToCreate)&&item.filesToCreate.length));

const robust=section.items.find(item=>item.name.includes('async/await'));
assert.ok(robust);
assert.ok(robust.code.includes('if (!response.ok)'));
assert.ok(robust.code.includes('await response.text()'));

const security=section.items.find(item=>item.name.includes('backend y no al navegador'));
assert.ok(security);
assert.ok(security.description.includes('credenciales'));

console.log({status:'ok',section:section.title,lessons:section.items.length});
