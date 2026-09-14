const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const read = file => fs.readFileSync(file,'utf8');
const sectionSource = read('cdn-frameworks-libraries-section.js');
const enhancerSource = read('framework-cdn-enhancer.js');
const loader = read('loader.js');

assert.doesNotThrow(()=>new vm.Script(sectionSource,{filename:'cdn-frameworks-libraries-section.js'}));
assert.doesNotThrow(()=>new vm.Script(enhancerSource,{filename:'framework-cdn-enhancer.js'}));

const context={
  console,
  sections:[
    {title:'Frameworks frontend · Introducción',items:[],group:'Frameworks',primaryArea:'Frameworks'},
    {title:'Frameworks frontend · React',items:[],group:'React',primaryArea:'React'},
    {title:'Frameworks frontend · Angular',items:[],group:'Angular',primaryArea:'Angular'},
    {title:'Frameworks frontend · Vue',items:[],group:'Vue',primaryArea:'Vue'},
    {title:'Frameworks frontend · Svelte',items:[],group:'Svelte',primaryArea:'Svelte'}
  ],
  T:(tag,name,description,code,preview=code,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta})
};
context.window=context;
vm.createContext(context);
new vm.Script(sectionSource,{filename:'cdn-frameworks-libraries-section.js'}).runInContext(context);
new vm.Script(enhancerSource,{filename:'framework-cdn-enhancer.js'}).runInContext(context);

const cdnSection=context.sections.find(section=>section.title==='Frameworks frontend · CDN y librerías');
assert.ok(cdnSection,'falta la sección CDN y librerías');
assert.equal(cdnSection.primaryArea,'Frameworks');
assert.ok(cdnSection.items.length>=12);
const allCode=cdnSection.items.map(item=>item.code).join('\n');
[
  'bootstrap@5.3.8',
  '@tailwindcss/browser@4',
  'vue@3/dist/vue.global.js',
  'nanoid@5/+esm',
  'axios@1/dist/axios.min.js',
  'chart.js@4/dist/chart.umd.min.js',
  'bulma@1/css/bulma.min.css',
  'foundation-sites@6/dist/css/foundation.min.css',
  'Subresource Integrity',
  'npm install axios'
].forEach(term=>assert.ok(`${allCode} ${cdnSection.items.map(item=>item.description).join(' ')}`.includes(term),`falta ${term}`));
assert.ok(cdnSection.items.every(item=>Array.isArray(item.guide)&&item.guide.length>0));
assert.ok(cdnSection.items.every(item=>Array.isArray(item.filesToCreate)));

const injected={
  'Frameworks frontend · Introducción':'CDN o npm · elegir antes de empezar',
  'Frameworks frontend · React':'React por CDN · demo sin build',
  'Frameworks frontend · Angular':'Angular y CDN · qué sí y qué no',
  'Frameworks frontend · Vue':'Vue 3 por CDN · alternativa oficial',
  'Frameworks frontend · Svelte':'Svelte y CDN · primero compilar'
};
for(const [title,name] of Object.entries(injected)){
  const section=context.sections.find(item=>item.title===title);
  assert.ok(section.items.some(item=>item.name===name),`falta ${name}`);
}

assert.ok(loader.includes('cdn-frameworks-libraries-section.js?v=1'));
assert.ok(loader.includes('framework-cdn-enhancer.js?v=1'));
assert.ok(loader.indexOf('frontend-frameworks-section.js?v=4') < loader.indexOf('framework-cdn-enhancer.js?v=1'));
assert.ok(loader.indexOf('framework-projects-section.js?v=3') < loader.indexOf('framework-cdn-enhancer.js?v=1'));
assert.ok(loader.indexOf('framework-cdn-enhancer.js?v=1') < loader.indexOf('section-order.js?v=7'));

console.log({status:'ok',cdnLessons:cdnSection.items.length,injectedFrameworks:Object.keys(injected).length});
