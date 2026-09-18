const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const js=fs.readFileSync('css-flexbox-inline-game.js','utf8');
const css=fs.readFileSync('css-flexbox-inline-game.css','utf8');
const section=fs.readFileSync('css-games-section.js','utf8');
const loader=fs.readFileSync('loader.js','utf8');

assert.doesNotThrow(()=>new vm.Script(js,{filename:'css-flexbox-inline-game.js'}));
assert.ok((js.match(/title:'/g)||[]).length>=12,'faltan niveles inline');
assert.ok(js.includes('MutationObserver'),'debe inicializar cuando la sección se renderiza');
assert.ok(js.includes('getComputedStyle'),'debe comprobar el CSS aplicado');
assert.ok(js.includes("addEventListener('input'"),'el textarea debe actualizar en vivo');
assert.ok(js.includes("event.ctrlKey&&event.key==='Enter'"),'Ctrl+Enter debe comprobar');
assert.ok(css.includes('.flexbox-inline-game'));
assert.ok(css.includes('.fx-inline-editor'));
assert.ok(css.includes('.fx-inline-stage'));
assert.ok(section.includes('data-flexbox-inline-game'),'falta juego directo en la sección');
assert.ok(section.includes('<textarea'),'falta editor editable dentro de la sección');
assert.ok(!section.includes('iframe src="css-flexbox-game.html?embed=1"'),'el juego principal ya no debe depender de iframe');
assert.ok(loader.includes('css-flexbox-inline-game.js?v=1'),'loader no carga la lógica inline');
assert.ok(loader.includes('css-flexbox-inline-game.css?v=1'),'loader no carga estilos inline');

console.log({status:'ok',game:'Flexbox Arena inline',levels:12,editable:true});
