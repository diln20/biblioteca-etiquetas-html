const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const read=file=>fs.readFileSync(file,'utf8');
const T=(tag,name,description,code,preview,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta});

for(const file of [
  'javascript-fetch-api-detailed.js',
  'javascript-script-loading-enhancer.js',
  'backend-deployment-platforms-section.js',
  'backend-node-orms-section.js'
]){
  assert.doesNotThrow(()=>new vm.Script(read(file),{filename:file}),`${file} tiene sintaxis inválida`);
}

const sections=[];
const context={console,sections,T};
context.window=context;
vm.createContext(context);
for(const file of ['javascript-fetch-api-detailed.js','backend-deployment-platforms-section.js','backend-node-orms-section.js']){
  new vm.Script(read(file),{filename:file}).runInContext(context);
}

const fetchSection=sections.find(section=>section.title==='JavaScript · 10B. Fetch API a fondo');
assert.ok(fetchSection,'falta Fetch API a fondo');
assert.ok(fetchSection.items.length>=11);
const fetchText=fetchSection.items.map(item=>`${item.name}\n${item.description}\n${item.code}`).join('\n');
['response.ok','response.json()','URLSearchParams','POST','PATCH','DELETE','Authorization','AbortController','Promise.all','Loading'].forEach(term=>assert.ok(fetchText.includes(term),`falta Fetch: ${term}`));
assert.ok(fetchSection.items.every(item=>Array.isArray(item.guide)&&item.guide.length));
assert.ok(fetchSection.items.every(item=>Array.isArray(item.filesToCreate)&&item.filesToCreate.length));

const deploy=sections.find(section=>section.title==='Backend · Despliegue · Railway vs Render vs Fly.io');
assert.ok(deploy,'falta comparativa de despliegue');
assert.ok(deploy.items.length>=10);
const deployText=deploy.items.map(item=>`${item.name}\n${item.description}\n${item.code}`).join('\n');
['Railway','Render','Fly.io','Dockerfile','DATABASE_URL','health','rollback'].forEach(term=>assert.ok(deployText.includes(term),`falta deploy: ${term}`));

const orm=sections.find(section=>section.title==='Backend · ORM Node.js · Prisma vs Sequelize vs Drizzle');
assert.ok(orm,'falta comparativa ORM');
assert.ok(orm.items.length>=13);
const ormText=orm.items.map(item=>`${item.name}\n${item.description}\n${item.code}`).join('\n');
['Prisma','schema.prisma','Sequelize','transaction','Drizzle','drizzle-kit','migraciones','PostgreSQL'].forEach(term=>assert.ok(ormText.includes(term),`falta ORM: ${term}`));
assert.ok(orm.items.every(item=>Array.isArray(item.guide)&&item.guide.length));
assert.ok(orm.items.every(item=>Array.isArray(item.filesToCreate)&&item.filesToCreate.length));

const seedSection={title:'JavaScript · 1A. Sintaxis, entrada y salida',items:[T('script','1. Inline, interno y externo','base','','')]};
const deferContext={console,sections:[seedSection],T};
deferContext.window=deferContext;
vm.createContext(deferContext);
new vm.Script(read('javascript-script-loading-enhancer.js'),{filename:'javascript-script-loading-enhancer.js'}).runInContext(deferContext);
const deferItem=seedSection.items.find(item=>String(item.name).includes('defer vs async'));
assert.ok(deferItem,'falta explicación defer vs async');
const deferText=`${deferItem.description}\n${deferItem.code}`;
['defer','async','type="module"','DOMContentLoaded','descarga en paralelo','conservan el orden'].forEach(term=>assert.ok(deferText.includes(term),`falta defer: ${term}`));
assert.ok(deferItem.filesToCreate.some(file=>file.path==='javascript/carga/index.html'));

const loader=read('loader.js');
[
  'javascript-fetch-api-detailed.js?v=1',
  'javascript-script-loading-enhancer.js?v=1',
  'backend-deployment-platforms-section.js?v=1',
  'backend-node-orms-section.js?v=1'
].forEach(resource=>assert.ok(loader.includes(resource),`loader no carga ${resource}`));
assert.ok(loader.indexOf('javascript-fetch-api-detailed.js?v=1')<loader.indexOf('javascript-order-finalizer.js?v=1'));

console.log({status:'ok',fetchLessons:fetchSection.items.length,deploymentLessons:deploy.items.length,ormLessons:orm.items.length,defer:true});
