const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('section-practice-exercises.js','utf8');
const loader = fs.readFileSync('loader.js','utf8');
const index = fs.readFileSync('index.html','utf8');

assert.doesNotThrow(()=>new vm.Script(source,{filename:'section-practice-exercises.js'}));

const sections = [
  {
    title:'HTML · Formularios',
    group:'HTML',
    primaryArea:'HTML',
    challenge:'Crea un formulario de registro.',
    items:[{
      name:'Input email',
      guide:[['Modificar','index.html','Agrega el formulario.']]
    }]
  },
  {
    title:'JavaScript · DOM · Selectores',
    group:'JavaScript',
    primaryArea:'JavaScript',
    items:[{name:'querySelector'}]
  },
  {
    title:'Frameworks frontend · React · Estado',
    group:'React',
    primaryArea:'React',
    items:[{name:'useState'}]
  }
];

const context={
  console,
  sections,
  T:(tag,name,description,code,preview='',attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta})
};
context.window=context;
vm.createContext(context);
new vm.Script(source,{filename:'section-practice-exercises.js'}).runInContext(context);

assert.equal(context.sectionPracticeExercises.sections,3);
assert.equal(context.sectionPracticeExercises.perSection,2);
for(const section of sections){
  const exercises=section.items.filter(item=>item.kind==='Ejercicio práctico');
  assert.equal(exercises.length,2,`${section.title} debe tener dos ejercicios`);
  assert.ok(exercises[0].name.startsWith('Ejercicio 1 ·'));
  assert.ok(exercises[1].name.startsWith('Ejercicio 2 ·'));
  assert.ok(exercises.every(item=>Array.isArray(item.guide)&&item.guide.length>0));
  assert.ok(exercises.every(item=>item.guideTitle==='Dónde hacer el ejercicio'));
  assert.ok(exercises.every(item=>item.codeLabel==='Instrucciones del ejercicio'));
}

assert.ok(loader.includes('section-practice-exercises.js?v=1'));
assert.ok(index.includes('exercises=1'));

console.log({status:'ok',sections:sections.length,exercises:sections.length*2});
