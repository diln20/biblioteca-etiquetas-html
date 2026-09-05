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
  const attributeBox = { innerHTML: '', hidden: true };
  document.createElement = () => ({ textContent: '' });
  document.head = { appendChild() {} };
  global.esc = value => value;
  global.highlight = value => value;
  global.render = () => {};
  const attributeToggle = { textContent: '', onclick: null };
  global.createCard = () => ({
    querySelector: selector => selector === '.attributes-box' ? attributeBox : selector === '.attributes-toggle' ? attributeToggle : null,
  });
  window.__htmlAttributeExamplesEnhanced = false;
  (0, eval)(fs.readFileSync('attribute-examples.js', 'utf8'));
  createCard({ tag: '<input>', code: '<input>', attrs: ['required'] });
  const attributeUsageExample = attributeBox.innerHTML;
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
  window.__gitSectionAdded = false;
  (0, eval)(fs.readFileSync('git-section.js', 'utf8'));
  window.__cssPropertiesExplained = false;
  (0, eval)(fs.readFileSync('css-property-explanations.js', 'utf8'));
  createCard(sections[1].items.find(item => item.name === 'Color y fondo'));
  const cssPropertyExplanation = attributeBox.innerHTML;
  const formattingSection = { title: 'Introducción', description: '', items: [{ code: '<main><section><h2>Ejemplo</h2><p>Texto</p></section></main>' }] };
  sections.unshift(formattingSection);
  window.__htmlExamplesFormatted = false;
  (0, eval)(fs.readFileSync('example-code-formatter.js', 'utf8'));
  const formattedTagExample = formattingSection.items[0].code;
  sections.shift();
  const htmlDetailSection = { title: 'Texto', description: 'Elementos de texto.', items: [T('<p>', 'Párrafo', 'Representa un párrafo.', '<p>Texto</p>', '<p>Texto</p>', ['title'], { kind: 'Semántica', flags: ['semantic'] })] };
  sections.unshift(htmlDetailSection);
  window.__allExplanationsEnhanced = false;
  (0, eval)(fs.readFileSync('explanation-enhancer.js', 'utf8'));
  const detailedHtmlTag = htmlDetailSection.items[0].description;
  sections.shift();
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
    gitScript: written.includes('git-section.js?v=1'),
    cssPropertyScript: written.includes('css-property-explanations.js?v=1'),
    formattingScript: written.includes('example-code-formatter.js?v=1'),
    explanationScript: written.includes('explanation-enhancer.js?v=3'),
    courseUiScript: written.includes('course-ui.js?v=7'),
    styles: written.includes('theme-modern.css?v=3'),
    scriptSyntax,
    attributeUsageExample: attributeUsageExample.includes('<input required>'),
    webFoundations: sections[0]?.title === 'Fundamentos web' && sections[0].items.length === 5 && sections[0].items.at(-1).name === 'Patrones de diseño',
    cssSections: sections.slice(1, 4).map(section => `${section.title}:${section.items.length}`).join('|') === 'CSS · Principiante:10|CSS · Intermedio:7|CSS · Avanzado:7',
    cssTargetElement: sections[1]?.items.find(item => item.name === 'Selectores básicos')?.code.includes('<h2 id="titulo">') && sections[1].items.find(item => item.name === 'Selectores básicos').code.includes('<style>'),
    cssApplicationMethods: ['Estilos en línea','Estilos internos','Hoja de estilos externa'].every(name => sections[1]?.items.some(item => item.name === name)),
    cssIntegratedExamples: sections.slice(1, 4).every(section => section.items.at(-1)?.name.startsWith('Ejemplo integrador')),
    cssDetailedExplanations: sections.slice(1, 4).every(section => section.items.every(item => item.description.length > 150)),
    allDetailedExplanations: sections.every(section => section.items.every(item => item.description.includes('Para leer este ejemplo:'))),
    allSectionGuidance: sections.every(section => section.description.includes('Orden recomendado:')),
    formattedTagExample: formattedTagExample === '<main>\n  <section>\n    <h2>Ejemplo</h2>\n    <p>Texto</p>\n  </section>\n</main>',
    detailedHtmlTag: ['Sintaxis:','Tipo y significado:','Atributos destacados:','Ejemplo:'].every(part => detailedHtmlTag.includes(part)),
    cssPropertyExplanation: cssPropertyExplanation.includes('background: #2563eb;') && cssPropertyExplanation.includes('Establece el fondo del elemento') && attributeToggle.textContent.startsWith('Ver propiedades'),
    javascriptSections: sections.slice(4, 7).map(section => `${section.title}:${section.items.length}`).join('|') === 'JavaScript · Principiante:10|JavaScript · Intermedio:8|JavaScript · Avanzado:6',
    domSection: sections[7]?.title === 'Manejo del DOM' && sections[7].items.length === 7,
    htmlCssSection: sections[8]?.title === 'HTML + CSS' && sections[8].items.length === 12,
    integrationSections: sections.slice(9, 15).map(section => `${section.title}:${section.items.length}`).join('|') === 'HTML + JavaScript · Principiante:3|HTML + JavaScript · Intermedio:3|HTML + JavaScript · Avanzado:3|HTML + CSS + JavaScript · Principiante:3|HTML + CSS + JavaScript · Intermedio:3|HTML + CSS + JavaScript · Avanzado:3',
    gitSections: sections.slice(15, 18).map(section => `${section.title}:${section.items.length}`).join('|') === 'Git · Principiante:8|Git · Intermedio:9|Git · Avanzado:7',
    courseUiGrouped: navButtons.filter(button => button.classList.values.includes('group-start')).length === 7 && navButtons[0].label.textContent === 'HTML' && navButtons[4].text.textContent === 'Principiante' && navButtons[15].label.textContent === 'Git',
    courseTheme: document.body.dataset.course === 'HTML',
    error: document.body.innerHTML,
  };
  console.log(result);
  if (!written || result.actualClosingScripts !== 13 || result.escapedClosingScripts !== 3 || !result.attributeExamples || !result.webFoundationsScript || !result.cssScript || !result.javascriptScript || !result.domScript || !result.htmlCssScript || !result.integrationScript || !result.gitScript || !result.cssPropertyScript || !result.formattingScript || !result.explanationScript || !result.courseUiScript || scriptSyntax !== 'ok' || !result.attributeUsageExample || !result.webFoundations || !result.cssSections || !result.cssTargetElement || !result.cssApplicationMethods || !result.cssIntegratedExamples || !result.cssDetailedExplanations || !result.allDetailedExplanations || !result.allSectionGuidance || !result.formattedTagExample || !result.detailedHtmlTag || !result.cssPropertyExplanation || !result.javascriptSections || !result.domSection || !result.htmlCssSection || !result.integrationSections || !result.gitSections || !result.courseUiGrouped || !result.courseTheme) {
    process.exitCode = 1;
  }
}, 200);
