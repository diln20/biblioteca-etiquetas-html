const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const read=file=>fs.readFileSync(file,'utf8');
const source=read('cheat-sheets-section.js');
const loader=read('loader.js');

assert.doesNotThrow(()=>new vm.Script(source,{filename:'cheat-sheets-section.js'}));
assert.ok(loader.includes('cheat-sheets-section.js?v=1'),'loader no carga las chuletas');
assert.ok(loader.indexOf('cheat-sheets-section.js?v=1')<loader.indexOf('section-order.js?v=7'),'las chuletas deben cargarse antes del orden final');

const sections=[];
const T=(tag,name,description,code,preview,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta});
const context={console,sections,T};
context.window=context;
vm.createContext(context);
new vm.Script(source,{filename:'cheat-sheets-section.js'}).runInContext(context);

const html=sections.find(section=>section.title==='HTML · Chuleta rápida');
const css=sections.find(section=>section.title==='CSS · Chuleta rápida');
const js=sections.find(section=>section.title==='JavaScript · Chuleta rápida');

assert.ok(html,'falta la chuleta HTML');
assert.ok(css,'falta la chuleta CSS');
assert.ok(js,'falta la chuleta JavaScript');
assert.equal(html.primaryArea,'HTML');
assert.equal(css.primaryArea,'CSS');
assert.equal(js.primaryArea,'JavaScript');
assert.ok(html.items.length>=8,'la chuleta HTML debe cubrir al menos 8 bloques');
assert.ok(css.items.length>=8,'la chuleta CSS debe cubrir al menos 8 bloques');
assert.ok(js.items.length>=8,'la chuleta JavaScript debe cubrir al menos 8 bloques');

const htmlCode=html.items.map(item=>item.code).join('\n');
const cssCode=css.items.map(item=>item.code).join('\n');
const jsCode=js.items.map(item=>item.code).join('\n');

['<!doctype html>','<form','<table','<img','<script src="app.js" defer>'].forEach(term=>assert.ok(htmlCode.includes(term),`HTML: falta ${term}`));
['display: flex','display: grid','@media','box-sizing: border-box','var(--text)',':focus-visible'].forEach(term=>assert.ok(cssCode.includes(term),`CSS: falta ${term}`));
['const ','if (','map(','querySelector','addEventListener','async function','await fetch','localStorage','import { sumar }'].forEach(term=>assert.ok(jsCode.includes(term),`JavaScript: falta ${term}`));

for(const section of [html,css,js]){
  assert.ok(section.navLabel.includes('Chuleta'));
  assert.ok(section.items.every(item=>String(item.description).length>0));
  assert.ok(section.items.every(item=>String(item.code).length>0));
  assert.ok(section.items.every(item=>String(item.preview).length>0));
  assert.ok(section.items.every(item=>Array.isArray(item.guide)&&item.guide.length>0));
  assert.ok(section.items.every(item=>item.codeLabel.includes('Sintaxis rápida')));
}

console.log({
  status:'ok',
  sections:3,
  htmlBlocks:html.items.length,
  cssBlocks:css.items.length,
  javascriptBlocks:js.items.length,
  quickReference:true
});
