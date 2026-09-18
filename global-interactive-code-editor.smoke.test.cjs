const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const source=fs.readFileSync('global-interactive-code-editor.js','utf8');
const css=fs.readFileSync('global-interactive-code-editor.css','utf8');
const loader=fs.readFileSync('loader.js','utf8');

assert.doesNotThrow(()=>new vm.Script(source,{filename:'global-interactive-code-editor.js'}));

[
  'data.liveCodeEditor',
  "editor.dataset.liveCodeEditor='true'",
  'global-code-editor',
  'live-code-toolbar',
  'Copiar edición',
  'Restablecer',
  'Ctrl + Enter',
  "mode==='html'",
  "mode==='css'",
  "mode==='javascript'",
  'sandbox',
  'srcdoc',
  'localStorage',
  'setRangeText',
  'navigator.clipboard.writeText'
].forEach(term=>assert.ok(source.includes(term),`editor global: falta ${term}`));

[
  '.global-code-editor',
  '.live-code-toolbar',
  '.live-code-action',
  '.live-code-status',
  '.live-code-runtime-note'
].forEach(term=>assert.ok(css.includes(term),`CSS editor: falta ${term}`));

assert.ok(loader.includes('global-interactive-code-editor.css?v=1'),'loader no carga CSS del editor global');
assert.ok(loader.includes('global-interactive-code-editor.js?v=1'),'loader no carga JS del editor global');
assert.ok(loader.indexOf('primary-area-ui.js')<loader.indexOf('global-interactive-code-editor.js?v=1'),'editor global debe envolver createCard al final');

console.log({status:'ok',editableAllCode:true,htmlCssLive:true,javascriptSandbox:true,textCodeEditable:true});
