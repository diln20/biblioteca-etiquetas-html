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
['response.ok','response.json()','URLSearchParams','POST','PUT','PATCH','DELETE','Authorization','AbortController','Promise.all','Loading'].forEach(term=>assert.ok(fetchText.includes(term),`falta Fetch: ${term}`));
assert.ok(fetchSection.items.every(item=>Array.isArray(item.guide)&&item.guide.length));
assert.ok(fetchSection.items.every(item=>Array.isArray(item.filesToCreate)&&item.filesToCreate.length));

for(const item of fetchSection.items){
  const code=String(item.code||'');
  if(code.includes('await ')){
    assert.ok(code.includes('async function'),`${item.name}: usa await sin mostrar una función async`);
  }
}

const getLesson=fetchSection.items.find(item=>String(item.name).startsWith('4.'));
assert.ok(getLesson.code.includes('url.searchParams.set("userId", "1")'));
assert.ok(!getLesson.code.includes('_limit'),'GET no debe depender de _limit para esta práctica');
assert.ok(getLesson.code.includes('posts.slice(0, 5)'));

const postLesson=fetchSection.items.find(item=>String(item.name).startsWith('5.'));
assert.ok(postLesson.code.includes('method: "POST"'));
assert.ok(postLesson.code.includes('JSON.stringify'));
assert.ok(postLesson.description.includes('no lo guarda realmente'));

const methodsLesson=fetchSection.items.find(item=>String(item.name).startsWith('6.'));
for(const method of ['method: "PUT"','method: "PATCH"','method: "DELETE"']){
  assert.ok(methodsLesson.code.includes(method),`falta ${method}`);
}
assert.ok(methodsLesson.code.includes('/posts/1'));
assert.ok(methodsLesson.code.includes('deleteResponse.text()'));

const authLesson=fetchSection.items.find(item=>String(item.name).startsWith('7.'));
assert.ok(authLesson.code.includes('https://httpbin.org/bearer'));
assert.ok(authLesson.code.includes('Bearer ${tokenDePractica}'));
assert.ok(authLesson.description.includes('deliberadamente falso'));

const uiLesson=fetchSection.items.find(item=>String(item.name).startsWith('8.'));
assert.ok(uiLesson.code.includes('id="output"'));
assert.ok(uiLesson.code.includes('aria-live="polite"'));
assert.ok(uiLesson.code.includes('replaceChildren'));

const abortLesson=fetchSection.items.find(item=>String(item.name).startsWith('9.'));
assert.ok(abortLesson.code.includes('https://httpbin.org/delay/5'));
assert.ok(abortLesson.code.includes('new AbortController()'));
assert.ok(abortLesson.code.includes('activeController.abort()'));
assert.ok(abortLesson.code.includes('AbortError'));
assert.ok(abortLesson.code.includes('id="start"'));
assert.ok(abortLesson.code.includes('id="cancel"'));

const parallelLesson=fetchSection.items.find(item=>String(item.name).startsWith('10.'));
assert.ok(parallelLesson.code.includes('Promise.all'));
assert.ok(!parallelLesson.code.includes('_limit'));

const projectLesson=fetchSection.items.find(item=>String(item.name).startsWith('11.'));
for(const expected of [
  '<!DOCTYPE html>',
  'styles.css',
  'id="load"',
  'id="cancel"',
  'id="retry"',
  'async function loadUsers',
  'async function renderUsers',
  'new AbortController()',
  'retryButton.hidden = false',
  'usersContainer.append(article)'
]){
  assert.ok(projectLesson.code.includes(expected),`proyecto Fetch incompleto: ${expected}`);
}

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
const requiredLoaderResources=[
  'javascript-fetch-api-detailed.js',
  'javascript-script-loading-enhancer.js',
  'backend-deployment-platforms-section.js',
  'backend-node-orms-section.js'
];
for(const resource of requiredLoaderResources){
  assert.ok(loader.includes(`${resource}?v=`),`loader no carga ${resource} con versión de cache`);
}
assert.ok(
  loader.indexOf('javascript-fetch-api-detailed.js')<loader.indexOf('javascript-order-finalizer.js'),
  'Fetch API debe cargarse antes del finalizador de orden de JavaScript'
);

console.log({
  status:'ok',
  fetchLessons:fetchSection.items.length,
  fetchAwaitGuard:true,
  fetchMethods:true,
  fetchAuthorizationDemo:true,
  fetchAbortDemo:true,
  fetchProjectComplete:true,
  deploymentLessons:deploy.items.length,
  ormLessons:orm.items.length,
  defer:true
});
