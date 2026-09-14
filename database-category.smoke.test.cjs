const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const read=file=>fs.readFileSync(file,'utf8');
const source=read('database-from-zero-section.js');
const guide=read('database-category-guide.js');
const loader=read('loader.js');
const fileUi=read('file-guide-ui.js');

assert.doesNotThrow(()=>new vm.Script(source,{filename:'database-from-zero-section.js'}));
assert.doesNotThrow(()=>new vm.Script(guide,{filename:'database-category-guide.js'}));
assert.ok(loader.includes('database-from-zero-section.js?v=1'));
assert.ok(loader.includes('database-category-guide.js?v=2'));
assert.ok(fileUi.includes('Base de datos'));

const context={
  console,
  sections:[{title:'Backend · referencia',group:'Backend',primaryArea:'Backend',areaOrder:0,items:[]}],
  learningPath:{areas:['HTML','Backend']},
  T:(tag,name,description,code,preview=code,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta}),
  buildNav:()=>{},
  render:()=>{}
};
context.window=context;
vm.createContext(context);
new vm.Script(source).runInContext(context);
new vm.Script(guide).runInContext(context);

const dbSections=context.sections.filter(section=>section.primaryArea==='Base de datos');
assert.ok(dbSections.length>=8,`se esperaban 8 secciones y hay ${dbSections.length}`);
[
  'Base de datos · 0. Desde cero',
  'Base de datos · 1. Oracle desde cero',
  'Base de datos · 2. PostgreSQL desde cero',
  'Base de datos · 3. MongoDB desde cero',
  'Base de datos · 4. Neo4j desde cero',
  'Base de datos · 5. Redis desde cero',
  'Base de datos · 6. Cassandra desde cero',
  'Base de datos · 7. Comparativa y proyecto'
].forEach(title=>assert.ok(dbSections.some(section=>section.title===title),`falta ${title}`));

['Oracle','PostgreSQL','MongoDB','Neo4j','Redis','Cassandra'].forEach(engine=>{
  const section=dbSections.find(item=>item.databaseEngine===engine);
  assert.ok(section,`falta ${engine}`);
  assert.ok(section.items.length>=6,`${engine} debe tener al menos 6 lecciones`);
  assert.ok(section.items.every(item=>item.kind==='Base de datos'));
  assert.ok(section.items.every(item=>Array.isArray(item.guide)&&item.guide.length>0));
  assert.ok(section.items.every(item=>Array.isArray(item.filesToCreate)));
  assert.ok(section.items.every(item=>String(item.codeLabel).includes(engine)));
});

const allCode=dbSections.flatMap(section=>section.items||[]).map(item=>item.code).join('\n');
[
  'CREATE TABLE productos',
  'RETURNING id, nombre',
  'db.productos.insertOne',
  'MATCH (u:Usuario)',
  'SET producto:1',
  'CREATE KEYSPACE tienda'
].forEach(text=>assert.ok(allCode.includes(text),`falta ejemplo ${text}`));

const areas=context.learningPath.areas;
assert.ok(areas.includes('Base de datos'));
assert.ok(areas.indexOf('Base de datos')<areas.indexOf('Backend'),'Base de datos debe aparecer antes de Backend');
assert.ok(dbSections.every(section=>section.group==='Base de datos'));

console.log({status:'ok',category:'Base de datos',sections:dbSections.length,engines:6,fileGuides:true,fromZero:true});
