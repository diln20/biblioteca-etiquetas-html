const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const source=fs.readFileSync('css-flexbox-card-ui.js','utf8');
const section=fs.readFileSync('css-games-section.js','utf8');
const loader=fs.readFileSync('loader.js','utf8');

assert.doesNotThrow(()=>new vm.Script(source,{filename:'css-flexbox-card-ui.js'}));
assert.ok(source.includes("item?.kind==='Juego CSS interactivo'"),'debe detectar tarjetas interactivas');
assert.ok(source.includes("item?.kind==='Juego CSS'"),'debe detectar retos guiados');
assert.ok(source.includes("querySelector('.code-panel')"),'debe localizar el panel de código de solo lectura');
assert.ok(source.includes('codePanel?.remove()'),'debe retirar el panel de código estándar');
assert.ok(source.includes("frame.style.height='820px'"),'debe ampliar el área del juego');
assert.ok(section.includes('class="flexbox-arena-frame"'),'la vista debe cargar el juego dentro de Resultado');
assert.ok(section.includes('css-flexbox-game.html?embed=1&inside=library'),'debe usar modo embebido');
assert.ok(section.includes('styles.css del panel Resultado'),'debe explicar dónde editar');
assert.ok(loader.includes('css-flexbox-card-ui.js?v=3'),'loader no carga el ajuste de tarjetas');
assert.ok(!loader.includes('css-flexbox-inline-game.js?v=1'),'no debe cargar el intento inline anterior');
assert.ok(!loader.includes('css-flexbox-inline-game.css?v=1'),'no debe cargar estilos inline anteriores');

assert.ok(section.includes('css-arcade-frame'),'debe incluir juegos de CSS Arcade');
assert.ok(source.includes('css-guided-game-card'),'debe aplicar estilo específico a retos guiados');
assert.ok(source.includes("textContent='HTML + CSS · referencia '"),'debe corregir el rótulo Código HTML');
assert.ok(source.includes("textContent='Vista del reto '"),'debe renombrar Resultado');
assert.ok(source.includes('fixGuidedExercise'),'debe corregir la misión personalizada');
assert.ok(source.includes("gridTemplateColumns='minmax(0,.92fr) minmax(0,1.08fr)'"),'debe equilibrar código y preview');
assert.ok(source.includes("frame.style.height='390px'"),'debe dar altura consistente al preview guiado');
console.log({status:'ok',cards:'CSS interactive + guided games',editableInResult:true,guidedRedesign:true});
