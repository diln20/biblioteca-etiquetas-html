const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const source=fs.readFileSync('css-games-section.js','utf8');
const loader=fs.readFileSync('loader.js','utf8');

assert.doesNotThrow(()=>new vm.Script(source,{filename:'css-games-section.js'}));

const sections=[];
const context={
  console,
  sections,
  T:(tag,name,description,code,preview=code,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta})
};
context.window=context;
vm.createContext(context);
new vm.Script(source,{filename:'css-games-section.js'}).runInContext(context);

const section=sections.find(item=>item.title==='CSS · Juegos y retos prácticos');
assert.ok(section,'falta la sección Juegos CSS');
assert.equal(section.primaryArea,'CSS');
assert.equal(section.navLabel,'Juegos CSS');
assert.ok(section.items.length>=12,'faltan juegos y retos CSS');

const text=section.items.map(item=>[
  item.name,item.description,item.code,item.preview,item.tip,
  ...(item.exerciseTasks||[])
].join('\n')).join('\n');

[
  'selector','box-sizing','display:flex','justify-content','align-items',
  'display:grid','grid-template-columns','position:relative','position:absolute',
  'especificidad',':hover',':focus-visible',':active','@media',
  'var(--','@keyframes','prefers-reduced-motion','Boss final'
].forEach(term=>assert.ok(text.includes(term),`falta practicar ${term}`));

assert.ok(section.items.every(item=>Array.isArray(item.guide)&&item.guide.length>=4));
assert.ok(section.items.every(item=>Array.isArray(item.exerciseTasks)&&item.exerciseTasks.length>=3));
assert.ok(section.items.every(item=>Array.isArray(item.filesToCreate)&&item.filesToCreate.length>=2));
assert.ok(section.items.some(item=>item.name.includes('Flexbox Arena')),'falta Flexbox Arena');
assert.ok(text.includes('data-flexbox-inline-game'),'falta Flexbox Arena directo en la sección');
assert.ok(text.includes('<textarea'),'el juego debe tener un editor CSS editable dentro de la sección');
assert.ok(text.includes('Ctrl + Enter'),'falta atajo de comprobación del editor');
assert.ok(loader.includes('css-games-section.js?v='),'loader no carga Juegos CSS');
assert.ok(loader.includes('css-flexbox-inline-game.js?v=1'),'loader no carga el editor inline');
assert.ok(loader.includes('css-flexbox-inline-game.css?v=1'),'loader no carga los estilos del editor inline');
assert.ok(loader.indexOf('css-games-section.js')<loader.indexOf('section-order.js'),'Juegos CSS debe cargar antes de ordenar secciones');

console.log({status:'ok',section:section.title,games:section.items.length,skills:true});
