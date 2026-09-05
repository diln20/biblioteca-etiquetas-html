const fs = require('fs');
const vm = require('vm');

global.window = global;
let written = '';
global.document = {
  open() {},
  write(value) { written = value; },
  close() {},
  body: { innerHTML: '', dataset: {} },
};

for (let part = 1; part <= 5; part++) {
  (0, eval)(fs.readFileSync(`payload-${part}.js`, 'utf8'));
}
(0, eval)(fs.readFileSync('loader.js', 'utf8'));

setTimeout(() => {
  const scriptStart = written.indexOf('<script>') + 8;
  const scriptEnd = written.indexOf('</script>', scriptStart);
  let scriptSyntax = 'ok';
  try {
    new vm.Script(written.slice(scriptStart, scriptEnd), { filename: 'bundle.js' });
  } catch (error) {
    scriptSyntax = error.stack;
  }
  const attributeBox = { innerHTML: '' };
  document.createElement = () => ({ textContent: '' });
  document.head = { appendChild() {} };
  global.esc = value => value;
  global.highlight = value => value;
  global.render = () => {};
  global.createCard = () => ({
    querySelector: selector => selector === '.attributes-box' ? attributeBox : null,
  });
  window.__htmlAttributeExamplesEnhanced = false;
  (0, eval)(fs.readFileSync('attribute-examples.js', 'utf8'));
  createCard({ tag: '<input>', code: '<input>', attrs: ['required'] });
  global.sections = [];
  global.T = (tag, name, description, code, preview = code, attrs = [], meta = {}) => ({ tag, name, description, code, preview, attrs, ...meta });
  global.buildNav = () => {};
  global.render = () => {};
  window.__webFoundationsAdded = false;
  (0, eval)(fs.readFileSync('web-foundations-section.js', 'utf8'));
  window.__cssSectionAdded = false;
  (0, eval)(fs.readFileSync('css-section.js', 'utf8'));
  window.__javascriptSectionAdded = false;
  (0, eval)(fs.readFileSync('javascript-section.js', 'utf8'));
  window.__domSectionAdded = false;
  (0, eval)(fs.readFileSync('dom-section.js', 'utf8'));
  window.__htmlCssSectionAdded = false;
  (0, eval)(fs.readFileSync('html-css-section.js', 'utf8'));
  window.__integrationSectionsAdded = false;
  (0, eval)(fs.readFileSync('integration-sections.js', 'utf8'));
  window.__allExplanationsEnhanced = false;
  (0, eval)(fs.readFileSync('explanation-enhancer.js', 'utf8'));
  const navButtons = sections.map(() => {
    const text = { textContent: '', classList: { values: [], add(value) { this.values.push(value); } } };
    return {
      dataset: {},
      classList: { values: [], add(value) { this.values.push(value); }, contains(value) { return this.values.includes(value); } },
      querySelector: () => text,
      prepend(label) { this.label = label; },
      append(activity) { this.activity = activity; },
      setAttribute() {},
      onclick() {},
      text,
    };
  });
  const courseNav = { dataset: {}, children: navButtons, setAttribute() {} };
  document.querySelector = selector => selector === '#categoryNav' ? courseNav : null;
  (0, eval)(fs.readFileSync('course-ui.js', 'utf8'));
  const result = {
    bundleLength: window.__HTML5_BUNDLE.length,
    htmlLength: written.length,
    actualClosingScripts: (written.match(/<\/script>/g) || []).length,
    escapedClosingScripts: (written.match(/<\\\/script>/g) || []).length,
    attributeExamples: written.includes('attribute-examples.js?v=6'),
    webFoundationsScript: written.includes('web-foundations-section.js?v=2'),
    cssScript: written.includes('css-section.js?v=4'),
    javascriptScript: written.includes('javascript-section.js?v=2'),
    domScript: written.includes('dom-section.js?v=1'),
    htmlCssScript: written.includes('html-css-section.js?v=1'),
    integrationScript: written.includes('integration-sections.js?v=1'),
    explanationScript: written.includes('explanation-enhancer.js?v=1'),
    courseUiScript: written.includes('course-ui.js?v=6'),
    styles: written.includes('theme-modern.css?v=2'),
    scriptSyntax,
    attributeUsageExample: attributeBox.innerHTML.includes('<input required>'),
    webFoundations: sections[0]?.title === 'Fundamentos web' && sections[0].items.length === 5 && sections[0].items.at(-1).name === 'Patrones de diseño',
    cssSections: sections.slice(1, 4).map(section => `${section.title}:${section.items.length}`).join('|') === 'CSS · Principiante:10|CSS · Intermedio:7|CSS · Avanzado:7',
    cssTargetElement: sections[1]?.items.find(item => item.name === 'Selectores básicos')?.code.includes('<h2 id="titulo">') && sections[1].items.find(item => item.name === 'Selectores básicos').code.includes('<style>'),
    cssApplicationMethods: ['Estilos en línea','Estilos internos','Hoja de estilos externa'].every(name => sections[1]?.items.some(item => item.name === name)),
    cssIntegratedExamples: sections.slice(1, 4).every(section => section.items.at(-1)?.name.startsWith('Ejemplo integrador')),
    cssDetailedExplanations: sections.slice(1, 4).every(section => section.items.every(item => item.description.length > 150)),
    allDetailedExplanations: sections.every(section => section.items.every(item => item.description.includes('Para leer este ejemplo:'))),
    allSectionGuidance: sections.every(section => section.description.includes('Orden recomendado:')),
    javascriptSections: sections.slice(4, 7).map(section => `${section.title}:${section.items.length}`).join('|') === 'JavaScript · Principiante:10|JavaScript · Intermedio:8|JavaScript · Avanzado:6',
    domSection: sections[7]?.title === 'Manejo del DOM' && sections[7].items.length === 7,
    htmlCssSection: sections[8]?.title === 'HTML + CSS' && sections[8].items.length === 12,
    integrationSections: sections.slice(9, 15).map(section => `${section.title}:${section.items.length}`).join('|') === 'HTML + JavaScript · Principiante:3|HTML + JavaScript · Intermedio:3|HTML + JavaScript · Avanzado:3|HTML + CSS + JavaScript · Principiante:3|HTML + CSS + JavaScript · Intermedio:3|HTML + CSS + JavaScript · Avanzado:3',
    courseUiGrouped: navButtons.filter(button => button.classList.values.includes('group-start')).length === 6 && navButtons[0].label.textContent === 'HTML' && navButtons[4].text.textContent === 'Principiante',
    courseTheme: document.body.dataset.course === 'HTML',
    error: document.body.innerHTML,
  };
  console.log(result);
  if (!written || result.actualClosingScripts !== 10 || result.escapedClosingScripts !== 3 || !result.attributeExamples || !result.webFoundationsScript || !result.cssScript || !result.javascriptScript || !result.domScript || !result.htmlCssScript || !result.integrationScript || !result.explanationScript || !result.courseUiScript || scriptSyntax !== 'ok' || !result.attributeUsageExample || !result.webFoundations || !result.cssSections || !result.cssTargetElement || !result.cssApplicationMethods || !result.cssIntegratedExamples || !result.cssDetailedExplanations || !result.allDetailedExplanations || !result.allSectionGuidance || !result.javascriptSections || !result.domSection || !result.htmlCssSection || !result.integrationSections || !result.courseUiGrouped || !result.courseTheme) {
    process.exitCode = 1;
  }
}, 200);
