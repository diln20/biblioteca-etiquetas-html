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
assert.ok(html.includes('css-flexbox-game.css?v=2'));
assert.ok(html.includes('css-flexbox-game.js?v=2'));

[
  'justify-content','align-items','flex-direction','flex-wrap','align-content',
  'space-between','space-around','row-reverse','column-reverse'
].forEach(term=>assert.ok(js.includes(term),`falta ${term}`));

assert.ok((js.match(/title:'/g)||[]).length>=12,'se esperaban al menos 12 niveles');
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
assert.ok(section.includes('css-flexbox-game.html?embed=1'),'la sección debe incrustar Flexbox Arena');
assert.ok(section.includes('<iframe'),'Flexbox Arena debe poder jugarse dentro de la sección');

console.log({status:'ok',game:'Flexbox Arena',levels:12,liveEditor:true,progress:true});
