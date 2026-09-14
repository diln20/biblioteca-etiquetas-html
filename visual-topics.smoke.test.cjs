const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const read=file=>fs.readFileSync(file,'utf8');
const html=read('html-image-attributes-section.js');
const css=read('css-pseudo-classes-section.js');
const divLayout=read('css-div-layout-section.js');
const loader=read('loader.js');

assert.doesNotThrow(()=>new vm.Script(html,{filename:'html-image-attributes-section.js'}));
assert.doesNotThrow(()=>new vm.Script(css,{filename:'css-pseudo-classes-section.js'}));
assert.doesNotThrow(()=>new vm.Script(divLayout,{filename:'css-div-layout-section.js'}));
assert.ok(loader.includes('html-image-attributes-section.js?v=1'));
assert.ok(loader.includes('css-div-layout-section.js?v=1'));
assert.ok(loader.includes('css-pseudo-classes-section.js?v=1'));

const context={
  console,
  sections:[],
  T:(tag,name,description,code,preview=code,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta})
};
context.window=context;
vm.createContext(context);
new vm.Script(html).runInContext(context);
new vm.Script(divLayout).runInContext(context);
new vm.Script(css).runInContext(context);

const imageSection=context.sections.find(section=>section.title==='HTML · Imágenes · Atributos de img');
assert.ok(imageSection,'falta la sección de atributos de img');
assert.equal(imageSection.primaryArea,'HTML');
assert.ok(imageSection.items.length>=9);
const imageCode=imageSection.items.map(item=>item.code).join('\n');
['src','alt','width','height','loading','decoding','title','srcset','sizes'].forEach(attr=>{
  assert.ok(imageCode.includes(`${attr}=`),`falta el atributo ${attr}`);
});
assert.ok(imageSection.items.some(item=>Array.isArray(item.attrs)&&item.attrs.includes('decoding')));
assert.ok(imageSection.items.some(item=>Array.isArray(item.attrs)&&item.attrs.includes('srcset')));

const divSection=context.sections.find(section=>section.title==='CSS · Manejo de DIV · Filas y columnas');
assert.ok(divSection,'falta la sección de manejo de DIV');
assert.equal(divSection.primaryArea,'CSS');
assert.equal(divSection.areaOrder,25);
assert.ok(divSection.items.length>=14,`se esperaban al menos 14 ejemplos y hay ${divSection.items.length}`);
const divCode=divSection.items.map(item=>item.code).join('\n');
[
  'display: flex','flex-direction: row','flex-direction: column','row-reverse','gap:','justify-content:',
  'align-items:','flex-wrap: wrap','flex: 1','display: grid','repeat(3, 1fr)','auto-fit','minmax(','@media'
].forEach(rule=>assert.ok(divCode.includes(rule),`falta la regla ${rule}`));
assert.ok(divSection.items.every(item=>String(item.preview||'').length>0),'todos los ejemplos de DIV deben tener resultado visual');

const pseudo=context.sections.find(section=>section.title==='CSS · Pseudoclases');
assert.ok(pseudo,'falta la sección de pseudoclases CSS');
assert.equal(pseudo.primaryArea,'CSS');
assert.ok(pseudo.items.length>=12);
const pseudoCode=pseudo.items.map(item=>item.code).join('\n');
[':hover',':active',':focus',':visited',':link',':first-child',':last-child',':nth-child(',':nth-of-type(',':not(',':checked',':disabled'].forEach(selector=>{
  assert.ok(pseudoCode.includes(selector),`falta ${selector}`);
});

console.log({status:'ok',imageAttributes:9,divLayouts:divSection.items.length,pseudoClasses:12,visualReviews:true});
