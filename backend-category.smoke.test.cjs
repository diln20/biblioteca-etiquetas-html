const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const read=file=>fs.readFileSync(file,'utf8');
const files=[
  'fastapi-from-zero-section.js',
  'backend-fastapi-section.js',
  'django-rest-from-zero-section.js',
  'backend-django-rest-section.js',
  'backend-category-guide.js'
];
const loader=read('loader.js');
const index=read('index.html');
const fileUi=read('file-guide-ui.js');

for(const file of files)assert.doesNotThrow(()=>new vm.Script(read(file),{filename:file}),`${file} contiene sintaxis inválida`);
assert.ok(loader.includes('fastapi-from-zero-section.js?v=1'));
assert.ok(loader.includes('django-rest-from-zero-section.js?v=1'));
assert.ok(loader.includes('backend-category-guide.js?v=1'));
assert.ok(loader.includes('file-guide-ui.js?v=2&frameworks=3'));
assert.ok(index.includes('loader.js?v=16&fix=5'));
assert.ok(fileUi.includes('FastAPI|Django REST'));

const context={
  console,
  sections:[],
  T:(tag,name,description,code,preview=code,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta})
};
context.window=context;
context.buildNav=()=>{};
context.render=()=>{};
vm.createContext(context);
for(const file of files)new vm.Script(read(file),{filename:file}).runInContext(context);

const fast=context.sections.filter(section=>section.primaryArea==='FastAPI');
const django=context.sections.filter(section=>section.primaryArea==='Django REST');
assert.ok(fast.length>=2,`se esperaban varias secciones FastAPI y hay ${fast.length}`);
assert.ok(django.length>=5,`se esperaban varias secciones Django REST y hay ${django.length}`);
assert.ok(fast.some(section=>section.title==='Backend FastAPI · 0. Desde cero'));
assert.ok(django.some(section=>section.title==='Django REST · 0. Desde cero'));
assert.ok(context.learningPath.areas.includes('FastAPI'));
assert.ok(context.learningPath.areas.includes('Django REST'));

const fastItems=fast.flatMap(section=>section.items||[]);
const djangoItems=django.flatMap(section=>section.items||[]);
for(const item of [...fastItems,...djangoItems]){
  assert.ok(Array.isArray(item.guide)&&item.guide.length>0,`falta guía en ${item.name}`);
  assert.ok(Array.isArray(item.filesToCreate),`falta filesToCreate en ${item.name}`);
  assert.equal(item.guideTitle,'Dónde se hace cada modificación');
  assert.equal(item.filesToCreateTitle,'Archivos que se crean en esta lección');
}
assert.ok(fastItems.every(item=>item.codeLabel==='Código FastAPI'));
assert.ok(djangoItems.every(item=>item.codeLabel==='Código Django REST'));
assert.ok(fastItems.some(item=>item.guide.some(([,path])=>path==='app/main.py')));
assert.ok(fastItems.some(item=>item.guide.some(([,path])=>String(path).includes('app/schemas/'))));
assert.ok(djangoItems.some(item=>item.guide.some(([,path])=>path==='config/settings.py')));
assert.ok(djangoItems.some(item=>item.guide.some(([,path])=>String(path).endsWith('/serializers.py'))));
assert.ok(djangoItems.some(item=>item.guide.some(([,path])=>path==='config/urls.py')));

const fastHello=fastItems.find(item=>item.name==='Hola API en app/main.py');
assert.ok(fastHello&&String(fastHello.preview).includes('Hola desde FastAPI'));
const djangoHello=djangoItems.find(item=>item.name==='Primer JSON sin modelo');
assert.ok(djangoHello&&String(djangoHello.preview).includes('Hola desde Django REST'));

console.log({
  status:'ok',
  fastApiSections:fast.length,
  djangoRestSections:django.length,
  fastApiItems:fastItems.length,
  djangoRestItems:djangoItems.length,
  separateCategories:true,
  fileGuides:true,
  realResults:true
});
