const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const read=file=>fs.readFileSync(file,'utf8');
const jsBase=read('javascript-section.js');
const cheats=read('cheat-sheets-section.js');
const visual=read('visual-reference-expansion.js');
const loader=read('loader.js');

assert.doesNotThrow(()=>new vm.Script(visual,{filename:'visual-reference-expansion.js'}));

const sections=[];
const context={
  console,
  sections,
  T:(tag,name,description,code,preview=code,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta}),
  buildNav:()=>{},
  render:()=>{}
};
context.window=context;
vm.createContext(context);

new vm.Script(jsBase,{filename:'javascript-section.js'}).runInContext(context);
new vm.Script(cheats,{filename:'cheat-sheets-section.js'}).runInContext(context);
new vm.Script(visual,{filename:'visual-reference-expansion.js'}).runInContext(context);

const arrays=sections.find(section=>section.title==='JavaScript · 8. Métodos de arreglos');
assert.ok(arrays,'falta la sección de métodos de arreglos');
const visualArrays=arrays.items.filter(item=>item.visualArrayMethod);
assert.equal(visualArrays.length,8,'deben existir 8 métodos visualizados');
const arrayText=visualArrays.map(item=>`${item.name}\n${item.description}\n${item.code}\n${item.preview}`).join('\n');
[
  '.map(','.filter(','.push(','.unshift(','.pop()', '.shift()', '.join(','.concat(',
  'MUTA el original','NO muta','la nueva longitud','el elemento eliminado','un string','un arreglo nuevo'
].forEach(term=>assert.ok(arrayText.includes(term),`falta arrays visual: ${term}`));
assert.ok(visualArrays.every(item=>String(item.preview).includes('Array Methods Visualized')));

const complete=sections.find(section=>section.title==='CSS · Chuleta completa · 26 conceptos');
assert.ok(complete,'falta la chuleta CSS completa');
assert.equal(complete.primaryArea,'CSS');
assert.equal(complete.items.length,26,'la chuleta CSS debe tener 26 conceptos');
const cssText=complete.items.map(item=>`${item.name}\n${item.description}\n${item.code}`).join('\n');
[
  'Sintaxis CSS','Selectores','Colores','Texto','Fuentes','Unidades','Box model','Tamaños','Display',
  'Flexbox','Grid','Position','Fondos','Bordes','Efectos','Imágenes','Pseudoclases','Pseudoelementos',
  'Transiciones','Transformaciones','Animaciones','Variables CSS','Funciones CSS','Responsive design',
  'Reset básico','Especificidad','display: flex','display: grid','@media','clamp(','box-sizing: border-box'
].forEach(term=>assert.ok(cssText.includes(term),`falta CSS completo: ${term}`));
assert.ok(complete.items.every(item=>String(item.preview).includes('CSS Cheat Sheet')));

const display=sections.find(section=>section.title==='CSS · display visual · 6 comportamientos');
assert.ok(display,'falta la referencia visual de display');
assert.equal(display.primaryArea,'CSS');
assert.equal(display.items.length,6);
const displayText=display.items.map(item=>`${item.name}\n${item.description}\n${item.code}\n${item.preview}`).join('\n');
['display: block','display: inline','display: inline-block','display: flex','display: grid','display: none'].forEach(term=>{
  assert.ok(displayText.includes(term),`falta display: ${term}`);
});
assert.ok(displayText.includes('visibility:hidden'));

assert.ok(loader.includes('visual-reference-expansion.js?v=1'),'loader no carga las referencias visuales');
assert.ok(loader.indexOf('cheat-sheets-section.js?v=1')<loader.indexOf('visual-reference-expansion.js?v=1'));
assert.ok(loader.indexOf('visual-reference-expansion.js?v=1')<loader.indexOf('section-order.js?v=7'));

console.log({
  status:'ok',
  arrayMethodsVisualized:visualArrays.length,
  cssCheatConcepts:complete.items.length,
  displayBehaviors:display.items.length
});