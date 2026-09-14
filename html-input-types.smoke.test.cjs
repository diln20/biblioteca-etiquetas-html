const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const read=file=>fs.readFileSync(file,'utf8');
const source=read('html-input-types-section.js');
const enhancer=read('html-input-attribute-explanations.js');
const loader=read('loader.js');
const index=read('index.html');

assert.doesNotThrow(()=>new vm.Script(source,{filename:'html-input-types-section.js'}));
assert.doesNotThrow(()=>new vm.Script(enhancer,{filename:'html-input-attribute-explanations.js'}));
assert.ok(loader.includes('html-input-types-section.js?v=1'));
assert.ok(loader.includes('html-input-attribute-explanations.js?v=1'));
assert.ok(index.includes('loader.js?v=16&fix=8'));

[
  "for:'En un <label>",
  "id:'Identificador único",
  "name:'Nombre con el que este dato se envía",
  "type:'Define qué clase de control crea <input>",
  "inputmode:'Sugiere qué teclado virtual",
  "pattern:'Expresión regular",
  "minlength:'Cantidad mínima de caracteres",
  "maxlength:'Cantidad máxima de caracteres",
  "required:'Atributo booleano",
  "autocomplete:'Indica al navegador",
  "placeholder:'Muestra una pista temporal"
].forEach(text=>assert.ok(enhancer.includes(text),`falta explicación: ${text}`));
assert.ok(enhancer.includes("first==='[0-9]{4}'"));
assert.ok(enhancer.includes("first==='one-time-code'"));
assert.ok(enhancer.includes('Qué significa cada atributo usado en este código'));
assert.ok(enhancer.includes('Explicar ${count} atributo'));

const context={
  console,
  sections:[],
  T:(tag,name,description,code,preview=code,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta}),
  buildNav:()=>{},
  render:()=>{}
};
context.window=context;
vm.createContext(context);
new vm.Script(source,{filename:'html-input-types-section.js'}).runInContext(context);

const section=context.sections.find(item=>item.title==='HTML · Formularios · Tipos de input');
assert.ok(section,'falta la sección de tipos de input');
assert.equal(section.primaryArea,'HTML');
assert.ok(section.items.length>=10,`se esperaban al menos 10 lecciones y hay ${section.items.length}`);

const code=section.items.map(item=>item.code).join('\n');
[
  'text','search','password','email','tel','url','number','range','date','time','datetime-local','month','week',
  'checkbox','radio','color','file','hidden','submit','reset','button','image'
].forEach(type=>assert.ok(code.includes(`type="${type}"`),`falta input type=${type}`));

assert.ok(code.includes('inputmode="numeric"'));
assert.ok(code.includes('pattern="[0-9]{4}"'));
assert.ok(code.includes('enctype="multipart/form-data"'));
assert.ok(code.includes('autocomplete="email"'));
assert.ok(section.items.every(item=>String(item.preview).length>0));
assert.ok(section.items.some(item=>String(item.preview).includes('type="file"')));
assert.ok(section.items.some(item=>String(item.preview).includes('type="date"')));

console.log({status:'ok',category:'HTML',section:section.title,lessons:section.items.length,inputTypes:22,attributeExplanations:true,realPreviews:true});
