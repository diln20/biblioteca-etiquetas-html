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
assert.ok(loader.includes('section-order.js?v=7'));
assert.ok(loader.includes('database-category-guide.js?v=2'));

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

// Reproduce la secuencia que ve el estudiante en la barra lateral.
// Las ampliaciones nuevas no pueden saltar al inicio solo por tener areaOrder.
const orderContext={
  console,
  sections:[
    {title:'Fundamentos web',primaryArea:'HTML',items:[]},
    {title:'Introducción',primaryArea:'HTML',items:[]},
    {title:'Metadatos',primaryArea:'HTML',items:[]},
    {title:'Texto',primaryArea:'HTML',items:[]},
    {title:'Semántica HTML',primaryArea:'HTML',items:[]},
    {title:'Semántica y secciones',primaryArea:'HTML',items:[]},
    {title:'Listas',primaryArea:'HTML',items:[]},
    {title:'Enlaces e imágenes',primaryArea:'HTML',items:[{tag:'<img>'}]},
    {title:'Tablas',primaryArea:'HTML',items:[]},
    {title:'Formularios',primaryArea:'HTML',items:[{tag:'form'}]},
    {title:'Multimedia',primaryArea:'HTML',items:[]},
    {title:'Interactividad',primaryArea:'HTML',items:[]},
    {title:'Citas y datos',primaryArea:'HTML',items:[]},
    {title:'Scripts y plantillas',primaryArea:'HTML',items:[]},
    {title:'HTML · Imágenes · Atributos de img',group:'HTML',primaryArea:'HTML',areaOrder:540,items:[]},
    {title:'HTML · Formularios · Tipos de input',group:'HTML',primaryArea:'HTML',areaOrder:610,items:[]}
  ],
  buildNav(){},
  render(){}
};
orderContext.window=orderContext;
vm.createContext(orderContext);
new vm.Script(read('section-order.js'),{filename:'section-order.js'}).runInContext(orderContext);
let titles=orderContext.sections.map(section=>section.title);
let imageBase=titles.indexOf('Enlaces e imágenes');
let imageAttrs=titles.indexOf('HTML · Imágenes · Atributos de img');
let formsBase=titles.indexOf('Formularios');
let inputTypes=titles.indexOf('HTML · Formularios · Tipos de input');
assert.equal(titles[0],'Fundamentos web','Fundamentos web debe ser el primer tema HTML');
assert.equal(titles[1],'Introducción','Introducción debe seguir a Fundamentos web');
assert.equal(imageAttrs,imageBase+1,'Atributos de img debe ir justo después de Enlaces e imágenes');
assert.equal(inputTypes,formsBase+1,'Tipos de input debe ir justo después de Formularios');
assert.ok(imageAttrs>1,'Atributos de img no debe aparecer al inicio de HTML');
assert.ok(inputTypes>imageAttrs,'Tipos de input debe respetar la progresión previa de HTML');

// La categoría Base de datos se carga después del orden principal y no debe
// volver a mover las ampliaciones de HTML al principio de la ruta.
orderContext.sections.push({
  title:'Base de datos · 0. Desde cero',
  primaryArea:'Base de datos',
  group:'Base de datos',
  areaOrder:0,
  items:[]
});
new vm.Script(read('database-category-guide.js'),{filename:'database-category-guide.js'}).runInContext(orderContext);
titles=orderContext.sections.map(section=>section.title);
imageBase=titles.indexOf('Enlaces e imágenes');
imageAttrs=titles.indexOf('HTML · Imágenes · Atributos de img');
formsBase=titles.indexOf('Formularios');
inputTypes=titles.indexOf('HTML · Formularios · Tipos de input');
assert.equal(titles[0],'Fundamentos web','Base de datos no debe cambiar el primer tema HTML');
assert.equal(imageAttrs,imageBase+1,'Base de datos no debe mover Atributos de img al inicio');
assert.equal(inputTypes,formsBase+1,'Base de datos no debe mover Tipos de input al inicio');

console.log({status:'ok',imageAttributes:9,divLayouts:divSection.items.length,pseudoClasses:12,visualReviews:true,htmlContinuity:true,firstHtml:titles[0]});
