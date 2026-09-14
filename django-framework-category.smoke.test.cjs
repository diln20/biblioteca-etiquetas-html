const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const read=file=>fs.readFileSync(file,'utf8');
const files=[
  'django-framework-from-zero-section.js',
  'django-framework-html-detailed.js',
  'django-framework-css-detailed.js',
  'django-framework-js-detailed.js',
  'django-framework-forms-detailed.js',
  'django-framework-project-detailed.js',
  'django-html-css-section.js',
  'django-framework-category-guide.js',
  'django-framework-js-guide.js'
];
const loader=read('loader.js');
const fileGuide=read('file-guide-ui.js');
const css=read('course-ui-enhancements.css');
const index=read('index.html');

for(const file of files){
  assert.doesNotThrow(()=>new vm.Script(read(file),{filename:file}),`${file} contiene sintaxis inválida`);
}
[
  'django-framework-from-zero-section.js?v=1',
  'django-framework-html-detailed.js?v=1',
  'django-framework-css-detailed.js?v=1',
  'django-framework-js-detailed.js?v=1',
  'django-framework-forms-detailed.js?v=1',
  'django-framework-project-detailed.js?v=1',
  'django-framework-category-guide.js?v=1',
  'django-framework-js-guide.js?v=1'
].forEach(resource=>assert.ok(loader.includes(resource),`falta cargar ${resource}`));
assert.ok(loader.includes('file-guide-ui.js?v=2&frameworks=3'));
assert.ok(index.includes('loader.js?v=17&fix=9'));
assert.ok(fileGuide.includes('Django Framework'));
assert.ok(css.includes('body[data-course="Django Framework"]'));
assert.ok(css.includes('.nav-item[data-group="Django Framework"]'));

const context={
  console,
  sections:[],
  T:(tag,name,description,code,preview=code,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta}),
  buildNav:()=>{},
  render:()=>{}
};
context.window=context;
vm.createContext(context);
for(const file of files)new vm.Script(read(file),{filename:file}).runInContext(context);

const djangoSections=context.sections.filter(section=>section.primaryArea==='Django Framework');
assert.ok(djangoSections.length>=10,`se esperaban al menos 10 secciones Django Framework y hay ${djangoSections.length}`);
[
  'Django Framework · 0. Desde cero',
  'Django Framework · HTML y templates a fondo',
  'Django Framework · CSS y diseño responsive',
  'Django Framework · JavaScript e interacción',
  'Django Framework · Formularios completos',
  'Django Framework · Proyecto integrador HTML CSS JavaScript'
].forEach(title=>assert.ok(djangoSections.some(section=>section.title===title),`falta ${title}`));
assert.ok(djangoSections.some(section=>section.title.includes('Views y templates')));
assert.ok(djangoSections.every(section=>section.group==='Django Framework'));
assert.ok(djangoSections.every(section=>!section.title.startsWith('Django + HTML/CSS')));

const items=djangoSections.flatMap(section=>section.items||[]);
assert.ok(items.length>=40,`se esperaban al menos 40 lecciones y hay ${items.length}`);
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

const jsItems=djangoSections.filter(section=>section.title.includes('JavaScript')||section.title.includes('Proyecto integrador')||section.title.includes('Formularios')).flatMap(section=>section.items||[]);
assert.ok(jsItems.some(item=>item.code.includes('addEventListener')));
assert.ok(jsItems.some(item=>item.code.includes('json_script')));
assert.ok(jsItems.some(item=>item.code.includes('localStorage')));
assert.ok(jsItems.some(item=>item.code.includes('fetch(')));
assert.ok(jsItems.some(item=>item.guide.some(entry=>String(entry[1]).endsWith('/js/main.js'))));
assert.ok(jsItems.some(item=>item.filesToCreate.some(file=>String(file.path).endsWith('/js/main.js'))));

const htmlSection=djangoSections.find(section=>section.title==='Django Framework · HTML y templates a fondo');
assert.ok(htmlSection.items.some(item=>item.code.includes('{% extends')));
assert.ok(htmlSection.items.some(item=>item.code.includes('{% url')));
const cssSection=djangoSections.find(section=>section.title==='Django Framework · CSS y diseño responsive');
assert.ok(cssSection.items.some(item=>item.code.includes('grid-template-columns')));
assert.ok(cssSection.items.some(item=>item.code.includes('@media')));
const formsSection=djangoSections.find(section=>section.title==='Django Framework · Formularios completos');
assert.ok(formsSection.items.some(item=>item.code.includes('csrf_token')));
assert.ok(formsSection.items.some(item=>item.code.includes('cleaned_data')));

console.log({
  status:'ok',
  category:'Django Framework',
  sections:djangoSections.length,
  items:items.length,
  htmlDetailed:true,
  cssDetailed:true,
  javascriptDetailed:true,
  formsDetailed:true,
  projectDetailed:true,
  fileGuides:true
});
