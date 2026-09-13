const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const read = file => fs.readFileSync(file, 'utf8');
const loader = read('loader.js');
const index = read('index.html');
const order = read('section-order.js');
const courseUi = read('course-ui.js');
const areaUi = read('primary-area-ui.js');
const areaCss = read('primary-area-ui.css');
const fileGuideUi = read('file-guide-ui.js');

const resources = [
  'screen-fit.css?v=2','theme-modern.css?v=6','course-ui-enhancements.css?v=1','primary-area-ui.css?v=2',
  'learning-visuals.js?v=1','course-ux-form-keyboard.js?v=1','course-ux-form-errors.js?v=1','course-ux-form-project.js?v=1',
  'angular-from-zero-section.js?v=1','angular-overview-section.js?v=1','angular-beginner-environment.js?v=1','course-angular-components.js?v=1','course-angular-bindings.js?v=1','angular-beginner-signals.js?v=1','course-angular-forms.js?v=1',
  'course-angular-exercises-01.js?v=1','course-angular-exercises-02.js?v=1','course-angular-exercises-03.js?v=1',
  'course-angular-intermediate-architecture.js?v=1','course-angular-intermediate-data.js?v=1','course-angular-intermediate-reactivity.js?v=1',
  'course-angular-exercises-04.js?v=1','course-angular-exercises-05.js?v=1','course-angular-exercises-06.js?v=1',
  'course-angular-advanced-architecture.js?v=1','course-angular-advanced-performance.js?v=1','course-angular-advanced-quality.js?v=1',
  'course-angular-exercises-07.js?v=1','course-angular-exercises-08.js?v=1','course-angular-exercises-09.js?v=1','angular-category-guide.js?v=1',
  'course-solid-introduction.js?v=1','course-solid-reactivity.js?v=1','course-solid-exercises-01.js?v=1','course-solid-exercises-02.js?v=1',
  'course-backend-scaling-basics.js?v=1','course-backend-scaling-architecture.js?v=1','course-backend-scaling-resilience.js?v=1',
  'exact-explanation-enhancer.js?v=1','section-order.js?v=4','course-ui.js?v=15','file-guide-ui.js?v=1','primary-area-ui.js?v=1'
];
assert.deepEqual(resources.filter(resource => !loader.includes(resource)), []);

// Regresión: el bundle contiene ejemplos con </script> dentro de cadenas.
// El cargador debe localizar el script principal por marcadores de código y
// escapar solo los cierres internos, sin depender del último </script> del HTML.
assert.ok(loader.includes("const sectionMarker=html.indexOf('const sections')"));
assert.ok(loader.includes("const bootMarker='buildNav();saveFavs();resetEditor();render();'"));
assert.ok(loader.includes("const scriptClose=bootEnd>=0?html.indexOf('</script>'"));
assert.ok(loader.includes('const mainScript=bridgedSource.replace('));
assert.ok(loader.includes('No se pudo localizar el script principal del bundle'));
assert.ok(loader.includes('No se pudo localizar el arranque de la biblioteca'));
assert.ok(!loader.includes("const close=html.lastIndexOf('</script>')"));

// Las declaraciones globales const del bundle no son propiedades de window.
// Este puente es indispensable para que las rutas externas puedan ejecutarse
// realmente en el navegador y no solo dentro del contexto de las pruebas VM.
assert.ok(loader.includes('window.sections=sections;'));
assert.ok(loader.includes("if(typeof T==='function')window.T=T;"));
assert.ok(loader.includes("if(typeof createCard==='function')window.createCard=createCard;"));
assert.ok(loader.includes("if(typeof render==='function')window.render=render;"));
assert.ok(loader.includes("if(typeof buildNav==='function')window.buildNav=buildNav;"));
assert.ok(index.includes('loader.js?v=9'));

const expectedAreas = ['HTML','CSS','JavaScript','Git','APIs','Angular','Frameworks','Backend'];
expectedAreas.forEach(area => assert.ok(order.includes(`'${area}'`), `falta el área ${area}`));
assert.ok(order.includes("if(/(?:^| · )Angular(?: ·|$)/i.test(title))return 'Angular'"));
assert.ok(order.includes("if(area==='Angular')"));
assert.ok(order.includes('Number.isFinite(section?.areaOrder)'));
assert.ok(order.includes('if(section?.primaryArea)return section.primaryArea'));
assert.ok(order.includes('sections.sort('));
assert.ok(courseUi.includes('if(section?.group)return section.group'));
assert.ok(areaUi.includes('section.routeAreaPosition=position'));
assert.ok(areaCss.includes('body[data-course="Angular"]'));
assert.ok(areaCss.includes('.nav-item[data-group="Angular"]'));
assert.ok(areaCss.includes('.file-guide'));
assert.ok(fileGuideUi.includes('item.guideTitle'));
assert.ok(fileGuideUi.includes('Dónde colocar cada código'));

const scriptFiles = resources
  .filter(resource => resource.endsWith('.js?v=1'))
  .map(resource => resource.replace('?v=1',''));

for(const file of scriptFiles){
  assert.ok(fs.existsSync(file), `falta ${file}`);
  assert.ok(read(file).trim().length > 0, `${file} está vacío`);
  assert.doesNotThrow(() => new vm.Script(read(file), { filename:file }), `${file} contiene sintaxis inválida`);
}

