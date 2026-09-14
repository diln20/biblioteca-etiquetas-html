const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const placeholders = fs.readFileSync('vscode-snippet-placeholders.js','utf8');
const source = fs.readFileSync('vscode-tools-section.js','utf8');
const finalizer = fs.readFileSync('dev-tools-category-finalizer.js','utf8');
const exercises = fs.readFileSync('dev-tools-exercises.js','utf8');
const loader = fs.readFileSync('loader.js','utf8');
const index = fs.readFileSync('index.html','utf8');
const fileGuide = fs.readFileSync('file-guide-ui.js','utf8');
const css = fs.readFileSync('primary-area-ui.css','utf8');

assert.doesNotThrow(()=>new vm.Script(placeholders,{filename:'vscode-snippet-placeholders.js'}));
assert.doesNotThrow(()=>new vm.Script(source,{filename:'vscode-tools-section.js'}));
assert.doesNotThrow(()=>new vm.Script(finalizer,{filename:'dev-tools-category-finalizer.js'}));
assert.doesNotThrow(()=>new vm.Script(exercises,{filename:'dev-tools-exercises.js'}));
assert.ok(loader.includes('vscode-snippet-placeholders.js?v=1'));
assert.ok(loader.includes('vscode-tools-section.js?v=1'));
assert.ok(loader.includes('dev-tools-category-finalizer.js?v=1'));
assert.ok(loader.includes('dev-tools-exercises.js?v=1'));
assert.ok(loader.indexOf('vscode-snippet-placeholders.js?v=1') < loader.indexOf('vscode-tools-section.js?v=1'));
assert.ok(loader.indexOf('vscode-tools-section.js?v=1') < loader.indexOf('dev-tools-category-finalizer.js?v=1'));
assert.ok(loader.indexOf('dev-tools-category-finalizer.js?v=1') < loader.indexOf('dev-tools-exercises.js?v=1'));
assert.ok(loader.indexOf('dev-tools-exercises.js?v=1') < loader.indexOf('personalized-exercises.js?v=1'));
assert.ok(index.includes('vscode=1'));
assert.ok(fileGuide.includes('Herramientas'));
assert.ok(css.includes('body[data-course="Herramientas"]'));
assert.ok(css.includes('.nav-item[data-group="Herramientas"]'));

const context={
  console,
  sections:[],
  learningPath:{areas:['HTML','CSS','JavaScript','TypeScript','Git','APIs','Angular','React','Vue','Svelte','Solid.js','Django Framework','FastAPI','Django REST','Frameworks','Base de datos','Backend']},
  T:(tag,name,description,code,preview='',attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta})
};
context.window=context;
vm.createContext(context);
new vm.Script(placeholders,{filename:'vscode-snippet-placeholders.js'}).runInContext(context);
new vm.Script(source,{filename:'vscode-tools-section.js'}).runInContext(context);
new vm.Script(finalizer,{filename:'dev-tools-category-finalizer.js'}).runInContext(context);
new vm.Script(exercises,{filename:'dev-tools-exercises.js'}).runInContext(context);

const toolSections=context.sections.filter(section=>section.primaryArea==='Herramientas');
assert.equal(toolSections.length,4);
assert.ok(context.learningPath.areas.includes('Herramientas'));
assert.equal(context.learningPath.areas.indexOf('Herramientas'),context.learningPath.areas.indexOf('TypeScript')+1);
assert.equal(toolSections.reduce((total,section)=>total+section.items.length,0),24);
assert.ok(toolSections.every(section=>section.group==='Herramientas'));
assert.ok(toolSections.every(section=>section.course==='Herramientas'));

const items=toolSections.flatMap(section=>section.items);
const joined=items.map(item=>`${item.name}\n${item.description}\n${item.code}`).join('\n');
[
  'WallabyJs.console-ninja',
  'usernamehw.errorlens',
  'esbenp.prettier-vscode',
  'formulahendry.auto-rename-tag',
  'kisstkondoros.vscode-gutter-preview',
  'dbaeumer.vscode-eslint',
  'MS-vsliveshare.vsliveshare',
  'christian-kohler.path-intellisense',
  '.vscode/settings.json',
  '.vscode/extensions.json',
  '.prettierrc.json',
  '.prettierignore',
  'eslint.config.mjs',
  'editor.formatOnSave',
  'source.fixAll.eslint',
  'path-intellisense.mappings',
  'editor.linkedEditing',
  '${workspaceFolder}/src',
  'npm run format:check',
  'npm run lint'
].forEach(term=>assert.ok(joined.includes(term),`falta ${term}`));

assert.ok(items.every(item=>Array.isArray(item.guide)&&item.guide.length>0));
assert.ok(items.every(item=>item.guideTitle==='Dónde se configura cada cosa'));
assert.ok(items.every(item=>Array.isArray(item.filesToCreate)));
assert.ok(items.every(item=>Array.isArray(item.exerciseTasks)&&item.exerciseTasks.length===3));
assert.ok(items.some(item=>item.filesToCreate.some(file=>file.path==='.vscode/settings.json')));
assert.ok(items.some(item=>item.filesToCreate.some(file=>file.path==='eslint.config.mjs')));
assert.ok(items.some(item=>item.filesToCreate.some(file=>file.path==='.prettierrc.json')));

console.log({status:'ok',category:'Herramientas',sections:toolSections.length,lessons:items.length,extensions:8,exercises:true});
