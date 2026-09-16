const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const base=fs.readFileSync('css-div-layout-section.js','utf8');
const enhancer=fs.readFileSync('css-div-center-screen-enhancer.js','utf8');
const loader=fs.readFileSync('loader.js','utf8');

assert.doesNotThrow(()=>new vm.Script(enhancer,{filename:'css-div-center-screen-enhancer.js'}));
assert.ok(loader.includes('css-div-center-screen-enhancer.js?v='));
assert.ok(loader.indexOf('css-div-layout-section.js')<loader.indexOf('css-div-center-screen-enhancer.js'));

const T=(tag,name,description,code,preview,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta});
const context={console,sections:[],T};
context.window=context;
vm.createContext(context);
new vm.Script(base,{filename:'css-div-layout-section.js'}).runInContext(context);
new vm.Script(enhancer,{filename:'css-div-center-screen-enhancer.js'}).runInContext(context);

const section=context.sections.find(item=>item.title==='CSS · Manejo de DIV · Filas y columnas');
assert.ok(section,'falta la sección de manejo de DIV');

const item=section.items.find(item=>String(item.name||'').includes('centro de la pantalla'));
assert.ok(item,'falta el ejemplo para centrar un DIV en toda la pantalla');
assert.ok(item.code.includes('min-height: 100vh'));
assert.ok(item.code.includes('display: flex'));
assert.ok(item.code.includes('justify-content: center'));
assert.ok(item.code.includes('align-items: center'));
assert.ok(item.code.includes('display: grid'));
assert.ok(item.code.includes('place-items: center'));
assert.ok(item.code.includes('transform: translate(-50%, -50%)'));
assert.ok(String(item.preview||'').includes('DIV centrado horizontal y verticalmente'));

console.log({status:'ok',section:section.title,lesson:item.name});