const courseFiles = scriptFiles.filter(file => !['primary-area-ui.js','file-guide-ui.js'].includes(file));
const context = {
  console,
  sections: [],
  T: (tag,name,description,code,preview=code,attrs=[],meta={}) => ({tag,name,description,code,preview,attrs,...meta})
};
context.window = context;
vm.createContext(context);
for(const file of courseFiles){
  new vm.Script(read(file), { filename:file }).runInContext(context);
}

const titles = context.sections.map(section => section.title);
[
  'Frameworks frontend · Angular · Desde cero',
  'Frameworks frontend · Angular · 0. Cómo funciona',
  'Frameworks frontend · Angular · 3A. Arquitectura intermedia',
  'Frameworks frontend · Angular · 5A. Arquitectura avanzada',
  'UI/UX · Formularios accesibles · 1. Teclado y foco',
  'Frameworks frontend · Solid.js · 1. Introducción',
  'Backend APIs · Escalabilidad · 1. Medir y optimizar'
].forEach(title => assert.ok(titles.includes(title), `falta la sección: ${title}`));

const angularSections = context.sections.filter(section => section.title.includes('Angular'));
assert.ok(angularSections.length >= 10, 'la ruta Angular debe conservar sus secciones propias');
assert.ok(angularSections.every(section => section.group === 'Angular'));
assert.ok(angularSections.every(section => section.primaryArea === 'Angular'));
assert.ok(angularSections.every(section => !String(section.navLabel).startsWith('Angular ·')));

const angularItems = angularSections.flatMap(section => section.items);
assert.ok(angularItems.length > 0);
assert.ok(angularItems.every(item => Array.isArray(item.guide) && item.guide.length > 0));
assert.ok(angularItems.every(item => item.guideTitle === 'Dónde se hace cada modificación'));
assert.ok(angularItems.every(item => item.codeLabel === 'Código Angular'));
assert.ok(angularItems.some(item => item.guide.some(([,path]) => String(path).startsWith('src/app/'))));
assert.ok(angularItems.some(item => item.guide.some(([,path]) => String(path).startsWith('Terminal'))));
assert.ok(angularItems.some(item => item.guide.some(([,path]) => path === 'src/app/app.config.ts')));
assert.ok(angularItems.some(item => item.guide.some(([,path]) => path === 'src/app/app.routes.ts')));
assert.ok(context.AngularCourse?.sections?.length === angularSections.length);

const angularExercises = angularItems.filter(item => item.kind === 'Ejercicio Angular');
assert.equal(angularExercises.length, 18, `se esperaban 18 ejercicios Angular y se encontraron ${angularExercises.length}`);
assert.equal(angularExercises[0].name, 'Hola Mundo');
assert.equal(angularExercises.at(-1).name, 'Proyecto final y CI/CD');
assert.ok(angularItems.some(item => item.code.includes('ng new tienda-angular')));
assert.ok(angularItems.some(item => item.code.includes('provideHttpClient')));
assert.ok(angularItems.some(item => item.code.includes('ng add @angular/ssr')));
assert.ok(angularItems.some(item => item.name === 'Qué hace exactamente ng new'));
assert.ok(angularItems.some(item => item.name === 'Cómo llega un dato desde TypeScript hasta la pantalla'));

const allItems = context.sections.flatMap(section => section.items);
assert.ok(allItems.length > 0);
assert.ok(allItems.every(item => String(item.description).includes('Cómo funciona exactamente:')));
assert.ok(allItems.every(item => String(item.description).includes('Cómo comprobarlo:')));
assert.ok(allItems.filter(item => String(item.preview).includes('data-visual="diagram"')).length >= 20);
assert.ok(allItems.filter(item => String(item.preview).includes('data-visual="folder-tree"')).length >= 3);

const uxItems = context.sections.filter(section => section.title.startsWith('UI/UX · Formularios')).flatMap(section => section.items);
assert.ok(uxItems.some(item => item.code.includes('inputmode="numeric"')));
assert.ok(uxItems.some(item => item.code.includes(':focus-visible')));
assert.ok(uxItems.some(item => item.code.includes('aria-describedby')));

const solidItems = context.sections.filter(section => section.title.includes('Solid.js')).flatMap(section => section.items);
assert.ok(solidItems.some(item => item.code.includes('createSignal')));
assert.ok(solidItems.filter(item => item.kind === 'Ejercicio Solid.js').length >= 6);

const scalingItems = context.sections.filter(section => section.title.includes('Escalabilidad')).flatMap(section => section.items);
assert.ok(scalingItems.some(item => item.name.includes('balanceador')));
assert.ok(scalingItems.some(item => `${item.code} ${item.preview}`.includes('k6 run')));

['primary-area-ui.css','content-corrections.js'].forEach(file => {
  assert.ok(fs.existsSync(file), `falta ${file}`);
  assert.ok(read(file).trim().length > 0, `${file} está vacío`);
});
const django = read('backend-django-rest-section.js');
const correction = read('content-corrections.js');
assert.ok(django.includes('fields = ["id", "nombre", "precio", "stock"]'));
assert.ok(correction.includes('stock = models.PositiveIntegerField(default=0)'));

console.log({
  status:'ok',
  resources:resources.length,
  newSections:context.sections.length,
  angularSections:angularSections.length,
  angularFileGuides:angularItems.length,
  exactExplanations:allItems.length,
  angularExercises:angularExercises.length,
  solidExercises:solidItems.filter(item => item.kind === 'Ejercicio Solid.js').length
});
