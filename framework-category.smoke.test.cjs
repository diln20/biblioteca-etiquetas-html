const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const read=file=>fs.readFileSync(file,'utf8');
const guide=read('framework-category-guide.js');
const loader=read('loader.js');
const index=read('index.html');
const fileUi=read('file-guide-ui.js');

assert.doesNotThrow(()=>new vm.Script(guide,{filename:'framework-category-guide.js'}));
assert.doesNotThrow(()=>new vm.Script(fileUi,{filename:'file-guide-ui.js'}));
assert.ok(loader.includes('framework-category-guide.js?v=1'));
assert.ok(loader.includes('file-guide-ui.js?v=2&frameworks=3'));
assert.match(index,/loader\.js\?v=\d+&fix=10/);

['React','Vue','Svelte','Solid.js'].forEach(name=>assert.ok(guide.includes(`'${name}'`),`falta la categoría ${name}`));
assert.ok(guide.includes("'HTML','CSS','JavaScript','Git','APIs','Angular','React','Vue','Svelte','Solid.js','Frameworks','Backend'"));
assert.ok(guide.includes("item.guideTitle='Dónde se hace cada modificación'"));
assert.ok(guide.includes("item.filesToCreateTitle='Archivos que se crean en esta lección'"));
assert.ok(guide.includes('item.codeLabel=`Código ${fw}`'));
assert.ok(guide.includes("item.name==='Cómo funciona un clic con signal'"));
assert.ok(guide.includes('Resultado real del componente'));
assert.ok(guide.includes("result(fw,'Contador React'"));
assert.ok(guide.includes("result(fw,'Contador Vue'"));
assert.ok(guide.includes("result(fw,'Contador Svelte'"));
assert.ok(guide.includes("result(fw,'Contador Solid'"));
assert.ok(fileUi.includes('guidedCourse'));
assert.ok(fileUi.includes('React|Vue|Svelte|Solid\\.js'));

console.log({status:'ok',frameworkCategories:4,realResultPreviews:true,fileGuides:true});
