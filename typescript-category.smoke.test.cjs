const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const read=file=>fs.readFileSync(file,'utf8');
const course=read('typescript-course-section.js');
const finalizer=read('typescript-category-finalizer.js');
const loader=read('loader.js');
const css=read('primary-area-ui.css');

assert.doesNotThrow(()=>new vm.Script(course,{filename:'typescript-course-section.js'}));
assert.doesNotThrow(()=>new vm.Script(finalizer,{filename:'typescript-category-finalizer.js'}));
assert.ok(loader.includes('typescript-course-section.js?v=1'));
assert.ok(loader.includes('typescript-category-finalizer.js?v=1'));
assert.ok(loader.indexOf('typescript-course-section.js?v=1')<loader.indexOf('typescript-category-finalizer.js?v=1'));
assert.ok(loader.indexOf('typescript-category-finalizer.js?v=1')<loader.indexOf('primary-area-ui.js?v=2'));
assert.ok(css.includes('body[data-course="TypeScript"]'));
assert.ok(css.includes('.nav-item[data-group="TypeScript"]'));

const context={
  console,
  sections:[
    {title:'JavaScript · referencia',group:'JavaScript',primaryArea:'JavaScript',items:[]},
    {title:'Git · referencia',group:'Git',primaryArea:'Git',items:[]}
  ],
  learningPath:{areas:['HTML','CSS','JavaScript','Git','APIs','Backend']},
  T:(tag,name,description,code,preview=code,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta}),
  buildNav:()=>{},
  render:()=>{}
};
context.window=context;
vm.createContext(context);
new vm.Script(course,{filename:'typescript-course-section.js'}).runInContext(context);
new vm.Script(finalizer,{filename:'typescript-category-finalizer.js'}).runInContext(context);

const sections=context.sections.filter(section=>section.primaryArea==='TypeScript');
assert.equal(sections.length,9,`se esperaban 9 secciones y hay ${sections.length}`);
[
  'TypeScript · 0. Desde cero',
  'TypeScript · 1. Tipos fundamentales',
  'TypeScript · 2. Objetos y funciones',
  'TypeScript · 3. Uniones y narrowing',
  'TypeScript · 4. Clases y orientación a objetos',
  'TypeScript · 5. Genéricos y tipos utilitarios',
  'TypeScript · 6. Módulos, DOM y asincronía',
  'TypeScript · 7. TypeScript avanzado',
  'TypeScript · 8. Proyecto y repaso avanzado'
].forEach(title=>assert.ok(sections.some(section=>section.title===title),`falta ${title}`));

const items=sections.flatMap(section=>section.items||[]);
assert.ok(items.length>=49,`se esperaban al menos 49 lecciones y hay ${items.length}`);
assert.ok(items.every(item=>item.kind==='TypeScript'));
assert.ok(items.every(item=>Array.isArray(item.guide)&&item.guide.length>0));
assert.ok(items.every(item=>item.guideTitle==='Dónde se hace cada modificación'));
assert.ok(items.every(item=>item.codeLabel==='Código TypeScript'));
assert.ok(items.every(item=>Array.isArray(item.filesToCreate)));
assert.ok(items.every(item=>String(item.preview).includes('Resultado ·')));

const corpus=items.map(item=>`${item.code}\n${item.description}\n${item.name}`).join('\n');
[
  '"strict": true',
  'number | string',
  'unknown',
  'never',
  'private saldo',
  'keyof T',
  'Partial<CrearProducto>',
  'extends { id: number }',
  'querySelector<HTMLInputElement>',
  'addEventListener',
  'fetch(',
  'localStorage',
  'infer U',
  'satisfies Config',
  'declare module',
  'crypto.randomUUID()'
].forEach(text=>assert.ok(corpus.includes(text),`falta contenido avanzado: ${text}`));

assert.ok(items.some(item=>item.filesToCreate.some(file=>file.path==='tsconfig.json')));
assert.ok(items.some(item=>item.filesToCreate.some(file=>file.path==='src/types/legacy-lib.d.ts')));
assert.ok(items.some(item=>item.guide.some(([,path])=>path==='index.html')));

const areas=context.learningPath.areas;
const js=areas.indexOf('JavaScript');
const ts=areas.indexOf('TypeScript');
const git=areas.indexOf('Git');
assert.ok(js>=0&&ts===js+1&&git===ts+1,'TypeScript debe quedar entre JavaScript y Git');
assert.ok(sections.every(section=>section.group==='TypeScript'));

console.log({status:'ok',category:'TypeScript',sections:sections.length,lessons:items.length,fromZero:true,advanced:true,fileGuides:true,realResults:true});
