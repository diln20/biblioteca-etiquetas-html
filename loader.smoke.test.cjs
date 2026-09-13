const assert = require('node:assert/strict');
const fs = require('node:fs');

const read = file => fs.readFileSync(file, 'utf8');
const loader = read('loader.js');
const order = read('section-order.js');
const courseUi = read('course-ui.js');
const areaUi = read('primary-area-ui.js');

const resources = [
  'screen-fit.css?v=2',
  'theme-modern.css?v=6',
  'course-ui-enhancements.css?v=1',
  'primary-area-ui.css?v=1',
  'section-order.js?v=2',
  'course-ui.js?v=15',
  'primary-area-ui.js?v=1',
];
assert.deepEqual(resources.filter(resource => !loader.includes(resource)), []);

const expectedAreas = ['HTML', 'CSS', 'JavaScript', 'Git', 'APIs', 'Frameworks', 'Backend'];
expectedAreas.forEach(area => assert.ok(order.includes(`'${area}'`), `falta el área ${area}`));
assert.ok(order.includes("section.group=section.primaryArea"));
assert.ok(order.includes('sections.sort('));
assert.ok(order.includes('section.routeOrder=index+1'));
assert.ok(order.includes("title.startsWith('HTML + JavaScript')"));
assert.ok(order.includes("title.startsWith('HTML + CSS + JavaScript')"));
assert.ok(order.includes("title.startsWith('Frameworks CSS')"));
assert.ok(order.includes("title==='Manejo del DOM'"));
assert.ok(order.includes("title.startsWith('Django REST')"));

assert.ok(courseUi.includes('if(section?.group)return section.group'));
assert.ok(areaUi.includes("label.textContent=`${String(meta.order).padStart(2,'0')} · ${group} · ${meta.total} temas`"));
assert.ok(areaUi.includes("text.textContent=`${String(section.routeAreaPosition||index+1).padStart(2,'0')}."));
assert.ok(areaUi.includes('RUTA ${meta.order}/${areas.length}'));

['primary-area-ui.css', 'content-corrections.js'].forEach(file => {
  assert.ok(fs.existsSync(file), `falta ${file}`);
  assert.ok(read(file).trim().length > 0, `${file} está vacío`);
});

const django = read('backend-django-rest-section.js');
const correction = read('content-corrections.js');
assert.ok(django.includes('fields = ["id", "nombre", "precio", "stock"]'));
assert.ok(correction.includes('stock = models.PositiveIntegerField(default=0)'));

console.log({ status: 'ok', areas: expectedAreas, resources: resources.length });
