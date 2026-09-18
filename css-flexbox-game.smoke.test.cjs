const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const html=fs.readFileSync('css-flexbox-game.html','utf8');
const css=fs.readFileSync('css-flexbox-game.css','utf8');
const js=fs.readFileSync('css-flexbox-game.js','utf8');
const section=fs.readFileSync('css-games-section.js','utf8');

assert.doesNotThrow(()=>new vm.Script(js,{filename:'css-flexbox-game.js'}));
assert.ok(html.includes('Flexbox Arena'));
assert.ok(html.includes('id="cssEditor"'));
assert.ok(html.includes('id="targetArena"'));
assert.ok(html.includes('id="playerArena"'));
assert.ok(html.includes('css-flexbox-game.css?v=3'));
assert.ok(html.includes('css-flexbox-game.js?v=3'));

[
  'justify-content','align-items','flex-direction','flex-wrap','align-content',
  'space-between','space-around','space-evenly','row-reverse','column-reverse','wrap-reverse','gap'
].forEach(term=>assert.ok(js.includes(term),`falta ${term}`));

assert.ok((js.match(/title:'/g)||[]).length >=16,'se esperaban al menos 16 niveles');
assert.ok(js.includes('localStorage'));
assert.ok(js.includes('getComputedStyle'));
assert.ok(js.includes('completed'));
assert.ok(js.includes("URLSearchParams(window.location.search)"));
assert.ok(js.includes("document.body.classList.add('embed-mode')"));
assert.ok(css.includes('.target-arena'));
assert.ok(css.includes('.player-arena'));
assert.ok(css.includes('@media(max-width:900px)'));
assert.ok(css.includes('prefers-reduced-motion'));
assert.ok(css.includes('.embed-mode .topbar'));
assert.ok(css.includes('.embed-mode .game-layout'));
assert.ok(section.includes('css-flexbox-game.html'),'la sección conserva acceso al modo pantalla completa');
assert.ok(section.includes('flexbox-arena-frame'),'la sección debe mostrar Flexbox Arena dentro de Resultado');

assert.ok(js.includes("event.ctrlKey&&event.key==='Enter'"));
assert.ok(js.includes('differences()'));
assert.ok(html.includes('id="resetLevelBtn"'));
console.log({status:'ok',game:'Flexbox Arena',levels:16,liveEditor:true,progress:true,feedback:true});
