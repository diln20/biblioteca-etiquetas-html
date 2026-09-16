const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const read=file=>fs.readFileSync(file,'utf8');
const T=(tag,name,description,code,preview,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta});

for(const file of ['javascript-json-files-section.js','javascript-json-database-section.js']){
  assert.doesNotThrow(()=>new vm.Script(read(file),{filename:file}),`${file} tiene sintaxis inválida`);
}

const sections=[];
const context={console,sections,T};
context.window=context;
vm.createContext(context);

for(const file of ['javascript-json-files-section.js','javascript-json-database-section.js']){
  new vm.Script(read(file),{filename:file}).runInContext(context);
}

const filesSection=sections.find(section=>section.title==='JavaScript · 10D. Archivos JSON');
const dbSection=sections.find(section=>section.title==='JavaScript · 10E. Mini base de datos con JSON');

assert.ok(filesSection,'falta sección de archivos JSON');
assert.ok(dbSection,'falta sección mini base de datos JSON');
assert.equal(filesSection.group,'JavaScript');
assert.equal(dbSection.group,'JavaScript');
assert.ok(filesSection.items.length>=10,'faltan prácticas de archivos JSON');
assert.ok(dbSection.items.length>=10,'faltan prácticas de mini DB JSON');

const filesText=filesSection.items.map(item=>`${item.name}\n${item.description}\n${item.code}`).join('\n');
for(const term of ['datos.json','fetch("./datos.json")','response.json()','Array.isArray','JSON.parse','JSON.stringify','file.text()','Blob','URL.createObjectURL','textContent']){
  assert.ok(filesText.includes(term),`falta archivos JSON: ${term}`);
}

const dbText=dbSection.items.map(item=>`${item.name}\n${item.description}\n${item.code}`).join('\n');
for(const term of ['db.json','fs.readFile','fs.writeFile','GET','POST','PATCH','DELETE','JSON.stringify','JSON.parse','http://localhost:3000/productos','Content-Type']){
  assert.ok(dbText.includes(term),`falta mini DB JSON: ${term}`);
}

assert.doesNotThrow(()=>JSON.parse(filesSection.items[0].code),'el ejemplo JSON inicial no es JSON válido');
assert.doesNotThrow(()=>JSON.parse(dbSection.items[1].code),'db.json inicial no es JSON válido');
assert.doesNotThrow(()=>new vm.Script(dbSection.items[2].code,{filename:'server-example.js'}),'server.js de ejemplo tiene sintaxis inválida');

for(const section of [filesSection,dbSection]){
  for(const item of section.items){
    assert.ok(Array.isArray(item.guide)&&item.guide.length,`${section.title}: ${item.name} sin guía`);
    assert.ok(Array.isArray(item.filesToCreate)&&item.filesToCreate.length,`${section.title}: ${item.name} sin archivos`);
    if(String(item.code).includes('await ')){
      assert.ok(/async\s+(function|\()|async\s+function|async\s*\(/.test(String(item.code)),`${item.name} usa await sin mostrar async`);
    }
  }
}

const loader=read('loader.js');
assert.ok(loader.includes('javascript-json-files-section.js?v='),'loader no carga archivos JSON');
assert.ok(loader.includes('javascript-json-database-section.js?v='),'loader no carga mini DB JSON');
assert.ok(loader.indexOf('javascript-json-files-section.js')<loader.indexOf('javascript-order-finalizer.js'),'archivos JSON debe cargar antes del finalizador JS');
assert.ok(loader.indexOf('javascript-json-database-section.js')<loader.indexOf('javascript-order-finalizer.js'),'mini DB JSON debe cargar antes del finalizador JS');

const order=read('javascript-order-finalizer.js');
assert.ok(order.includes("['JavaScript · 10D. Archivos JSON','Avanzado']"),'falta Archivos JSON en orden JS');
assert.ok(order.includes("['JavaScript · 10E. Mini base de datos con JSON','Avanzado']"),'falta mini DB JSON en orden JS');
assert.ok(order.indexOf('JavaScript · 10D. Archivos JSON')<order.indexOf('JavaScript · 10E. Mini base de datos con JSON'),'el orden JSON es incorrecto');

console.log({
  status:'ok',
  jsonFileLessons:filesSection.items.length,
  jsonDatabaseLessons:dbSection.items.length,
  serverSyntax:true,
  jsonSamples:true
});
