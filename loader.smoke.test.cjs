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
const angularFinalizer = read('angular-category-finalizer.js');
const angularGuideCorrections = read('angular-file-guide-corrections.js');
const angularRequiredFiles = read('angular-required-files.js');

const resources = [
  'screen-fit.css?v=2','theme-modern.css?v=6','course-ui-enhancements.css?v=1','primary-area-ui.css?v=4',
  'learning-visuals.js?v=1','course-ux-form-keyboard.js?v=1','course-ux-form-errors.js?v=1','course-ux-form-project.js?v=1',
  'angular-from-zero-section.js?v=1','angular-overview-section.js?v=1','angular-beginner-environment.js?v=1','course-angular-components.js?v=1','course-angular-bindings.js?v=1','angular-beginner-signals.js?v=1','course-angular-forms.js?v=1',
  'course-angular-exercises-01.js?v=1','course-angular-exercises-02.js?v=1','course-angular-exercises-03.js?v=1',
  'course-angular-intermediate-architecture.js?v=1','course-angular-intermediate-data.js?v=1','course-angular-intermediate-reactivity.js?v=1',
  'course-angular-exercises-04.js?v=1','course-angular-exercises-05.js?v=1','course-angular-exercises-06.js?v=1',
  'course-angular-advanced-architecture.js?v=1','course-angular-advanced-performance.js?v=1','course-angular-advanced-quality.js?v=1',
  'course-angular-exercises-07.js?v=1','course-angular-exercises-08.js?v=1','course-angular-exercises-09.js?v=1','angular-category-guide.js?v=1','angular-category-finalizer.js?v=1','angular-file-guide-corrections.js?v=4','angular-required-files.js?v=1',
  'course-solid-introduction.js?v=1','course-solid-reactivity.js?v=1','course-solid-exercises-01.js?v=1','course-solid-exercises-02.js?v=1',
  'course-backend-scaling-basics.js?v=1','course-backend-scaling-architecture.js?v=1','course-backend-scaling-resilience.js?v=1',
  'exact-explanation-enhancer.js?v=1','section-order.js?v=4','course-ui.js?v=15','file-guide-ui.js?v=2','primary-area-ui.js?v=2'
];
assert.deepEqual(resources.filter(resource => !loader.includes(resource)), []);

// Protege ejemplos con </script> sin cortar el script principal del bundle.
assert.ok(loader.includes("const sectionMarker=html.indexOf('const sections')"));
assert.ok(loader.includes("const bootMarker='buildNav();saveFavs();resetEditor();render();'"));
assert.ok(loader.includes("const scriptClose=bootEnd>=0?html.indexOf('</script>'"));
assert.ok(loader.includes('const mainScript=bridgedSource.replace('));
assert.ok(!loader.includes("const close=html.lastIndexOf('</script>')"));

// Expone los bindings globales léxicos a los scripts externos reales.
assert.ok(loader.includes('window.sections=sections;'));
assert.ok(loader.includes("if(typeof T==='function')window.T=T;"));
assert.ok(loader.includes("if(typeof createCard==='function')window.createCard=createCard;"));
assert.ok(loader.includes("if(typeof render==='function')window.render=render;"));
assert.ok(loader.includes("if(typeof buildNav==='function')window.buildNav=buildNav;"));
assert.ok(index.includes('loader.js?v=16'));

const expectedAreas = ['HTML','CSS','JavaScript','Git','APIs','Angular','Frameworks','Backend'];
expectedAreas.forEach(area => assert.ok(order.includes(`'${area}'`), `falta el área ${area}`));
assert.ok(order.includes("if(/(?:^| · )Angular(?: ·|$)/i.test(title))return 'Angular'"));
assert.ok(order.includes("if(area==='Angular')"));
assert.ok(order.includes('sections.sort('));
assert.ok(courseUi.includes('if(section?.group)return section.group'));
assert.ok(areaUi.includes('section.routeAreaPosition=position'));
assert.ok(areaUi.includes('const navLabelOf='));
assert.ok(areaUi.includes("label=label.replace(/^JavaScript"));
assert.ok(areaUi.includes(".replace(/^\\s*\\d{1,2}[A-Z]?\\.\\s*/i,''"));
assert.ok(areaUi.includes('window.formatCourseNavLabel=navLabelOf'));
assert.ok(areaCss.includes('body[data-course="Angular"]'));
assert.ok(areaCss.includes('.nav-item[data-group="Angular"]'));
assert.ok(areaCss.includes('counter-reset:file-guide-step'));
assert.ok(areaCss.includes('grid-template-areas:"action path" "detail detail"'));
assert.ok(areaCss.includes('.tag-card .file-guide ol>li::before'));
assert.ok(areaCss.includes('inset:13px auto auto 13px'));
assert.ok(areaCss.includes('.file-create-guide'));
assert.ok(areaCss.includes('grid-template-areas:"icon method" "icon path"'));
assert.ok(fileGuideUi.includes('item.guideTitle'));
assert.ok(fileGuideUi.includes('item.filesToCreateTitle'));
assert.ok(fileGuideUi.includes('file-create-guide'));
assert.ok(fileGuideUi.includes('Archivos que se crean en esta lección'));
assert.ok(angularFinalizer.includes('/\\bAngular\\b/i'));
assert.ok(angularFinalizer.includes("section.primaryArea='Angular'"));
assert.ok(angularGuideCorrections.includes('src/app/app.ts'));
assert.ok(angularGuideCorrections.includes('src/app/app.html'));
assert.ok(angularGuideCorrections.includes('componentName}.spec.ts'));
assert.ok(angularGuideCorrections.includes("selector&&selector!=='root'"));
assert.ok(angularGuideCorrections.includes('(?:app-root|root)'));
assert.ok(angularRequiredFiles.includes('item.filesToCreate=files.slice(0,12)'));
assert.ok(angularRequiredFiles.includes("method:'NG NEW'"));
assert.ok(angularRequiredFiles.includes('ng generate component'));

