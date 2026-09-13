const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const read=file=>fs.readFileSync(file,'utf8');
const fromZero=read('django-framework-from-zero-section.js');
const legacy=read('django-html-css-section.js');
const guide=read('django-framework-category-guide.js');
const loader=read('loader.js');
const fileGuide=read('file-guide-ui.js');
const css=read('course-ui-enhancements.css');
const index=read('index.html');

assert.doesNotThrow(()=>new vm.Script(fromZero,{filename:'django-framework-from-zero-section.js'}));
assert.doesNotThrow(()=>new vm.Script(legacy,{filename:'django-html-css-section.js'}));
assert.doesNotThrow(()=>new vm.Script(guide,{filename:'django-framework-category-guide.js'}));
assert.ok(loader.includes('django-framework-from-zero-section.js?v=1'));
assert.ok(loader.includes('django-framework-category-guide.js?v=1'));
assert.ok(loader.includes('file-guide-ui.js?v=2&frameworks=3'));
assert.ok(index.includes('loader.js?v=16&fix=5'));
assert.ok(fileGuide.includes('Django Framework'));
assert.ok(css.includes('body[data-course="Django Framework"]'));
assert.ok(css.includes('.nav-item[data-group="Django Framework"]'));
assert.ok(guide.includes("'Django Framework','FastAPI','Django REST'"));

const context={
  console,
  sections:[],
  T:(tag,name,description,code,preview=code,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta})
};
context.window=context;
vm.createContext(context);
new vm.Script(fromZero).runInContext(context);
new vm.Script(legacy).runInContext(context);
new vm.Script(guide).runInContext(context);

const djangoSections=context.sections.filter(section=>section.primaryArea==='Django Framework');
assert.ok(djangoSections.length>=5,`se esperaban varias secciones Django Framework y hay ${djangoSections.length}`);
assert.ok(djangoSections.some(section=>section.title==='Django Framework · 0. Desde cero'));
assert.ok(djangoSections.some(section=>section.title.includes('Views y templates')));
assert.ok(djangoSections.every(section=>section.group==='Django Framework'));
assert.ok(djangoSections.every(section=>!section.title.startsWith('Django + HTML/CSS')));

const items=djangoSections.flatMap(section=>section.items||[]);
assert.ok(items.length>=15);
assert.ok(items.every(item=>item.codeLabel==='Código Django Framework'));
assert.ok(items.every(item=>item.guideTitle==='Dónde se hace cada modificación'));
assert.ok(items.every(item=>item.filesToCreateTitle==='Archivos que se crean en esta lección'));
assert.ok(items.some(item=>item.guide.some(entry=>entry[1]==='config/urls.py')));
assert.ok(items.some(item=>item.guide.some(entry=>String(entry[1]).includes('/views.py'))));
assert.ok(items.some(item=>item.guide.some(entry=>String(entry[1]).includes('/templates/'))));
assert.ok(items.some(item=>item.guide.some(entry=>String(entry[1]).includes('/static/'))));
assert.ok(items.some(item=>item.filesToCreate.some(file=>file.path==='inicio/urls.py')));
assert.ok(items.some(item=>item.filesToCreate.some(file=>String(file.path).includes('base.html'))));
assert.ok(items.some(item=>String(item.preview).includes('Hola Mundo con Django')));

console.log({status:'ok',category:'Django Framework',sections:djangoSections.length,items:items.length,fileGuides:true,realPreviews:true});
