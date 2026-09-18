const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const source=fs.readFileSync('css-flexbox-card-ui.js','utf8');
const section=fs.readFileSync('css-games-section.js','utf8');
const loader=fs.readFileSync('loader.js','utf8');

assert.doesNotThrow(()=>new vm.Script(source,{filename:'css-flexbox-card-ui.js'}));
assert.ok(source.includes("includes('Flexbox Arena')"),'debe detectar la tarjeta Flexbox Arena');
assert.ok(source.includes("querySelector('.code-panel')"),'debe localizar el panel de código de solo lectura');
assert.ok(source.includes('codePanel?.remove()'),'debe retirar el panel de código estándar');
assert.ok(source.includes("frame.style.height='820px'"),'debe ampliar el área del juego');
assert.ok(section.includes('class="flexbox-arena-frame"'),'la vista debe cargar el juego dentro de Resultado');
assert.ok(section.includes('css-flexbox-game.html?embed=1&inside=library'),'debe usar modo embebido');
assert.ok(section.includes('styles.css del panel Resultado'),'debe explicar dónde editar');
assert.ok(loader.includes('css-flexbox-card-ui.js?v=1'),'loader no carga el ajuste de tarjeta');
assert.ok(!loader.includes('css-flexbox-inline-game.js?v=1'),'no debe cargar el intento inline anterior');
assert.ok(!loader.includes('css-flexbox-inline-game.css?v=1'),'no debe cargar estilos inline anteriores');

console.log({status:'ok',card:'Flexbox Arena',editableInResult:true,fullWidth:true});