const courseResourceNames = resources.filter(resource =>
  resource.endsWith('.js?v=1') ||
  resource === 'angular-file-guide-corrections.js?v=4' ||
  resource === 'primary-area-ui.js?v=2'
);
const scriptFiles = courseResourceNames.map(resource => resource.replace(/\?v=\d+$/,''));
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
assert.ok(angularSections.length >= 10);
assert.ok(angularSections.every(section => section.group === 'Angular'));
assert.ok(angularSections.every(section => section.primaryArea === 'Angular'));
const angularItems = angularSections.flatMap(section => section.items);
assert.ok(angularItems.every(item => Array.isArray(item.guide) && item.guide.length > 0));
assert.ok(angularItems.every(item => item.guideTitle === 'Dónde se hace cada modificación'));
assert.ok(angularItems.every(item => item.codeLabel === 'Código Angular'));
assert.ok(angularItems.every(item => Array.isArray(item.filesToCreate)));
assert.ok(angularItems.every(item => typeof item.filesToCreateStatus === 'string' && item.filesToCreateStatus.length > 0));
assert.ok(angularItems.filter(item => item.filesToCreate.length > 0).length >= 10);

const componentAnatomy = angularItems.find(item => item.name === 'Anatomía de una pieza visual');
assert.ok(componentAnatomy, 'falta la lección de anatomía de componentes');
const componentPaths = componentAnatomy.guide.map(([,path]) => path);
[
  'src/app/features/products/product-card/product-card.ts',
  'src/app/features/products/product-card/product-card.html',
  'src/app/features/products/product-card/product-card.scss',
  'src/app/features/products/product-card/product-card.spec.ts'
].forEach(path => assert.ok(componentPaths.includes(path), `falta la ruta ${path}`));
const componentCreatePaths = componentAnatomy.filesToCreate.map(entry => entry.path);
[
  'src/app/features/products/product-card/product-card.ts',
  'src/app/features/products/product-card/product-card.html',
  'src/app/features/products/product-card/product-card.scss',
  'src/app/features/products/product-card/product-card.spec.ts'
].forEach(path => assert.ok(componentCreatePaths.includes(path), `falta indicar que se crea ${path}`));
assert.ok(componentAnatomy.filesToCreate.some(entry => entry.method === 'ANGULAR CLI'));
assert.ok(componentAnatomy.filesToCreate.some(entry => String(entry.command).includes('ng generate component')));

const rootExample = angularItems.find(item => item.name === 'Cómo llega un dato desde TypeScript hasta la pantalla');
assert.ok(rootExample.guide.some(([,path]) => path === 'src/app/app.ts'));
assert.ok(!rootExample.guide.some(([,path]) => String(path).includes('/root/root')));
assert.ok(!rootExample.guide.some(([,path]) => String(path).includes('app-root/app-root')));
assert.ok(!rootExample.guide.some(([,path,detail]) => path === 'src/app/app.ts' && String(detail).includes('Importa App')));

const angularExercises = angularItems.filter(item => item.kind === 'Ejercicio Angular');
assert.equal(angularExercises.length, 18);
assert.equal(angularExercises[0].name, 'Hola Mundo');
assert.equal(angularExercises.at(-1).name, 'Proyecto final y CI/CD');
assert.ok(angularItems.some(item => item.code.includes('provideHttpClient')));
assert.ok(angularItems.some(item => item.code.includes('ng add @angular/ssr')));
assert.ok(angularItems.some(item => item.filesToCreate.some(file => file.path.endsWith('.service.ts'))));
assert.ok(angularItems.some(item => item.filesToCreate.some(file => file.path === 'src/app/app.routes.server.ts')));

const allItems = context.sections.flatMap(section => section.items);
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
  angularCreateGuides:angularItems.filter(item => item.filesToCreate.length > 0).length,
  exactExplanations:allItems.length,
  angularExercises:angularExercises.length,
  solidExercises:solidItems.filter(item => item.kind === 'Ejercicio Solid.js').length
});
