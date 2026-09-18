const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const sectionSource=fs.readFileSync('css-games-section.js','utf8');
const explanation=fs.readFileSync('explanation-enhancer.js','utf8');
const exact=fs.readFileSync('exact-explanation-enhancer.js','utf8');
const loader=fs.readFileSync('loader.js','utf8');

const sections=[];
const context={
  console,
  sections,
  T:(tag,name,description,code,preview=code,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta}),
  buildNav:()=>{},
  render:()=>{}
};
context.window=context;
vm.createContext(context);
new vm.Script(fs.readFileSync('css-guided-challenges.js','utf8')).runInContext(context);

new vm.Script(sectionSource,{filename:'css-games-section.js'}).runInContext(context);
const section=sections.find(item=>item.title==='CSS · Juegos y retos prácticos');
assert.ok(section,'falta sección Juegos CSS');

const before=new Map(section.items.map(item=>[item.name,item.gameDescription||item.description]));
new vm.Script(explanation,{filename:'explanation-enhancer.js'}).runInContext(context);
new vm.Script(exact,{filename:'exact-explanation-enhancer.js'}).runInContext(context);

for(const item of section.items){
  assert.equal(item.description,before.get(item.name),'la descripción del juego debe mantenerse breve: '+item.name);
  assert.ok(!item.description.includes('Para leer este ejemplo:'),'no debe aparecer explicación genérica en '+item.name);
  assert.ok(!item.description.includes('Cómo funciona exactamente:'),'no debe aparecer explicación larga en '+item.name);
  assert.ok(!item.description.includes('Cómo comprobarlo:'),'no debe aparecer comprobación genérica en '+item.name);
}

assert.ok(loader.includes('css-games-section.js?v=15'));
assert.ok(loader.includes('explanation-enhancer.js?v=10'));
assert.ok(loader.includes('exact-explanation-enhancer.js?v=2'));
assert.ok(loader.includes('personalized-exercises.js?v=2'));
assert.ok(loader.includes('css-flexbox-card-ui.js?v=6'));

console.log({status:'ok',section:section.title,items:section.items.length,conciseDescriptions:true});
