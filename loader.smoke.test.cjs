const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const evaluate = file => (0, eval)(fs.readFileSync(file, 'utf8'));

global.window = global;
let written = '';
global.document = {
  open() {},
  write(value) { written = value; },
  close() {},
  body: { innerHTML: '', dataset: {} },
};

for (let part = 1; part <= 5; part++) evaluate(`payload-${part}.js`);
evaluate('loader.js');

setTimeout(() => {
  try {
    assert.ok(written, 'loader.js no escribió el documento reconstruido');
    assert.ok(window.__HTML5_BUNDLE?.length > 0, 'el bundle HTML está vacío');

    const scriptStart = written.indexOf('<script>') + 8;
    const scriptEnd = written.indexOf('</script>', scriptStart);
    assert.ok(scriptStart >= 8 && scriptEnd > scriptStart, 'no se encontró el script principal');
    assert.doesNotThrow(
      () => new vm.Script(written.slice(scriptStart, scriptEnd), { filename: 'bundle.js' }),
      'el JavaScript principal contiene un error de sintaxis'
    );

    const openingScripts = (written.match(/<script(?:\s[^>]*)?>/g) || []).length;
    const closingScripts = (written.match(/<\/script>/g) || []).length;
    const escapedClosingScripts = (written.match(/<\\\/script>/g) || []).length;
    const scriptBalance = openingScripts - (closingScripts + escapedClosingScripts);
    assert.ok(
      scriptBalance >= 0 && scriptBalance <= 1,
      `la cantidad de aperturas y cierres de script difiere en ${scriptBalance}`
    );

    const expectedResources = [
      'screen-fit.css?v=2',
      'theme-modern.css?v=6',
      'course-ui-enhancements.css?v=1',
      'attribute-examples.js?v=6',
      'web-foundations-section.js?v=2',
      'html-practice-section.js?v=1',
      'css-section.js?v=4',
      'css-frameworks-section.js?v=4',
      'ui-ux-tools-section.js?v=1',
      'javascript-section.js?v=3',
      'dom-section.js?v=1',
      'free-apis-section.js?v=1',
      'api-html-css-basic-section.js?v=1',
      'frontend-frameworks-section.js?v=4',
      'framework-projects-section.js?v=3',
      'backend-fastapi-section.js?v=11',
      'backend-django-rest-section.js?v=1',
      'django-html-css-section.js?v=1',
      'html-css-section.js?v=1',
      'integration-sections.js?v=1',
      'practice-expansion.js?v=2',
      'git-section.js?v=1',
      'content-corrections.js?v=1',
      'section-order.js?v=1',
      'css-property-explanations.js?v=3',
      'example-code-formatter.js?v=1',
      'explanation-enhancer.js?v=9',
      'course-ui.js?v=15',
    ];
    const missingResources = expectedResources.filter(resource => !written.includes(resource));
    assert.deepEqual(missingResources, [], `faltan recursos en loader.js: ${missingResources.join(', ')}`);

    const attributeBox = { innerHTML: '', hidden: true };
    const attributeToggle = { textContent: '', onclick: null };
    document.createElement = () => ({ textContent: '' });
    document.head = { appendChild() {} };
    global.esc = value => value;
    global.highlight = value => value;
    global.render = () => {};
    global.createCard = () => ({
      querySelector: selector => selector === '.attributes-box'
        ? attributeBox
        : selector === '.attributes-toggle'
          ? attributeToggle
          : null,
    });

    evaluate('attribute-examples.js');
    createCard({ tag: '<input>', code: '<input>', attrs: ['required'] });
    assert.match(attributeBox.innerHTML, /<input required>/, 'no se generó el ejemplo de atributo');

    global.sections = [];
    global.T = (tag, name, description, code, preview = code, attrs = [], meta = {}) => ({
      tag,
      name,
      description,
      code,
      preview,
      attrs,
      ...meta,
    });
    global.buildNav = () => {};
    global.render = () => {};

    [
      'web-foundations-section.js',
      'html-practice-section.js',
      'css-section.js',
      'css-frameworks-section.js',
      'ui-ux-tools-section.js',
      'javascript-section.js',
      'dom-section.js',
      'free-apis-section.js',
      'api-html-css-basic-section.js',
      'frontend-frameworks-section.js',
      'framework-projects-section.js',
      'backend-fastapi-section.js',
      'backend-django-rest-section.js',
      'django-html-css-section.js',
      'html-css-section.js',
      'integration-sections.js',
      'practice-expansion.js',
      'git-section.js',
      'content-corrections.js',
      'section-order.js',
    ].forEach(evaluate);

    assert.ok(sections.length > 30, `se esperaban más de 30 secciones y se encontraron ${sections.length}`);
    const titles = sections.map(section => section.title);
    assert.equal(new Set(titles).size, titles.length, 'hay títulos de sección duplicados');

    [
      'Fundamentos web',
      'Práctica HTML paso a paso',
      'CSS · Principiante',
      'JavaScript · Principiante',
      'Manejo del DOM',
      'Backend FastAPI · Introducción',
      'Django REST · 1. Conceptos desde cero',
      'Git · Principiante',
    ].forEach(title => assert.ok(titles.includes(title), `falta la sección: ${title}`));

    const djangoModelExample = sections
      .flatMap(section => section.items)
      .find(item => item.name === 'Archivo: productos/models.py' && item.code.includes('class Producto'));
    assert.ok(djangoModelExample, 'no se encontró el ejemplo inicial del modelo Producto');
    assert.match(
      djangoModelExample.code,
      /stock\s*=\s*models\.PositiveIntegerField\(default=0\)/,
      'el modelo inicial no contiene el campo stock que usa el serializer'
    );

    evaluate('css-property-explanations.js');
    const colorItem = sections
      .find(section => section.title === 'CSS · Principiante')
      ?.items.find(item => item.name === 'Color y fondo');
    assert.ok(colorItem, 'no se encontró el ejemplo Color y fondo');
    createCard(colorItem);
    assert.ok(
      attributeBox.innerHTML.includes('background: #2563eb;') &&
      attributeBox.innerHTML.includes('Establece el fondo del elemento'),
      'faltan explicaciones de propiedades CSS'
    );

    const formattingSection = {
      title: 'Introducción',
      description: '',
      items: [{ code: '<main><section><h2>Ejemplo</h2><p>Texto</p></section></main>' }],
    };
    sections.unshift(formattingSection);
    evaluate('example-code-formatter.js');
    assert.equal(
      formattingSection.items[0].code,
      '<main>\n  <section>\n    <h2>Ejemplo</h2>\n    <p>Texto</p>\n  </section>\n</main>',
      'el formateador HTML produjo un resultado inesperado'
    );
    sections.shift();

    const htmlDetailSection = {
      title: 'Texto',
      description: 'Elementos de texto.',
      items: [T('<p>', 'Párrafo', 'Representa un párrafo.', '<p>Texto</p>', '<p>Texto</p>', ['title'], { kind: 'Semántica', flags: ['semantic'] })],
    };
    sections.unshift(htmlDetailSection);
    evaluate('explanation-enhancer.js');
    assert.ok(
      ['Sintaxis:', 'Tipo y significado:', 'Atributos destacados:', 'Ejemplo:']
        .every(part => htmlDetailSection.items[0].description.includes(part)),
      'la explicación detallada de HTML está incompleta'
    );
    sections.shift();

    assert.ok(
      sections.every(section => section.description.includes('Orden recomendado:')),
      'alguna sección no contiene orientación de estudio'
    );
    assert.ok(
      sections.every(section => section.items.every(item => item.description.includes('Para leer este ejemplo:'))),
      'algún elemento no contiene explicación detallada'
    );

    const navButtons = sections.map(() => {
      const text = {
        textContent: '',
        classList: { values: [], add(value) { this.values.push(value); } },
      };
      return {
        dataset: {},
        classList: {
          values: [],
          add(value) { this.values.push(value); },
          contains(value) { return this.values.includes(value); },
        },
        querySelector: () => text,
        prepend(label) { this.label = label; },
        setAttribute(name, value) { this[name] = value; },
        onclick() {},
        text,
      };
    });
    const courseNav = { dataset: {}, children: navButtons, setAttribute() {} };
    document.querySelector = selector => selector === '#categoryNav' ? courseNav : null;
    evaluate('course-ui.js');

    const groupFor = title => navButtons[titles.indexOf(title)]?.dataset.group;
    assert.equal(groupFor('Django REST · 1. Conceptos desde cero'), 'Django REST');
    assert.equal(groupFor('Backend FastAPI · Introducción'), 'Backend FastAPI');
    assert.equal(groupFor('Manejo del DOM'), 'JavaScript');
    assert.equal(groupFor('CSS · Principiante'), 'CSS');

    const backendOverview = titles.find(title => title.startsWith('Backend APIs'));
    if (backendOverview) assert.equal(groupFor(backendOverview), 'Backend Python');

    const ids = navButtons.map(button => button.dataset.sectionId);
    assert.equal(new Set(ids).size, ids.length, 'los identificadores de progreso no son únicos');
    assert.equal(
      navButtons[titles.indexOf('CSS · Principiante')].dataset.level,
      'principiante',
      'no se detectó el nivel Principiante'
    );
    assert.equal(
      navButtons[titles.indexOf('Backend FastAPI · Introducción')].dataset.level,
      undefined,
      'Introducción no debe marcarse como un nivel'
    );

    const groups = navButtons.map(button => button.dataset.group);
    const groupStarts = navButtons.filter(button => button.classList.values.includes('group-start'));
    const groupTransitions = groups.filter((group, index) => index === 0 || group !== groups[index - 1]).length;
    assert.equal(groupStarts.length, groupTransitions, 'faltan separadores al cambiar de área');
    assert.equal(document.body.dataset.course, 'HTML', 'el tema inicial no corresponde a HTML');

    console.log({
      status: 'ok',
      bundleLength: window.__HTML5_BUNDLE.length,
      htmlLength: written.length,
      sections: sections.length,
      groups: new Set(groups).size,
      resources: expectedResources.length,
    });
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}, 250);
