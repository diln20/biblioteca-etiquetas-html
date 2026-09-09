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
  window.__htmlPracticeAdded = false;
  (0, eval)(fs.readFileSync('html-practice-section.js', 'utf8'));
  window.__cssSectionAdded = false;
  (0, eval)(fs.readFileSync('css-section.js', 'utf8'));
  window.__cssFrameworksAdded = false;
  (0, eval)(fs.readFileSync('css-frameworks-section.js', 'utf8'));
  window.__javascriptSectionAdded = false;
  (0, eval)(fs.readFileSync('javascript-section.js', 'utf8'));
  window.__domSectionAdded = false;
  (0, eval)(fs.readFileSync('dom-section.js', 'utf8'));
  window.__frontendFrameworksAdded = false;
  (0, eval)(fs.readFileSync('frontend-frameworks-section.js', 'utf8'));
  window.__frameworkProjectsAdded = false;
  (0, eval)(fs.readFileSync('framework-projects-section.js', 'utf8'));
  window.__backendFastApiAdded = false;
  (0, eval)(fs.readFileSync('backend-fastapi-section.js', 'utf8'));
  window.__htmlCssSectionAdded = false;
  (0, eval)(fs.readFileSync('html-css-section.js', 'utf8'));
  window.__integrationSectionsAdded = false;
  (0, eval)(fs.readFileSync('integration-sections.js', 'utf8'));
  window.__practiceExpansionAdded = false;
  (0, eval)(fs.readFileSync('practice-expansion.js', 'utf8'));
  window.__gitSectionAdded = false;
  (0, eval)(fs.readFileSync('git-section.js', 'utf8'));
  window.__cssPropertiesExplained = false;
  (0, eval)(fs.readFileSync('css-property-explanations.js', 'utf8'));
  createCard(sections.find(section => section.title === 'CSS · Principiante').items.find(item => item.name === 'Color y fondo'));
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
    htmlPracticeScript: written.includes('html-practice-section.js?v=1'),
    cssScript: written.includes('css-section.js?v=4'),
    cssFrameworksScript: written.includes('css-frameworks-section.js?v=4'),
    javascriptScript: written.includes('javascript-section.js?v=2'),
    frontendFrameworksScript: written.includes('frontend-frameworks-section.js?v=4'),
    frameworkProjectsScript: written.includes('framework-projects-section.js?v=3'),
    backendFastApiScript: written.includes('backend-fastapi-section.js?v=11'),
    domScript: written.includes('dom-section.js?v=1'),
    htmlCssScript: written.includes('html-css-section.js?v=1'),
    integrationScript: written.includes('integration-sections.js?v=1'),
    practiceExpansionScript: written.includes('practice-expansion.js?v=1'),
    gitScript: written.includes('git-section.js?v=1'),
    cssPropertyScript: written.includes('css-property-explanations.js?v=3'),
    formattingScript: written.includes('example-code-formatter.js?v=1'),
    explanationScript: written.includes('explanation-enhancer.js?v=9'),
    courseUiScript: written.includes('course-ui.js?v=13'),
    styles: written.includes('screen-fit.css?v=2') && written.includes('theme-modern.css?v=6'),
    scriptSyntax,
    attributeUsageExample: attributeUsageExample.includes('<input required>'),
    webFoundations: sections[0]?.title === 'Fundamentos web' && sections[0].items.length === 5 && sections[0].items.at(-1).name === 'Patrones de diseño',
    htmlPractice: sections.find(section => section.title === 'Práctica HTML paso a paso')?.items.length === 7,
    cssSections: ['CSS · Principiante','CSS · Intermedio','CSS · Avanzado'].map(title => `${title}:${sections.find(section => section.title === title)?.items.length}`).join('|') === 'CSS · Principiante:15|CSS · Intermedio:12|CSS · Avanzado:12',
    cssFrameworks: ['Introducción:8','Bootstrap:13','Tailwind:13','Bulma:13','Foundation:13'].every(expected => { const [level,count] = expected.split(':'); return sections.find(section => section.title === `Frameworks CSS · ${level}`)?.items.length === Number(count); }),
    cssTargetElement: sections.find(section => section.title === 'CSS · Principiante')?.items.find(item => item.name === 'Selectores básicos')?.code.includes('<h2 id="titulo">') && sections.find(section => section.title === 'CSS · Principiante').items.find(item => item.name === 'Selectores básicos').code.includes('<style>'),
    cssApplicationMethods: ['Estilos en línea','Estilos internos','Hoja de estilos externa'].every(name => sections.find(section => section.title === 'CSS · Principiante')?.items.some(item => item.name === name)),
    cssIntegratedExamples: ['CSS · Principiante','CSS · Intermedio','CSS · Avanzado'].every(title => sections.find(section => section.title === title)?.items.at(-1)?.name.startsWith('Ejemplo integrador')),
    cssDetailedExplanations: ['CSS · Principiante','CSS · Intermedio','CSS · Avanzado'].every(title => sections.find(section => section.title === title)?.items.every(item => item.description.length > 150)),
    allDetailedExplanations: sections.every(section => section.items.every(item => item.description.includes('Para leer este ejemplo:'))),
    allSectionGuidance: sections.every(section => section.description.includes('Orden recomendado:')),
    formattedTagExample: formattedTagExample === '<main>\n  <section>\n    <h2>Ejemplo</h2>\n    <p>Texto</p>\n  </section>\n</main>',
    detailedHtmlTag: ['Sintaxis:','Tipo y significado:','Atributos destacados:','Ejemplo:'].every(part => detailedHtmlTag.includes(part)),
    cssPropertyExplanation: cssPropertyExplanation.includes('background: #2563eb;') && cssPropertyExplanation.includes('Establece el fondo del elemento') && attributeToggle.textContent.startsWith('Ver propiedades'),
    javascriptSections: ['JavaScript · Principiante','JavaScript · Intermedio','JavaScript · Avanzado'].map(title => `${title}:${sections.find(section => section.title === title)?.items.length}`).join('|') === 'JavaScript · Principiante:15|JavaScript · Intermedio:13|JavaScript · Avanzado:11',
    frontendFrameworks: ['Introducción:8','React:13','Angular:13','Vue:13','Svelte:13'].every(expected => { const [level,count] = expected.split(':'); return sections.find(section => section.title === `Frameworks frontend · ${level}`)?.items.length === Number(count); }),
    frameworkFolderStructures: ['React','Angular','Vue','Svelte'].every(level => sections.find(section => section.title === `Frameworks frontend · ${level}`)?.items.some(item => item.name.startsWith('Estructura recomendada'))) && ['Bootstrap','Tailwind','Bulma','Foundation'].every(level => sections.find(section => section.title === `Frameworks CSS · ${level}`)?.items.some(item => item.name.startsWith('Estructura de un proyecto'))),
    frameworkProjects: ['Introducción:5','React + Tailwind:8','Angular + Bootstrap:8','Vue + Bulma:8','Svelte + Foundation:8'].every(expected => { const [level,count] = expected.split(':'); return sections.find(section => section.title === `Proyectos con frameworks · ${level}`)?.items.length === Number(count); }) && sections.find(section => section.title === 'Proyectos con frameworks · Introducción')?.items.some(item => item.name === 'Cómo crear carpetas desde el Explorador') && ['React + Tailwind','Angular + Bootstrap','Vue + Bulma','Svelte + Foundation'].every(level => sections.find(section => section.title === `Proyectos con frameworks · ${level}`)?.items.some(item => item.name.startsWith('Armar las carpetas de'))),
    backendFastApi: ['Introducción:6','Armar el proyecto:11','Preparación:9','Instalar PostgreSQL:12','API:9','PostgreSQL:9','CRUD:9','React + Tailwind:11','Patrones de diseño:15','Producción:9'].every(expected => { const [level,count] = expected.split(':'); return sections.find(section => section.title === `Backend FastAPI · ${level}`)?.items.length === Number(count); }) && !sections.some(section => section.title === 'Backend FastAPI · Caso cotidiano') && ['Introducción','Armar el proyecto','Preparación','Instalar PostgreSQL','API','PostgreSQL','CRUD','React + Tailwind','Patrones de diseño','Producción'].map(level => sections.findIndex(section => section.title === `Backend FastAPI · ${level}`)).every((index,position,indexes) => position === 0 || index === indexes[position-1] + 1) && sections.filter(section => section.title.startsWith('Backend FastAPI · ')).every((section,index) => section.description.startsWith(`Fase ${index+1} de 10.`) && section.items[0]?.tag === 'Construcción guiada' && section.items[0]?.name.startsWith(`Paso ${index+1} `) && section.items[0]?.guide?.every(entry => entry.length === 3) && section.items.at(-1)?.name.startsWith(`Hito ${index+1} `)),
    domSection: sections.find(section => section.title === 'Manejo del DOM')?.items.length === 7,
    divManipulation: sections.find(section => section.title === 'Manipulación de DIV')?.items.length === 12 && ['HTML','CSS','JavaScript'].every(term => sections.find(section => section.title === 'Manipulación de DIV')?.items.some(item => item.code.includes(term))),
    htmlCssSection: sections.find(section => section.title === 'HTML + CSS')?.items.length === 18,
    integrationSections: sections.filter(section => section.title.startsWith('HTML + JavaScript')||section.title.startsWith('HTML + CSS + JavaScript')).length === 6,
    gitSections: ['Git · Principiante','Git · Intermedio','Git · Avanzado'].map(title => `${title}:${sections.find(section => section.title === title)?.items.length}`).join('|') === 'Git · Principiante:8|Git · Intermedio:9|Git · Avanzado:7',
    courseUiGrouped: navButtons.filter(button => button.classList.values.includes('group-start')).length === 11 && navButtons[0].label.textContent === 'HTML' && navButtons[sections.findIndex(section => section.title === 'CSS · Principiante')].text.textContent === 'Principiante' && navButtons[sections.findIndex(section => section.title === 'Frameworks CSS · Bootstrap')].text.textContent === 'Bootstrap' && navButtons[sections.findIndex(section => section.title === 'Frameworks CSS · Introducción')].label.textContent === 'Frameworks CSS' && navButtons[sections.findIndex(section => section.title === 'Frameworks frontend · React')].text.textContent === 'React' && navButtons[sections.findIndex(section => section.title === 'Frameworks frontend · Introducción')].label.textContent === 'Frameworks frontend' && navButtons[sections.findIndex(section => section.title === 'Proyectos con frameworks · React + Tailwind')].text.textContent === 'React + Tailwind' && navButtons[sections.findIndex(section => section.title === 'Proyectos con frameworks · Introducción')].label.textContent === 'Proyectos con frameworks' && navButtons[sections.findIndex(section => section.title === 'Backend FastAPI · PostgreSQL')].text.textContent === 'PostgreSQL' && navButtons[sections.findIndex(section => section.title === 'Backend FastAPI · Introducción')].label.textContent === 'Backend FastAPI' && navButtons[sections.findIndex(section => section.title === 'Git · Principiante')].label.textContent === 'Git',
    courseTheme: document.body.dataset.course === 'HTML',
    error: document.body.innerHTML,
  };
  console.log(result);
  if (!written || result.actualClosingScripts !== 18 || result.escapedClosingScripts !== 3 || !result.attributeExamples || !result.webFoundationsScript || !result.htmlPracticeScript || !result.cssScript || !result.cssFrameworksScript || !result.javascriptScript || !result.frontendFrameworksScript || !result.frameworkProjectsScript || !result.backendFastApiScript || !result.domScript || !result.htmlCssScript || !result.integrationScript || !result.gitScript || !result.cssPropertyScript || !result.formattingScript || !result.explanationScript || !result.courseUiScript || scriptSyntax !== 'ok' || !result.attributeUsageExample || !result.webFoundations || !result.htmlPractice || !result.cssSections || !result.cssFrameworks || !result.cssTargetElement || !result.cssApplicationMethods || !result.cssIntegratedExamples || !result.cssDetailedExplanations || !result.allDetailedExplanations || !result.allSectionGuidance || !result.formattedTagExample || !result.detailedHtmlTag || !result.cssPropertyExplanation || !result.javascriptSections || !result.frontendFrameworks || !result.frameworkFolderStructures || !result.frameworkProjects || !result.backendFastApi || !result.domSection || !result.htmlCssSection || !result.integrationSections || !result.gitSections || !result.courseUiGrouped || !result.courseTheme) {
    process.exitCode = 1;
  }
}, 200);
