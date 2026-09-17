const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const source=fs.readFileSync('ui-ux-visual-styles-section.js','utf8');
assert.doesNotThrow(()=>new vm.Script(source,{filename:'ui-ux-visual-styles-section.js'}));

const T=(tag,name,description,code,preview,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta});
const context={console,sections:[],T};
context.window=context;
vm.createContext(context);
new vm.Script(source,{filename:'ui-ux-visual-styles-section.js'}).runInContext(context);

const styles=context.sections.find(section=>section.title==='UI/UX · Estilos de diseño web modernos');
const patterns=context.sections.find(section=>section.title==='UI/UX · Dashboards, loaders y microinteracciones');

assert.ok(styles,'falta sección de estilos web modernos');
assert.ok(patterns,'falta sección de dashboards y loaders');
assert.ok(styles.items.length>=7);
assert.ok(patterns.items.length>=5);

const stylesText=styles.items.map(item=>`${item.name}\n${item.description}\n${item.code}`).join('\n');
[
  'brutalista',
  'maximalista',
  'minimalista',
  'Glassmorphism',
  'backdrop-filter',
  'localStorage',
  'data-theme'
].forEach(term=>assert.ok(stylesText.toLowerCase().includes(term.toLowerCase()),`falta estilo/concepto: ${term}`));

const patternsText=patterns.items.map(item=>`${item.name}\n${item.description}\n${item.code}`).join('\n');
[
  'Dashboard',
  'spinner',
  'skeleton',
  'prefers-reduced-motion',
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'loading',
  'success',
  'error'
].forEach(term=>assert.ok(patternsText.toLowerCase().includes(term.toLowerCase()),`falta patrón UI: ${term}`));

for(const section of [styles,patterns]){
  assert.ok(section.items.every(item=>String(item.preview||'').length>0),'cada ejemplo debe tener preview');
  assert.ok(section.items.every(item=>Array.isArray(item.filesToCreate)&&item.filesToCreate.length),'cada ejemplo debe indicar archivos');
}

console.log({status:'ok',styleLessons:styles.items.length,patternLessons:patterns.items.length});
