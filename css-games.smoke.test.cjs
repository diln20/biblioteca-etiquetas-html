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
new vm.Script(fs.readFileSync('css-guided-challenges.js','utf8')).runInContext(context);
new vm.Script(source,{filename:'css-games-section.js'}).runInContext(context);

const section=sections.find(item=>item.title==='CSS · Juegos y retos prácticos');
assert.ok(section,'falta la sección Juegos CSS');
assert.equal(section.primaryArea,'CSS');
assert.equal(section.navLabel,'Juegos CSS');
assert.ok(section.items.length>=24,'faltan juegos y retos CSS');

const text=section.items.map(item=>[
  item.name,item.description,item.code,item.preview,item.tip,
  ...(item.exerciseTasks||[])
].join('\n')).join('\n');

[
  'selector','box-sizing','display:flex','justify-content','align-items',
  'display:grid','grid-template-columns','position:relative','position:absolute',
  'especificidad',':hover',':focus-visible',':active','@media',
  'var(--','@keyframes','prefers-reduced-motion','Proyecto final guiado'
].forEach(term=>assert.ok(text.includes(term),`falta practicar ${term}`));

assert.ok(section.items.every(item=>Array.isArray(item.guide)&&item.guide.length>=4));
assert.ok(section.items.every(item=>Array.isArray(item.exerciseTasks)&&item.exerciseTasks.length>=3));
assert.ok(section.items.every(item=>Array.isArray(item.filesToCreate)&&item.filesToCreate.length>=2));
assert.ok(section.items.some(item=>item.name.includes('Flexbox Arena')),'falta Flexbox Arena');
assert.ok(text.includes('flexbox-arena-frame'),'falta Flexbox Arena dentro del panel Resultado');
assert.ok(text.includes('css-flexbox-game.html?embed=1&inside=library'),'el Resultado debe cargar el juego editable');
assert.ok(text.includes('styles.css del panel Resultado'),'falta indicar dónde se edita');
assert.ok(section.items.filter(item=>item.kind==='Juego CSS interactivo').length>=7,'deben existir al menos 7 juegos interactivos');
['Grid Forge','Selector Hunt','Box Model Lab','DIV Lab','Position Rescue','Responsive Racer'].forEach(name=>assert.ok(text.includes(name),'falta '+name));
['game=grid','game=selectors','game=box','game=divs','game=position','game=responsive'].forEach(key=>assert.ok(text.includes(key),'falta ruta '+key));
['DIV 1 · Centrar un DIV','DIV 2 · Tres DIVs','DIV 3 · Sidebar','DIV 4 · DIV dentro','DIV 5 · Superponer','DIV 6 · Galería'].forEach(name=>assert.ok(text.includes(name),'falta ejercicio '+name));
assert.ok(section.description.includes('76 niveles interactivos'),'falta total actualizado de niveles');
assert.ok(!source.includes('const flexboxInlineGame'),'debe eliminarse el prototipo obsoleto de Flexbox de 12 niveles');
assert.ok(section.items.filter(item=>item.guidedChallenge).every(item=>item.exerciseTasks.length>=4),'los retos guiados deben tener varias variaciones');
assert.ok(section.items.filter(item=>item.guidedChallenge).every(item=>item.codeLabel==='HTML + CSS · solución'),'los retos guiados deben rotular correctamente HTML + CSS');
assert.ok(section.items.filter(item=>item.guidedChallenge).every(item=>item.gameDescription===item.description),'deben conservar una descripción breve original antes de los enhancers');
assert.ok(section.items.filter(item=>item.guidedChallenge).every(item=>String(item.preview).includes('game=guided&level=')),'los previews deben usar un escenario visual consistente');
assert.ok(section.items.filter(item=>item.guidedChallenge).every(item=>String(item.code).includes('/* styles.css */')),'debe separar HTML y CSS en el bloque de referencia');
assert.ok(section.items.find(item=>item.name.includes('Cambia el tema'))?.code.includes('\n  background:'),'el CSS guiado debe mostrarse formateado en varias líneas');
assert.ok(text.includes('Reto guiado 7 · Botón con estados'),'debe renombrarse el nivel estático como reto guiado');
assert.ok(text.includes('Reto guiado 10 · Animación sin marear'),'debe existir el reto guiado de animación');
assert.ok(text.includes('Proyecto final guiado · HUD responsive'),'el boss estático debe identificarse como proyecto final guiado');
assert.ok(loader.includes('css-games-section.js?v=15'),'loader no carga la revisión actual de Juegos CSS');
assert.ok(loader.includes('css-flexbox-card-ui.js?v=6'),'loader no carga el ajuste de juegos interactivos');
assert.ok(loader.indexOf('css-games-section.js')<loader.indexOf('section-order.js'),'Juegos CSS debe cargar antes de ordenar secciones');

console.log({status:'ok',section:section.title,games:section.items.length,skills:true});
