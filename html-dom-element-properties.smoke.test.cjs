const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const sectionSource=fs.readFileSync('html-dom-element-properties-section.js','utf8');
const orderSource=fs.readFileSync('html-order-finalizer.js','utf8');
const loader=fs.readFileSync('loader.js','utf8');

assert.doesNotThrow(()=>new vm.Script(sectionSource,{filename:'html-dom-element-properties-section.js'}));
assert.ok(loader.includes('html-dom-element-properties-section.js?v=1'));
assert.ok(loader.indexOf('html-dom-element-properties-section.js?v=1')<loader.indexOf('html-order-finalizer.js?v=1'));

const context={console,sections:[]};
context.window=context;
context.T=(topic,name,description,code,preview,attrs=[],meta={})=>({topic,name,description,code,preview,attrs,...meta});
vm.createContext(context);
new vm.Script(sectionSource,{filename:'html-dom-element-properties-section.js'}).runInContext(context);

assert.equal(context.sections.length,1);
const section=context.sections[0];
assert.equal(section.title,'HTML · DOM · Propiedades y métodos de elementos');
assert.equal(section.primaryArea,'HTML');
assert.equal(section.learningLessonOrder,1350);
assert.equal(section.items.length,13);

const text=section.items.map(item=>`${item.name}\n${item.description}\n${item.code}`).join('\n');
for(const expected of [
  'getElementById','console.dir','classList','textContent','innerText','innerHTML','getComputedStyle',
  'getAttribute','setAttribute','removeAttribute','dataset','children','parentElement','nextElementSibling',
  'querySelector','querySelectorAll','value','checked','disabled','addEventListener','createElement','append','remove()'
]) assert.ok(text.includes(expected),`Falta ${expected}`);

assert.ok(section.items.every(item=>Array.isArray(item.guide)&&item.guide.length>0));
assert.ok(section.items.every(item=>Array.isArray(item.filesToCreate)&&item.filesToCreate.length>0));
assert.ok(section.items.some(item=>Array.isArray(item.exerciseTasks)&&item.exerciseTasks.length>=3));

context.sections=[
  {title:'Scripts y plantillas',primaryArea:'HTML',items:[]},
  section,
  {title:'Práctica HTML paso a paso',primaryArea:'HTML',items:[]}
];
context.window.__htmlOrderFinalized=false;
new vm.Script(orderSource,{filename:'html-order-finalizer.js'}).runInContext(context);
assert.deepEqual(context.sections.map(item=>item.title),[
  'Scripts y plantillas',
  'HTML · DOM · Propiedades y métodos de elementos',
  'Práctica HTML paso a paso'
]);

console.log({status:'ok',section:section.title,lessons:section.items.length,afterScripts:true});